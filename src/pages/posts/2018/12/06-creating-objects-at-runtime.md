---
share: true
title: "Creating objects at runtime"
date: "2018-12-06"
categories: 
  - "general"
  - "programming"
tags: 
  - "net"
  - "c"
  - "data"
  - "dynamic"
  - "metaprogramming"
coverImage: "d6808-1_ca-k4lr5iwb4rkqyidwf-q.jpeg"
---

For the past few days, I've been working with a fairly large dataset (2.87GB) that is in a collection of 66 different tabular delimited files.   This in and of itself isn't bad, but the problem is that I was wanting to be able to easily place it into various formats and have an easy way of working with it.  This is where dynamically creating objects comes in handy.

Normally in this situation, I would go through and create [POCO's](https://en.wikipedia.org/wiki/Plain_old_CLR_object) to hold the data while I worked with it, but with this number of files and with each file being its own collection of objects that would prove fruitless.  Coincidentally, the day before I started on this I also started reading [Metaprogramming](https://www.manning.com/books/metaprogramming-in-dot-net) [in .](https://www.manning.com/books/metaprogramming-in-dot-net)[NET](https://www.manning.com/books/metaprogramming-in-dot-net), this provided me with a better path of handling this issue.   

## Creating Objects with EntityBuilder

Being able to dynamically create objects is a huge benefit to those languages that allow some sort of metaprogramming.  Imagine, if I were to take the time to write out 66 POCOs before actually working on the application.  We are talking easily a few days worth of work.  

Enter the entity builder.  While nothing fancy, I wound up with a class that will create a type given a name and a list of parameters.  You can see the full code [here on gist](https://gist.github.com/DCCoder90/2ef3d87a1ee217d4032cc9b423d5aa3d), or just scroll to the bottom of the post.  
  
The entity builder is used in the manner below, with 'propertyNames' being just an array of strings to call the properties.

```
var eb = new EntityBuilder();        
var newType = eb.CreateNewObject(name, propertyNames);        
object myNewObject = Activator.CreateInstance(newType);
```

This will create a property with the Type name of 'name' and all the properties will be strings with the supplied property names.   On the other end if you want more control you can specify the property types as well by sending in an IDictionary<string,Type> with string being their names and Type being the type you want them to be.    
  
Next all that's left to do is to actually set the values of the properties in your object.  This is easy enough using reflection still, in the following manner:  
  

## Populating the object

```
PropertyInfo[] propertyInfos;
propertyInfos = unpopulatedObject.GetType().GetProperties();
foreach (PropertyInfo propertyInfo in propertyInfos)
{
 propertyInfo.SetValue(myNewObject,SOMEPROPERTYVALUEHERE);
}
```

As you can see it is fairly easy.  The way that I did this was that I had all of my information in a [DataTable](https://docs.microsoft.com/en-us/dotnet/api/system.data.datatable?view=netframework-4.7.2) and then instead of SOMEPROPERTYHERE just referenced the column that I wanted to set.  
  
After this you have a fully hydrated object, ready to use!

## Entity Builder Code

https://gist.github.com/DCCoder90/2ef3d87a1ee217d4032cc9b423d5aa3d
