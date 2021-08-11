---
title: "Unit Testing while maintaining access restrictions"
date: "2018-11-25"
categories: 
  - "programming"
  - "tutorials"
tags: 
  - "net"
  - "access-modifiers"
  - "c"
  - "csharp"
  - "internals"
  - "unit-test"
coverImage: "6ecd9-fig-24-11-2018_20-37-55.jpg"
---

Let's start off by saying that if you're not writing Unit Tests....you should.  Unit testing is everywhere these days, from Bootcamps, to tutorials, to books.  There is a good reason behind this too.  Unit tests help developers create a fully functional, bug-free applications.  Giving near instant feedback on whether you just broke your code or not can save many headaches in the long run.  I see many of those new to unit testing falling trap to a common pitfall: Changing access modifiers.  Let's take a look at how to write your unit tests without having to change your modifiers.

## TLDR;

Apply this in one of the files of your project to expose "internals" to test projects:

\[cc lang="csharp" escaped=true\] using System.Runtime.CompilerServices; \[assembly:InternalsVisibleTo("MyTestProjectName")\] \[/cc\]

Or, if you are using the new csproj files add this to your csproj file:

\[cc lang="xml" escaped="true"\] <ItemGroup>   <AssemblyAttribute Include="System.Runtime.CompilerServices.InternalsVisibleTo">     <\_Parameter1>$(MSBuildProjectName).Test</\_Parameter1>   </AssemblyAttribute> </ItemGroup> \[/cc\]

 

## Intro

I'm sure most of you know what access modifiers do, if you don't be sure to check out part one of my [C# for Beginners](http://dccoder.com/2017/09/c-for-beginners-part-1/) tutorial.  Unit tests are exactly what they sound like: Tests that check a unit of code.  A unit is considered the smallest part of a program, and is usually a single method.    Now unit testing is much more comprehensive than I can delve into here, infact the topic deserves a book of it's own.  Good thing there are already some written!

[![](//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1788292480&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=dccoder-20&language=en_US)](https://www.amazon.com/NET-Core-Test-Driven-Development/dp/1788292480/ref=as_li_ss_il?ie=UTF8&qid=1543092183&sr=8-1-spons&keywords=unit+tests&psc=1&linkCode=li2&tag=dccoder-20&linkId=28f767f1b724ccb8233891f295694f61&language=en_US)![](https://ir-na.amazon-adsystem.com/e/ir?t=dccoder-20&language=en_US&l=li2&o=1&a=1788292480)[![](//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1617290890&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=dccoder-20&language=en_US)](https://www.amazon.com/dp/1617290890/ref=as_li_ss_il?coliid=I3MT5HW7TVWXDL&colid=OF9KICLQI0VC&psc=0&ref_=lv_ov_lig_dp_it&linkCode=li2&tag=dccoder-20&linkId=46ce73cc11040e9b35d0a4c8f17d58c1&language=en_US) ![](https://ir-na.amazon-adsystem.com/e/ir?t=dccoder-20&language=en_US&l=li2&o=1&a=1617290890)

 

Be sure to check out the books above for an in-depth analysis and steps on proper unit testing.

 

## Access Modification

Many new developers, or developers new to unit testing seem to think that every aspect of their program needs a test around it.  Every property, method, variable, etc.  Considering that properties and methods marked private or internal are not accessible by anything outside of the assembly or class how do we test them?  Do we change them to public?  Is there some witchcraft that magically checks  that they are working correctly?  No.

When writing tests one must keep in mind the significance around methods and properties marked as private.  The entire purpose of the private modifier is to ensure that only the class knows about it's existence, and it should not effect anything outside of the class.  [Due to the exact purpose being privately marked items, they are rarely if ever tested.](https://softwareengineering.stackexchange.com/questions/274937/is-it-bad-practice-to-make-methods-public-solely-for-the-sake-of-unit-testing)   We want to test anything that anything else can access.  We also want to ensure that we are only exposing a public API with well known behaviors.  These "well known behaviors" are behaviors which are checked by tests.

As far as internal methods go, we actually have a way to expose these to our test projects!

## Exposing Internals to Test Projects

When testing your projects at times it may be necessary to expose objects marked as "internal" to your test projects.  Microsoft actually has a built in assembly attribute to assist with this.  Simply add the following attribute and corresponding using statement to any file within your project.

\[cc lang="csharp"\] using System.Runtime.CompilerServices; \[assembly:InternalsVisibleTo("MyTestProjectName")\] \[/cc\]

This is an assembly-wide attribute that will expose your internals to whatever project you put in place of "MyTestProjectName".

 

For those of you that are using the new csproj files there is a much cleaner method of this. Instead of adding the attribute you can simply add the following to your csproj file to perform the same thing:

\[cc lang="xml" escaped="true"\] <ItemGroup>   <AssemblyAttribute Include="System.Runtime.CompilerServices.InternalsVisibleTo">     <\_Parameter1>$(MSBuildProjectName).Test</\_Parameter1>   </AssemblyAttribute> </ItemGroup> \[/cc\]

This example automatically makes your internals visible to a project named "YourProjectsName".Test.  If you want to change the name of the project simply change the value of Parameter1 to whatever project name your tests reside in.
