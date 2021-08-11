---
title: "Hello C# 8, goodbye null reference!"
date: "2018-07-13"
categories: 
  - "news"
  - "programming"
tags: 
  - "net"
  - "c"
  - "csharp"
  - "development"
  - "update"
coverImage: "71ba2-c.png"
---

Say hello to C# 8.0 and goodbye to those nasty little null-reference exceptions!   That's right, Microsoft is getting ready to release yet another major version of the language!  This has been common knowledge for a little while now, so I may be slightly behind.  Behind or not, I still wanted to bring it up.  I am excited about all of the changes and features coming in the new C#.  I don't have the time or the space here to cover all of them but I will touch on some of the most drastic and useful features being added in.

 

# Null references

[![Brace Yourself, NullRef Exception incoming](images/8535e-brace-yourself-nullreferenceexception-incoming.jpg)](https://dccoder.files.wordpress.com/2020/09/8535e-brace-yourself-nullreferenceexception-incoming.jpg)

Let's face it, we've all been there.  Everything compiles, we run our program eagerly awaiting it's output.  Then BAM!  A big nope screen is thrown in your face, saying something about a NullReferenceException.  Believe it or not Null References were suppose to be a thing of the past a long time ago.  Thankfully the C# designers have finally gotten around to trying to get rid of them.   Currently by default all reference types as well as variable types are nullable, this is all about to change.

#### Non-nullable by default

Starting with C# 8.0 reference types, by default, will be non-nullable.  Now this isn't to say that you can't make them that if you so choose, but again this is by default.  The C# compiler is also going to help you on this quest by throwing some helpful warnings if you forget to check for nulls or forget to make them nullable.   Take a look at the example below:

 

\[cc lang="csharp" escaped="true"\] ISomeType notNull; ISomeType? mayBeNull;

notNull = null; //This will throw a compile warning mayBeNull = null; //This won't \[/cc\]

Another nice aspect about this is now it will also throw a warning if you forget to check if a nullable is actually null. This is a feature I believe is going to come in very handy. Take a look below:

\[cc lang="csharp" escaped="true"\] ISomeType notNull = GetSomeType(); ISomeType? mayBeNull; = GetSomeType();

mayBeNull.Execute(); //This will throw a warning (we didn't make sure it wasn't null!) notNull.Execute(); //This will run fine

if(mayBeNull !=null){   mayBeNull.Execute(); //This won't throw a warning (because we checked) } \[/cc\]

 

# Records

I'm sure most of us have worked with [POCOs](https://en.wikipedia.org/wiki/Plain_old_CLR_object), creating numerous classes that are simply just going to be used to define a data structure and hold it.  Traditionally this meant writing out a whole new class and defining it's properties.  Thanks to C# 8.0 we now have records!  With records you can easily and quickly create these "container classes" with one line of code!  For example, instead of having to type of this:

 

\[cc lang="csharp" escaped="true"\]

public class Person: IEquatable<Person>{   public string FirstName { get; }   public string LastName { get; }

  public Person(string firstName, string lastName){     this.FirstName = firstName;     this.LastName = lastName;   }

  public bool Equals (Person other){     return Equals(FirstName, other.FirstName) && Equals(LastName, other.LastName);   }

  public override bool Equals(object obj){     return (obj as Person)?.Equals(this) == true;   }

  public override int GetHashCode(){     return FirstName.GetHashCode() + LastName.GetHashCode();   }

  public void Deconstruct(out string FirstName, out string LastName){     FirstName = this.FirstName;     LastName = this.LastName;   } }

\[/cc\]

 

Now you can just do this and get the same results!

\[cc lang="csharp" escaped="true"\] public class Person(string FirstName, string LastName); \[/cc\] Now, I don't know about you but this is definitely one of the more helpful features that I've seen.

 

# And many more!

 

These are just two examples that I decided to speak on simply because I find them fascinating but there are many other features in C# 8.0!  Check out the links below to find out more!

- [https://www.infoq.com/articles/default-interface-methods-cs8](https://www.infoq.com/articles/default-interface-methods-cs8)
- [https://www.kenneth-truyers.net/2018/03/20/whats-new-c-8-0/](https://www.kenneth-truyers.net/2018/03/20/whats-new-c-8-0/)
- [https://codeblog.jonskeet.uk/category/c-8/](https://codeblog.jonskeet.uk/category/c-8/)

https://stackify.com/csharp-8-features/
