---
share: true
title: "Just tell me what's wrong!"
date: "2020-09-08"
categories: 
  - "general"
  - "personal"
  - "programming"
tags: 
  - "bugs"
  - "pebkac"
  - "users"
coverImage: "whatswrong-shirt.jpg"
---

So after years of being a developer there is one issue that I keep facing when dealing with customers. Getting them to tell me what's wrong. I have to be honest, this post is inspired by a co-worker, but I'm withholding names because she's a treat to work with and I genuinely like her. Plus it turns out the problem wasn't on my end and she did get in touch with the correct individual, she was just being sure to loop me in. It just reminded me of all the times I had to deal with the aggravation that is issue discovery.

Regardless of that incident though, I still face the same issue when it comes to users informing me of bugs or quirks in a program. Very rarely do I get this from a tester.

> It isn't working
> 
> ~User feedback

The quote above is one that I would regularly hear from those not in the tech industry, it seems as though they put little thought into how inaccurate or misleading this statement is.

Years ago I was working on a very complex distributed application completely by myself. The client came back and told me "the program isn't working". I logged in, and checked a few things but all seemed to be operating as expected. After emailing the client back they changed it to "It's not sending text messages!", I logged in again and after 2 hours of testing I discovered that it did send text messages, 2FA tokens, etc but failed to send alerts. Ultimately I billed the client for about 3hrs of testing.

As you can see from the experience above rather than saying the entire application isn't working, it helps to be specific. You wouldn't tell a mechanic that your entire car wasn't working if your A/C went out, so I'm not sure why people treat software differently.

Now I'm not trying to disrespect anyone, but it does take an exorbitant amount of time simply teasing out what the actual issue is from the user, if you're able to at all.

## PEBKAC

![](https://dccoder.files.wordpress.com/2020/09/external-content.duckduckgo.com_.gif?w=777)

This has to be another large point of aggravation, [PEBKAC](https://en.wikipedia.org/wiki/User_error) issues. These usually result from users that despite all odds are unable to follow instructions, read on-screen prompts, or just use general common sense.

I'm not talking about complicated UIs or unusual layouts, I'm talking about the issues where a user goes to log in, they type in their username and password and then complain about how they can't log in and as such the entire application doesn't work. When they seem to leave out the little fact that they didn't click the big button that says "Login".

I feel like I'm going on and on with this rant, and it's slowly starting to lose structure. I hope my point is getting across, and as such I leave you with a little advice.

If you're working solo, or as a consultant follow these steps to make your life just a tad bit easier. While giving users a single and well-defined method of reporting issues, ensure that they also provide contact details so you can get in touch with them should you need additional information. On top of this, make sure they answer the following questions:

- What were you doing?
- What did you expect the program would do?
- What did the program do instead?
- How did you get to that area of the program?

The questions themselves seem fairly trivial, but they can be extremely helpful, and let's face it users don't typically think like developers so it's rare that they think to answer these questions in the initial report.

Having them answer these questions will drastically decrease your turn-around time and increase their happiness with the product.

## Rant over

Sorry for the rant, and I apologize to my co-worker I called out in the beginning (if you see this just know you're awesome and I love working with you). Just figured I'd write about it while it was on my mind. I may come back and clean this post up some more at a later date.
