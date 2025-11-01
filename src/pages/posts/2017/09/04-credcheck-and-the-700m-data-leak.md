---
title: "CredCheck and the 700m data leak"
date: "2017-09-04"
categories: 
  - "projects"
  - "security"
tags: 
  - "application"
  - "leak"
  - "login"
  - "news"
  - "passwords"
  - "project"
  - "security"
coverImage: "ab431-password-leak-6-tips-online-account-security-35010-249682.jpg"
---

In light of the recent [700 million email data leak](https://www.theguardian.com/technology/2017/aug/30/spambot-leaks-700m-email-addresses-huge-data-breach-passwords) on August 30 of this year, I have created [CredCheck](https://github.com/DCCoder90/CredCheck).  I would like to throw out a personal thanks to [Troy Hunt](https://www.troyhunt.com/) owner and operator of [HaveIBeenPwned](http://www.haveibeenpwned.com).  CredCheck is a windows program that uses the HaveIBeenPwned API to check email addresses and give details on who's information has been leaked, and how severe the leak was.

Troy managed to gain access to the details of the leak after a Paris-based hacker, who goes by Benkow, located the server (which is based in the Netherlands).  Just knowing the IP address of the server Troy was able to easily browse the entire contents, of which were obtained by [Ursnif](http://blog.trendmicro.com/trendlabs-security-intelligence/ursnif-the-multifaceted-malware/), a trojan that is specifically designed to steal login and payment details.

In 2011 [an analysis of the Gawker password set](https://www.lightbluetouchpaper.org/2011/02/09/measuring-password-re-use-empirically/) found 76 percent of people reused, or "recycle" their passwords.  The dangers of this are insurmountable, especially when leaks like what just occurred do happen.  When leaks occur, if you are one of those that happen to reuse passwords now attackers and/or just random people online have access to every account you own, pardoning 2-factor authentication [which has also been shown not to be fool-proof](http://www.securityweek.com/two-factor-authentication-bypassed-simple-attacks).

The easiest way around this is to [use a password manager](https://www.howtogeek.com/141500/why-you-should-use-a-password-manager-and-how-to-get-started/) to easily keep up with unique passwords for every account you have.  Password managers make it easy to secure all of your login credentials in one place, and most these days allow for random password generation and have the ability to easily change passwords for other sites.

[LastPass](https://www.lastpass.com/) is by far one of my favorite ones, but there are others out there.  I fully encourage everyone to check to see if your creds have been leaked and immediately go and change them!
