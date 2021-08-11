---
title: "Working with collections - IAsyncEnumerable"
date: "2019-05-25"
categories: 
  - "general"
  - "programming"
tags: 
  - "async"
  - "c"
  - "collections"
---

Perhaps the most exciting feature in C# 8.0 was IAsyncEnumerable. At work, we have been dealing with a LOT of async calls. Prior we were having to block the thread just to get the data, and process it accordingly.

One of the more annoying things was converting existing enumerable to IAsyncEnumerable so we wouldn't have to block the thread and could keep trucking on. The following is a neat little Gist that I partially found and partially developed that I figured I'd show off.

This is an extension method, just drop into your project and call ".SelectAsync" on a collection you want to pull data out of asynchronously as well as convert to an asynchronous enumerable.

https://gist.github.com/DCCoder90/d358ace7ef36401dd6f0449d4ab87706
