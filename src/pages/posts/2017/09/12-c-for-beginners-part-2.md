---
share: true
title: "C# for Beginners [Part 2]"
date: "2017-09-12"
categories: 
  - "programming"
  - "tutorials"
tags: 
  - "net"
  - "beginners"
  - "c#"
  - "tutorial"
headerimage: "b4ab2-c-tutorial-for-absolute-beginner-360x240-1.jpg"
---

In the [previous tutorial](https://dccoder.com/posts/2017/09/10-c-for-beginners-part-1//) we covered some basic structure of a C# program and what it looks like.  I would like to build upon that knowledge and cover some of the basic syntax of C#, some of this may be slightly repetitive from the previous tutorial but it is important to get this basic syntax down.

# The Using Keyword

We briefly covered the using keyword in the previous tutorial.  The using statement simply allows the file it's included in to access another namespace.  It is best practice to place all of your using statements at the top of the file.  A program and/or file may contain an unlimited amount of using statements and there is no performance hit to having un-required using statements (Though it will make it look messy).

# Comments in C#

Just like with the using statement, we also briefly covered comments in the the previous tutorial.  Comments are lines that are simply there so you can make a note to yourself or someone else that may be looking at/working with your code in the future.

Comments are good for explaining unclear code, or just to make a note.  Most IDE's these days support [comment tasks](https://blogs.msdn.microsoft.com/zainnab/2010/06/07/todo-comments-in-the-task-list-2/) to help you remember a task that you need to do.

Comments can be single line or multi-line.  Single line comments are simply two slashes followed by the comment, and as their name implies they only span one line.

Multi-line comments begin with a slash followed by an asterisk, they are ended with an asterisk followed by a slash.  Multi-line comments (again as their name implies) may span several lines.

```csharp
//This is a single line comment

/* As you can see, comments can also span multiple lines. Just try not to go crazy with it though. K? */
```

# Variables

Variables are special elements that are used for storing data.  They can be used to store nearly anything and be nearly any kind of type.  Variables are created by specifying a type and a variable name.  The name is how you interact with the variable after it is created.

The example below demonstrates how to create a variable that will hold an integer, I have decided to call this variable "_somenumber_". 

```csharp
int somenumber;
```

As you can see that is all that is required to create a variable.  At some point you may want to initialize it though.  Initializing a variable is nothing more than storing something inside of it.  Since most variables are not created until they are needed (as they do take up some space in memory even when they're not holding anything), most people initialize them upon creation.

Initializing a variable is similarly very easy to accomplish.  This is done with the assignment operator (also known as the equals symbol).  Anything on the right hand side of the assignment operator is placed into whatever is on the left side.  In the example below we place the value of 5 in our "_somenumber_" variable.

```csharp
int somenumber = 5;
```

C# is what is referred to as a "[strongly-typed](http://whatis.techtarget.com/definition/strongly-typed)" language.  This typically means that every variable's type **must** be defined during the variable's creation.  Granted this has taken a step back towards a more loosely typed language in recent years with the [var keyword](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/var) but for now let's just assume that it is still strongly typed.

# Methods

A method, or also commonly referred to as a function, is usually defined as a collection of statements that perform a specific task.   This definition is fairly ambiguous, I like to think of methods as a way to easily reuse repetitive statements.

Methods are created by defining a return type, a name, a set of parameters, and defining the method's scope.   This was briefly covered in the previous tutorial so let's bring in that image to help out.

![](0254e-untitled-1.png)

As you can see here we are looking at the "Main" method within our HelloWorld program.  Here we have a return type of void (which literally means nothing), a name for the method (Main), and the parameters (string\[\] args).  The scope is set by the opening and closing curly braces.

When called this method will run beginning from the opening curly brace and will finish when it reaches either a return statement, or it hits the closing curly brace.

# Identifiers

An identifier can be simply identified as a name.  An identifier is anything that is used to identify a class, variable, method, or anything else.  For a quick example, if we created a new string variable called _mystring_ like below: 

```csharp
string mystring = "This is just some random string";
```

In this example the identifier would be "_mystring_" as that is the variable's name.

When creating identifiers (aka names) it is important to remember that there are a few rules.

- An identifier must begin with either a letter or an underscore
- An identifier may contain numbers, letters, or underscores but cannot contain special characters
- An identifier can not be a reserved keyword

# Reserved Keywords

Reserved keywords are words that are predefined by the compiler and have a specific meaning or function to the C# language.  These words cannot be used as identifiers for methods, classes, variables, or anything else.  If you are dead-set on using these, however, you can place the @ character before the name.

Please see the table below for a current list of all C# reserved keywords.

**Warning:** _Using the @ character suppresses compiler warnings.  This can lead to unintentional consequences, I would recommend just choosing a different name._

| Reserved Keywords |
| --- |
| abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock | long namespace new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual void volatile while |

If you like these tutorials please reach out and give me some feed back! Let me know what you like and what could be done better either through [here](https://www.linkedin.com/in/dccoder/) and stay tuned for part 3!
