---
share: true
title: "Reinstalling Nuget Packages"
date: "2018-10-04"
categories: 
  - "general"
coverImage: "259f5-screenshot.png"
---

So the majority of this morning I have been struggling trying to get a project to correctly build, fighting nuget packages.  The issue was coming from missing dependencies.  I tried all sorts of methods through visual studio to attempt to get the problem fixed, yet nothing worked.  I tried multiple times, but each time visual studio claimed they were up-to-date.  We have been having issues with redirect bindings so a coworker suggested I check those.  The redirect bindings in the project were fine, but finally I figured it out.

While visual studio thought everything was good, the problem was that the nugets were not installed.  I opened the package manager console and typed the following command:

```text
Update-Package -reinstall
```

This reinstalled all of the nugets in my solution without updating them and viola! The problem was fixed.  I bring this up to remind everyone of just how useful that little console at the bottom of your screen can be.  If it was not for the package manager console the problem could still be fixed but would have been very tedious.  Another useful command is:

```text
Update-Package -reinstall -Project ProjectName
```

This will perform the same action but only on a single project within your solution.
