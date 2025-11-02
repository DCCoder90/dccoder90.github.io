---
title: "C# for Beginners [Part 1]"
date: "2017-09-10"
categories: 
  - "programming"
  - "tutorials"
tags: 
  - "net"
  - "beginners"
  - "c#"
  - "tutorial"
headerimage: "b4ab2-c-tutorial-for-absolute-beginner-360x240-1.webp"
---

Ok so yesterday I received a request to do a C# tutorial covering the basics of the C# language. This will be a short multi-part tutorial on the basics of C#. In Part 1 we're going to cover some basic structure and syntax.  I do not intend to get too in-depth but cover just enough to allow others to be able to start writing simple programs and get comfortable with the language syntax.

# What is C#?

Before we begin diving into how everything works, lets first discuss what C# is.  C# is a modern, general-purpose, object-oriented language.  C# is  developed and maintained by Microsoft. As of January 6, 2017 the C# language is hosted on the [dotnet github repository](https://github.com/dotnet/csharplang) and is free for anyone to view and modify.

# What is Object Oriented Programming?

Object-oriented programming (OOP) is a type of computer programming in which programmers define not only the data type of a data structure, but also the types of operations that can be applied to the data structure.

In this way, the data structure becomes an object that includes both data and functions. In addition, programmers can create relationships between one object and another. For example, objects can inherit characteristics from other objects.

# Structure

Let's start by looking at the all-famous Hello World program in C#.

```csharp

using System; 
namespace HelloWorldApplication {   
    public class HelloWorld{     
        public static void Main(string[] args){       
            /* my first program in C# */       
            Console.WriteLine("Hello World");       
            Console.ReadKey();     
        }   
    } 
}

```

This is a simple program that only prints "Hello World" on the screen. Within this program we have several very important parts.

If you look at the top, on line 1 we have what's called a "using statement". What a using statement does is allow us to access other namespaces within a referenced assembly. A namespace is nothing more than a way to group a collection of classes together.

On line 2 you can see that we create our own namespace within which our program will reside. Now you can do this without placing it in a namespace but it is general best practice to do so. This will help prevent name collisions, and a whole host of other issues later down the road as you build larger and larger programs.

It is important to mention that when you declare a namespace you use the opening and closing curly brackets {} to define the "scope" of this namespace. Everything within these curly brackets will be held within the namespace.

## Creating a Class

On line 3 you can see that we declared a new class.  Now to create a class you generally need 5 things.  These are:

- access modifier
- "class" keyword
- Class name
- Open curly brace
- Close curly brace

The access modifier can be one of four modifiers.

- public
    - Is visible from anywhere
- protected
    - Is only visible to items inheriting from it
- private
    - Is only visible to itself
- internal
    - Is only visible within the same project

For classes you will generally only use public or internal.  If you do not specify an access modifier it will always default to public.  Let's take a look with a visual using our example above.  For simplicity I have removed all the logic within the class.

![](37ac8-untitled.png)

## Creating a method

A method is defined by the [Microsoft documentation](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/methods) as simply:

> A method is a code block that contains a series of statements.

A method can be thought of as a fully self-contained block of code that can be called at any point in time.  If you would look on line 4 you will see this is where we define our first method.  I'm sure that to many it will look very similar to a class declaration, but with a few minor key differences.

Just like with a class you will need an access modifier, a name, and the opening/closing curlies.  But you will also need a few more things.

- access modifier
- return type
    - Denotes what the method is going to be returning back once it's completed
- method name
    - The name of the method
- opening/closing parentheses
    - These are used to hold the parameters of the method
- parameter types and names
    - This allows the method to use the parameters passed to it
- opening/closing curlies

Lets take a look at another image.

![](0254e-untitled-1.png)

In our example this method is actually a very important one.  Within any C# program a static void Main() method is the entry point to the program, where all the magic starts.   This is created by ensuring that the method's access is public, it's a static method (we'll cover that in a second), it has a return type of void (meaning it doesn't return anything), and it has a name of "Main".

[Static classes and class members](https://msdn.microsoft.com/en-us/library/79b3xss3(v=vs.80).aspx) are used to create data and functions that can be accessed without creating an instance of the class.  Basically we are able to call this method (because it's static) without having to instantiate the class that it is in.  We're not going to go into static classes and methods right now, just know for this purpose it MUST be static.

## Comments

On line 5 you can see we have a comment.  Comments are literally comments that are placed within source code for developers and programmers to be able to read later.  Comments are ignored by the compiler and are simply thrown away during compilation.

There are two ways of using comments.

- Multi-line
    - Begins with /\*
    - Ends with \*/
    - Can stretch over multiple lines
- Single line
    - Begins with //
    - Can only be a single line

Using our example above this would have achieved the same results.

```csharp
using System; 
namespace HelloWorldApplication{   
    public class HelloWorld{     
        public static void Main(string[] args){       
            // my first program in C#       
            Console.WriteLine("Hello World");       
            Console.ReadKey();     
        }   
    } 
}
```

## Logic

Now for the final piece of the puzzle I'd like to call your attention to lines 6 and 7 of our Hello World program.  This is the actual logic that is contained within our program.

```csharp

using System; 
namespace HelloWorldApplication{   
    public class HelloWorld{     
        public static void Main(string[] args){       
            // my first program in C#       
            Console.WriteLine("Hello World");       
            Console.ReadKey();     
        }   
    } 
}
``` 

On line 6 you can see a call to Console.WriteLine("Hello World").  What this is doing is calling the static class "Console" and calling the static method within this class called [WriteLine](https://msdn.microsoft.com/en-us/library/system.console.writeline(v=vs.110).aspx).  Along with this we are passing in a [string](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/strings/) as a parameter.

What this line is going to do is print the text "Hello World" to the console.  Nothing more, nothing less.

On line 7 we are calling the [ReadKey](https://msdn.microsoft.com/en-us/library/system.console.readkey(v=vs.110).aspx) method within the Console class.  The ReadKey method is going to sit there waiting for user input.  Traditionally you would actually get back whatever the user typed in for further processing.  Here we are just using it to force the program to wait before completing.  Without this line our program would open, print out "Hello World" on the console, and then immediately close as it would have nothing to stop it from completing.

# Conclusion

That concludes part 1 of this tutorial. Keep an eye out for part 2 which will be coming shortly!
