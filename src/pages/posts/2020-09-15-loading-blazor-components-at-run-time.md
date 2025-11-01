---
share: true
title: "Loading Blazor Components at run-time"
date: "2020-09-15"
categories: 
  - "general"
  - "programming"
tags: 
  - "blazor"
  - "tutorial"
coverImage: "external-content.duckduckgo.com_-1.png"
---

So here I am on some much needed time off, and [Hurricane Sally](https://abcnews.go.com/US/hurricane-sally-expected-bring-heavy-rain-coastal-flooding/story?id=73017412) decides to come through. Just my luck, my first time taking PTO in over a year and a hurricane decides to lock me down. Either way, I figured I'd try something interesting.

For the past few months I've had this idea in my head to allow a Blazor application to dynamically load components at runtime. That way, without having to go through any form of tedious update process, I could just drop a dll into a folder and have the application pick it up. Unfortunately, I haven't really had the time to explore it until recently.

## Quick warning/disclaimer

Before we start getting into this, let me just say that this is a "because I can" or "because why not" type of solution. A much better approach is to just use a [blue-green deployment](https://en.wikipedia.org/wiki/Blue-green_deployment) or [rolling deployment](https://rollout.io/blog/rolling-deployment/) methodology to update your application, not this.

## Creating the basics

This is pretty much me rambling and explaining how all the pieces fit together, if you want to just jump to the end I have a link to the repository with all this there.

Ok, so the first thing I did was create a new Server Blazor application, and ran it to ensure everything was working. Once I was sure that the unedited template code that always works was indeed working, I decided to move on.

Now, I started hitting a problem. I've done some [runtime fancy stuff](https://dccoder.com/2018/12/06/creating-objects-at-runtime/) before, but this one was going to be a little more in-depth, so I thought. With this I was going to be modifying the front-end at run time, along with changing a navigation menu and other stuff. Where to begin?! Oh I know, let's start by trying to figure out the interface!

After a bit of brainstorming I came up with something akin to this:

    public interface IDynamicComponent
    {
        IDictionary<Type,Type> InjectableDependencies { get; }
        IDictionary<string,string> Parameters { get; }
        string Name { get; }
        string Page { get; }
        Type Component { get;}
        MenuItem MenuData { get; }
    }

And for the MenuItem type I came up with

    public class MenuItem
    {
        public bool Display { get; set; }
        public string Text { get; set; }
        public string Page { get; set; }
        public string Icon { get; set; }
        public string CSS { get; set; }
    }

These two I concluded would give us enough information to be able to accurately load a simple component. Now the first stepping stone was complete. Next I would need someway to actually load these into memory. I always find that writing interfaces helps get my thoughts down a little clearer before I begin writing the implementation so that's what I did. What I wound up with was:

    public interface IComponentService
    {
        void LoadComponents(string path);
        IDynamicComponent GetComponentByName(string name);
        IDynamicComponent GetComponentByPage(string name);
        IEnumerable<Type> Components { get; }
        IEnumerable<MenuItem> GetMenuItems(bool getHiddenItems = false);
    }

As you can tell from skimming over the IComponentService interface the main feature in this is going to be loading the components (big shocker, I know). The LoadComponents method is going to take in a file path and then read all the assemblies within, pull out the components and place them in the Components enumerable for us to play with later.  
  
Next for the implementation, and I'm not going to lie it could have possibly been done better in some areas or refactored but again this is just me playing around.

    public class ComponentService : IComponentService
    {
        public IEnumerable<Type> Components { get; private set; }

        public void LoadComponents(string path)
        {
            var components = new List<Type>();
            var assemblies = LoadAssemblies(path);

            foreach (var asm in assemblies)
            {
                var types = GetTypesWithInterface(asm);
                foreach (var typ in types) components.Add(typ);
            }

            Components = components;
        }

        public IEnumerable<MenuItem> GetMenuItems(bool getHiddenItems = false)
        {
            var components = Components.Select(x => (IDynamicComponent) Activator.CreateInstance(x));
            if (!getHiddenItems)
                components = components.Where(x => x.MenuData.Display);
            
            return components.Select(x=>x.MenuData);
        }

        public IDynamicComponent GetComponentByName(string name)
        {
            return Components.Select(x => (IDynamicComponent) Activator.CreateInstance(x))
                .SingleOrDefault(x => x.Name == name);
        }
        
        public IDynamicComponent GetComponentByPage(string name)
        {
            return Components.Select(x => (IDynamicComponent) Activator.CreateInstance(x))
                .SingleOrDefault(x => x.Page == name);
        }

        private IEnumerable<Assembly> LoadAssemblies(string path)
        {
            return Directory.GetFiles(path, "\*.dll").Select(dll => Assembly.LoadFile(dll)).ToList();
        }

        private IEnumerable<Type> GetTypesWithInterface(Assembly asm)
        {
            var it = typeof(IDynamicComponent);
            return GetLoadableTypes(asm).Where(it.IsAssignableFrom).ToList();
        }

        private IEnumerable<Type> GetLoadableTypes(Assembly assembly)
        {
            if (assembly == null) throw new ArgumentNullException("assembly");
            try
            {
                return assembly.GetTypes();
            }
            catch (ReflectionTypeLoadException e)
            {
                return e.Types.Where(t => t != null);
            }
        }
    }

## Creating the components

Now it's time to pull out the demo components and see what we can do! I started by pulling the WeatherForecast and Counter components out into their own assemblies. These were just simple Razor Class Libraries (RCLs) targeting .netcoreapp3.1

![](../../../public/imgs/posts/2020-09-15/extractedcomponents.png?w=479)

Since I'm not factoring in dependency injection at this point I did have to make some slight changes to the Component2.razor file to instantiate a new WeatherForecastService rather than have it injected.

Now it's time to setup the components! In each of the new RCLs I created a MyComponent.cs (the name doesn't really matter), and populated the details accordingly. Below you can see the code for the WeatherForecast component

    public class MyComponent : IDynamicComponent
    {
        public bool DisplayInMenu => true;

        public IDictionary<Type,Type> InjectableDependencies => new Dictionary<Type,Type>
        {
            {typeof(WeatherForecastService), typeof(WeatherForecastService)}
        };
        
        public IDictionary<string,string> Parameters => new Dictionary<string,string>
        {
            {"Name","Something"}
        };
        
        public string Name => "Weather Forecast";
        public string Page => "Forecast";
        public Type Component => typeof(Component2);

        public MenuItem MenuData => new MenuItem
        {
            Display = true,
            Page = Page,
            CSS = String.Empty,
            Text = "Data",
            Icon = "oi oi-list-rich"
        };
    }

As you can see I was intending on working with dependency injection by the InjectableDependencies property, but ultimately I wound up not doing anything with this, I'll probably get back around to it later.

## Injecting the Component Service

Now that this was done, I only had three more things to complete to have it all working. I modified my ConfigureServices method in the startup of my base Blazor application to inject the IComponentService

            services.AddSingleton<IComponentService>(\_ =>
            {
                var service = new ComponentService();
                service.LoadComponents(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location));
                return service;
            });

This will ensure that the service always has the latest components, and loads them from the directory the executing assembly is in. We could easily change this and load them from anywhere, but for now this is enough.

## Setting up the menu

Next I create a simple helper class that would contain an extension method that would create a navlink based off the MenuData from a component

    public static class Helpers
    {
        public static RenderFragment GenerateMenuItem(this MenuItem item)
        {
            RenderFragment fragment = builder =>
            {
                builder.OpenElement(3, "li");
                builder.AddAttribute(4,"class","nav-item px-3");
                builder.OpenComponent<NavLink>(4);
                builder.AddAttribute(6,"class","nav-link");
                builder.AddAttribute(7, "href", $"/{item.Page}");
                builder.AddAttribute(8, "Match", NavLinkMatch.All);
                builder.AddAttribute(9, "ChildContent", (RenderFragment)((builder2) => {
                    builder2.AddMarkupContent(10, $"<span class=\\"{item.Icon}\\" aria-hidden=\\"true\\"></span>");
                    builder2.AddContent(11, item.Text);
                }));
                builder.CloseComponent();
                builder.CloseElement();
            };
            return fragment;
        }
    }

For the helper code I have to give a big thanks to [Flores](https://stackoverflow.com/users/147301/flores) on Stackoverflow for his answer on [Blazor - How to create Components dynamically](https://stackoverflow.com/questions/50117932/blazor-how-to-create-components-dynamically). This was a good point in the direction I needed to make all of this possible. As you can hopefully tell from the code above, this simply creates a li element and then fills it with a NavLink component like you would typically see in the NavMenu.razor file in default blazor applications.

Next was to finish setting up the menu. For the navigation menu I changed the NavMenu.razor file to match the following:

@using Component.Common
@inject IComponentService ComponentService

<div class="top-row pl-4 navbar navbar-dark">
    <a class="navbar-brand" href="">BlazorComponentHotloadDemo</a>
    <button class="navbar-toggler" @onclick="ToggleNavMenu">
        <span class="navbar-toggler-icon"></span>
    </button>
</div>

<div class="@NavMenuCssClass" @onclick="ToggleNavMenu">
    <ul class="nav flex-column">
        <li class="nav-item px-3">
            <NavLink class="nav-link" href="" Match="NavLinkMatch.All">
                <span class="oi oi-home" aria-hidden="true"></span> Home
            </NavLink>
        </li>
        @if (menuItems != null)
        {
            foreach (var fragment in menuItems)
                @fragment;
        }
    </ul>
</div>

@code {
    IEnumerable<RenderFragment> menuItems;
    private bool collapseNavMenu = true;
    private string NavMenuCssClass => collapseNavMenu ? "collapse" : null;

    private void ToggleNavMenu()
    {
        collapseNavMenu = !collapseNavMenu;
    }

    protected override void OnInitialized()
    {
        var items = ComponentService.GetMenuItems();

        var menulist = new List<RenderFragment>();
        foreach (var item in items)
        {
            menulist.Add(item.GenerateMenuItem());
        }
        menuItems = menulist;
        base.OnInitialized();
    }
}

With the menu all I did was remove the other links, but left the home link there. The rest were replaced with code that will get the menu data from the component service for all components that are meant to be displayed. It will then create a RenderFragment for each one and loop through displaying it. The href for the links is simply being placed as the component "page".

## Creating the page

Next is to create a page that will display the content. When I first started working on this I did a lot of reading up on [Blazor Routing](https://docs.microsoft.com/en-us/aspnet/core/blazor/fundamentals/routing?view=aspnetcore-3.1) and other topics trying to figure out how I would approach this. I figured I may have to somehow change the way it handles routing or do something fancy in order to make it work. Thankfully I was wrong.

I wound up only having to create a single page with the path /{componentName} with componentName being a string parameter that I would use to load the component. The code for this page is below

@page "/{componentName}"
@using Component.Common
@inject IComponentService ComponentService

@if (render)
{
    @dynamicComonent()
}

@code{
    bool render = false;
    \[Parameter\]
    public string componentName { get; set; }

    protected override void OnInitialized()
    {
        render = true;
        base.OnInitialized();
    }

    RenderFragment dynamicComonent() => builder =>
    {
        var component = ComponentService.GetComponentByPage(componentName);
        builder.OpenComponent(0,component.Component);
        
        for (int i = 0; i < component.Parameters.Count; i++)
        {
            var attribute = component.Parameters.ElementAt(i);
            builder.AddAttribute(i+1,attribute.Key,attribute.Value);
        }
        
        builder.CloseComponent();
    };
}

## The results

Now with everything done the last thing is to fire it up, drop the components in and hope it all works as expected.

![](../../../public/imgs/posts/2020-09-15/2020-09-15_16-19-45.gif)

_Sorry for it being blurry, but it still gets the point across_

## The code

I have posted the complete source for my little demo over on GitHub if you want to take a look and play around with it:

https://github.com/DCCoder90/blazorhotload
