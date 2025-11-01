---
title: "SQLite in C#? [Part 2]"
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

Building off the previous tutorial  [SQLite in C# \[Part 1\]](http://dccoder.local/2017/09/sqlite-in-c-part-1/) we are going to get a little more in detail with SQLite and populate our database with some information that we can pull back out later.

Lets start off with inserting information into our database.  We will do this in a similar fashion as we did creating our database table.  By creating a query string, passing it to a SQLiteCommand, and then executing the command.

- [Inserting Data](#insertingdata)
- [Retrieving Data](#retrievingdata)
- [Conclusion](#conclusion)

# Inserting Data

Since we don't need anything to be returned from this we will move on with the ExecuteNonQuery() method.

```csharp

using System; using System.Data.SQLite;



public class MyConnectionClass : IDisposable{   private SQLiteConnection _conn;



  public MyConnectionClass(){     //Here we call CreateFile to create an empty SQLite database     SQLiteConnection.CreateFile("MyDatabase.sqlite");     Connect();   }



  private void Connect(){     _conn = new SQLiteConnection("Data Source=MyDatabase.sqlite;Version=3;");     _conn.Open();   }



  public void CreatePlayerTable(){     string query = "create table playerdata (name varchar(50), hp int)";     SQLiteCommand command = new SQLiteCommand(query, _conn);     command.ExecuteNonQuery();   }



  public void PopulateSampleData(){     string sql = "insert into playerdata (name, hp) values ('Me', 100)";     SQLiteCommand command = new SQLiteCommand(sql, _conn);     command.ExecuteNonQuery();     sql = "insert into playerdata (name, hp) values ('Player2', 50)";     command = new SQLiteCommand(sql, _conn);     command.ExecuteNonQuery();   }



  public void Dispose(){     _conn.Close();   } } 

``` As you can see on line 24-31 our commands to insert data were done in the same way as the command to create a table, we just used a different query.

# Retrieving Data

Now that we have some useful information in our database, how are we going to pull it out?  Well first we need something to store our values in.  Sure we could simply print the values out to the screen, but in the manner of OOP I would rather have this continue to be a self-contained class and let the main application handle the input and output.

So lets do this by creating a struct.  I will create a struct with two fields.

```csharp

public struct PlayerData {   public string PlayerName;   public int Hp; }

```

This struct will hold the player name and their HP. Now let's place it in the same namespace but outside the class (that way other classes using this namespace can access it without having to reference our MyConnectionClass class. I have accomplished this by adding it to the same file the MyConnectionClass resides (bad practice, but did this for simplicity in this exercise).

Now lets create a method within the class that will query the database, get some data, and return the results as an array of the new PlayerData struct.

```csharp

using System; using System.Collections.Generic; using System.Data.SQLite;



public class MyConnectionClass : IDisposable {   private SQLiteConnection _conn;



  public MyConnectionClass() {     //Here we call CreateFile to create an empty SQLite database     SQLiteConnection.CreateFile("MyDatabase.sqlite");     Connect();   }



  private void Connect() {     _conn = new SQLiteConnection("Data Source=MyDatabase.sqlite;Version=3;");     _conn.Open();   }



  public void CreatePlayerTable() {     string query = "create table playerdata (name varchar(50), hp int)";     SQLiteCommand command = new SQLiteCommand(query, _conn);     command.ExecuteNonQuery();   }



  public PlayerData[] GetPlayersAtHalfHealth() {     string sql = "select * from playerdata where hp=50";     SQLiteCommand command = new SQLiteCommand(sql, _conn);     SQLiteDataReader reader = command.ExecuteReader();



    List<PlayerData> players = new List<PlayerData>();



    while (reader.Read()) {       players.Add(         new PlayerData { PlayerName = (string)reader["name"], Hp = (int)reader["hp"] }       );     }



    return players.ToArray();   }



  public void PopulateSampleData() {     string sql = "insert into playerdata (name, hp) values ('Me', 100)";     SQLiteCommand command = new SQLiteCommand(sql, _conn);     command.ExecuteNonQuery();     sql = "insert into playerdata (name, hp) values ('Player2', 50)";     command = new SQLiteCommand(sql, _conn);     command.ExecuteNonQuery();   }



  public void Dispose() {     _conn.Close();   } }



public struct PlayerData {   public string PlayerName;   public int Hp; }

```

I would like to call your attention to lines 25 - 36.  This is our new method that will get all users with an HP of 50 out of the database.  Once it gets the information it will place them all in a list one-by-one before finally returning that list as an array.

On line 28 you will see something new.  Here we are using a SQLiteDataReader.  This is an object that will effectively "read" through our results in a similar fashion as a [StreamReader](https://msdn.microsoft.com/en-us/library/system.io.streamreader(v=vs.110).aspx).  If you will notice we got this object by calling command.ExecuteReader().

On lines 32-35 we iterate through each result that is stored within the reader and we are able to access the values within each column for that particular row by using the \[\] operators.  Within which contain the column name that we are wanting to access.

The main downside to the reader is that it will always return a type of "object" so if you want to assign these to a variable (which is usually going to be the case) you will have to cast them as that type (as we did here).

# Conclusion

I hope you have all enjoyed these tutorials!  There are many more functionalities included in the System.Data.SQLite library, and I highly encourage everyone to experiment with them and try them all out.   I hope I have given you enough information to at least get started using SQLite in your .NET projects!
