---
title: "C# 7.1 Update"
date: "2017-09-08"
categories: 
  - "programming"
tags: 
  - "net"
  - "c"
  - "c-sharp"
  - "dotnet"
  - "microsoft"
coverImage: "5dfc1-csharp-e7b8fcd4ce.png"
---

Last month Microsoft released [Visual Studio 2017.3](http://www.visualstudio.com) and with it C#'s latest minor upgrade [C# 7.1](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-7-1)!  C#'s latest update includes four new (very useful) features that I am honestly very excited about.

- async Main method
- default literal expressions
- inferred tuple names

Below I'll go into some detail on each of the new features and show some examples of each, along with how to update your current project to the new C#7.1 update.

# Updgrading to C#7.1

As of Visual Studio 2017 version 15.3 the C# compiler supports C#7.1 In order to utilize it you must first change the settings within your project to use the C#7.1 language. This is actually much simpler than you would imagine. In order to do so, simply follow the below steps.

1. Open your project settings by right clicking on your project and choosing "Properties"
2. Go to the "Build" tab
3. At the bottom right click the "Advanced..." button
4. For your language version change it from "Default" to C#7.1
5. Click "Ok"

# async Main method

The latest update to C# allows the use of async/await in the Main method. This makes it easier to use asynchronous code throughout your entire application.  Previously you would have to create a new async method and call that from within the Main method such as displayed below: ```csharp
static int Main(){ return DoAsyncWork().GetAwaiter().GetResult(); }
``` With the new C#7.1 we can now perform async word directly in the Main method.  A quick example is shown below where we will wait for 2 seconds to get user input after we prompt them.

```csharp
public class Program{ static async Task Main(string[] args){ string name; Console.Out.WriteLine("Please enter your name:"); await Task.Delay(2000); name = Console.Readline(); } }
```

As you can see this makes writing asynchronous applications much easier and eliminates a lot of unneeded lines.

# default Literal Expressions

C#7.1 now includes a new default literal that acts as a shortcut to the old default(T) it accomplishes this by inferring the type from the type that it is being used on.

Previously we would have to assign default values using the elongated form in a manner such as the following. 
```csharp
int i = default(int);
``` 
Now with the new literal its literally (pun intented) as easy as setting it to default!  Take a look below for a mirror of the above example with the new shortcut. 
```csharp
int i = default;
```

I'm sure many can see the benefits of such.  My personal favorite use of the new default literal is initializing variables and for returns of methods.

## Initializing variables

```csharp
int i = default;
```

## Returning methods

```csharp
public int addIfTrue(int a, int b, bool shouldAdd){ if(shouldAdd){ return a+b; }else{ return default; } }
```

## Optional Parameters

```csharp
public int addIfTrue(int a,int b,bool shouldAdd=default){ if(shouldAdd){ return a+b; }else{ return default; } }
```

 

## Inferred tuple names

The final feature added in C# 7.1 is tuple name inference.   This allows tuples to infer their element names from the inputs. For example, instead of (x: value.x, y: value.y), you can now write (value.x, value.y).

Usually when a tuple is initialized  the variables you want to assign to the elements tend to be the same as the names you want to use for the tuple elements.  With the new update you can now simply assign the values and let C# set the element names for you!

[Tuples are new to C# with the 7.0 release](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-7).  If you haven't used them yet I highly suggest it!

Example: ```csharp
int hp= 100; string playername = "DCCoder"; var details = (playername,hp);
```

As you can see this is much easier and faster than the old way of initializing tuples and having to specify every little thing. ```csharp
int hp= 100; string playername = "DCCoder"; var details = (playername: playername,hp: hp);
```
