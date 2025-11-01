---
title: "SQLite in C#? [Part 1]"
date: "2017-09-10"
categories: 
  - "programming"
  - "tutorials"
tags: 
  - "net"
  - "c"
  - "sql"
  - "sqlite"
  - "tutorial"
coverImage: "3626a-sqlitelogo-200x200sm.png"
---

I can't tell you how many times I am working on an application that I want to store data in an organized fashion but I don't want the dependency of an external server.  Maybe I want to be able to use the application offline?  Or maybe the device I am running it on doesn't have the ability to hold a database server.

Enter the realm of SQLite.  I have used it extensively in the past with simple Python and PHP applications, but now I figured I'd give a good overview of using it with C# and .NET.

The following is a great reason to use SQLite, however it is not the only.  Be sure to check out the [SQLite website](https://www.sqlite.org/) for a better overview of this system.

> Because an SQLite database requires no administration, it works well in devices that must operate without expert human support. SQLite is a good fit for use in cellphones, set-top boxes, televisions, game consoles, cameras, watches, kitchen appliances, thermostats, automobiles, machine tools, airplanes, remote sensors, drones, medical devices, and robots: the "internet of things".

 

- [Using SQLite with .NET](#usingsqlite)
- [Tutorial](#tutorial)
- [Connecting to a Database](#connectingtoadatabase)
- [Creating a Database](#creatingadatabase)
- [Executing Queries](#executingqueries)
- [Creating/Inserting Information](#creatinginsertinginformation)

# Using SQLite with .NET

The .Net framework (as of this writing) has great resources for interacting with various databases and serializing to/from files and other resources.  Sadly, SQLite is left out for some reason.  This is where we need to thank the developers of this system for providing us with [System.Data.SQLite](https://system.data.sqlite.org/) This is an ADO.NET provider for SQLite and gives all the functionality you could hope for to interact with it.

Now, I believe it is important to point out that this is not a standard library (meaning it isn't packaged with .NET), so you will have to download it and include an assembly reference in your project.

Some precompiled binaries are available over on the System.Data.SQLite [downloads page](https://system.data.sqlite.org/index.html/doc/trunk/www/downloads.wiki), as well as the source code.  The documentation is also available via a CHM file, which I haven't been able to get to work correctly for me.

# Tutorial

## Connecting to a database

Before anything else can happen we first need to be able to connect to our database to access some of it's finer features (like maybe the data?).

Just like any other library you will need to include the using statement to access the namespace, then you will simply have to create a SQLiteConnection object.

```csharp

using System.Data.SQLite;



public class MyConnectionClass{   private SQLiteConnection _conn;



  public MyConnectionClass(){     _conn = new SQLiteConnection("Data Source=MyDatabase.sqlite;Version=3;");     _conn.Open();   } }

``` The above is a great example of how to do this.  I typically also make my classes implement IDisposable in order to ensure everything is properly shutdown and destroyed when no longer in use.

```csharp

using System; using System.Data.SQLite;



public class MyConnectionClass : IDisposable{   private SQLiteConnection _conn;



  public MyConnectionClass(){     _conn = new SQLiteConnection("Data Source=MyDatabase.sqlite;Version=3;");     _conn.Open();   }



  public void Dispose(){     _conn.Close();   } }

```

Within the connection string you can see I placed two items.  One is the Data Source, this is the path to your SQLite database.  The second is the version, this tells the library what version of SQLite our database is.  You can find more details on connection strings here: [http://www.connectionstrings.com/sqlite](http://www.connectionstrings.com/sqlite)

## Creating a Database

Usually you won't have to create a database right out the gate but maybe you would like to for error handling, or maybe you want to create a blank schema on a first run.   Either way, this is easy to accomplish.

You can create a new database using the CreateFile static method of SQLiteConnection.  See below for a quick example:

```csharp

using System; using System.Data.SQLite;



public class MyConnectionClass : IDisposable{   private SQLiteConnection _conn;



  public MyConnectionClass(){     //Here we call CreateFile to create an empty SQLite database     SQLiteConnection.CreateFile("MyDatabase.sqlite");     Connect();   }



  private void Connect(){     _conn = new SQLiteConnection("Data Source=MyDatabase.sqlite;Version=3;");     _conn.Open();   }



  public void Dispose(){     _conn.Close();   } }

```

## Executing Queries

Within the SQLite library there are a few different methods of executing queries.  But all will use [SQL](http://www.sqlitetutorial.net/) queries.

### Creating/Inserting Information

To start off we'll create a table that will store some player information for a game we are making.  What we want to do is simply store the player's name and store their health points (HP).

We'll do this by first off setting our query in a string variable.  Then we'll creating a SQLite command.

```csharp

using System; using System.Data.SQLite;



public class MyConnectionClass : IDisposable{   private SQLiteConnection _conn;



  public MyConnectionClass(){     //Here we call CreateFile to create an empty SQLite database     SQLiteConnection.CreateFile("MyDatabase.sqlite");     Connect();   }



  private void Connect(){     _conn = new SQLiteConnection("Data Source=MyDatabase.sqlite;Version=3;");     _conn.Open();   }



  public void CreatePlayerTable(){     string query = "create table playerdata (name varchar(50), hp int)";     SQLiteCommand command = new SQLiteCommand(query, _conn);   }



  public void Dispose(){     _conn.Close();   } }

```

As you can see in our example on line 19  we initialized a string variable called "query" with a simple SQL query to create a table to hold our player data.  On line 20 we created our SQLite command.  We still have one issue though....we haven't told it to execute the command!  Maybe we should do that now.

In this example, we are using the ExecuteNonQuery() method to execute the command.  This method is for when you want to execute something on the database but you are not expecting or not wanting to have anything returned.

```csharp

using System; using System.Data.SQLite;



public class MyConnectionClass : IDisposable{   private SQLiteConnection _conn;



  public MyConnectionClass(){     //Here we call CreateFile to create an empty SQLite database     SQLiteConnection.CreateFile("MyDatabase.sqlite");     Connect();   }



  private void Connect(){     _conn = new SQLiteConnection("Data Source=MyDatabase.sqlite;Version=3;");     _conn.Open();   }



  public void CreatePlayerTable(){     string query = "create table playerdata (name varchar(50), hp int)";     SQLiteCommand command = new SQLiteCommand(query, _conn);     command.ExecuteNonQuery();   }



  public void Dispose(){     _conn.Close();   } }

``` Now if we were to run this and call the CreatePlayerDataTable method it should create a new table within our SQLite database to store our player data!

 

This concludes part 1 of this tutorial.  I have decided to break it up into a few sections.  For more be sure to check out [Part 2!](http://dccoder.local/2017/09/sqlite-in-c-tutorial-part-2/)
