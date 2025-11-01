---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'How to build a blog with Astro'
date: 2025-10-31
author: 'DCCoder'
description: 'A step-by-step guide to building a blog with Astro.'
headerimage: 'pexels-simon73-1183099.jpg'
tags:
  - 'astro'
  - 'blog'
  - 'tailwindcss'
---

So this morning I had one of those moments. I stumbled across some of my old work online and went down a rabbit hole of reminiscing. It got me thinking so much that I even posted this on LinkedIn:

> Just happened to come across my old website (thank you Internet Archive for saving that horrible piece of history) and some forum posts from 20 years ago...my my have I grown. Don't worry, I'll be showing off the spaghetti and "edgy" programs I wrote back then in a post this weekend.
>
> Jeez, and I thought kids these days were cringy 🤣😂

Well, I guess it's time to make good on that promise. Let's take a look at what I was like as a young, aspiring programmer.

\![HeaderImage](../assets/img/posts/a-blast-from-the-past/cringeteentoprofessional.png)

## The Beginning: BASIC, PHP, and Goth Kids

I got my start in programming when I was 8 years old. Yeah, 8. I somehow managed to talk my mom into buying me a book on BASIC from the local Goodwill, and I was immediately hooked. The idea that you could tell these machines exactly what to do and they would just... do it? It was magic. I dreamed of making games, cool applications, all of it.  I actually remember in 3rd grade during match class, with pencil and paper, I wrote a program (with line numbers and everything!) to re-teach the class our teacher just gave us.  I think it was on addition and subtraction, with a quiz and everything.  I was so proud when I showed it to her at the end of class.

 When I was around 11 or 12, I found a game online called [Uplink](https://en.wikipedia.org/wiki/Uplink_(video_game)). I downloaded the demo and started playing it, and I was instantly hooked. I remember begging my step-dad to buy it for me, even offering him my own money. After a few days, I finally convinced him to order it. It was this super cool "hacking sim" game with an easy-to-follow story. I can't even tell you how many hours I dumped into that game. To this day, I actually own every game that [Introversion](https://introversion.co.uk/introversion/#games) (the developer and publisher) has released. There was even one time it took me over a decade to get a support request fulfilled, a hilarious story for another time. But seriously, if you haven't heard of them, go check out their games! Either way, Uplink further solidified my love for computers and making them do interesting things. 
 
 As I got older, I fell head over heels for PHP and dove in headfirst. When I was 15, I built a website for my friends and me. It started as a simple CMS where we'd all log in after school to hang out and talk. I even got into making plugins for it. The site was called [rejectedfreaks.net](https://web.archive.org/web/20060702035536/http://rejectedfreaks.net/modules/news/). Edgy, right? But hey, we were the "dark goth kids" who nobody understood.

Eventually, I took the plunge and programmed a new version of the site from scratch using PHP and a MySQL database. It wasn't anything revolutionary, but it was ours, and it opened up a whole new world for us.

## Finding a Community: CoderProfile and VBAssassin

As my skills grew, I got more and more into the programming scene. I found a guy who went by the handle VBAssassin on the [Rohitab forums](http://www.rohitab.com/discuss/). He had created a site called [CoderProfile.com](https://web.archive.org/web/20090501033434/http://www.coderprofile.com/site), and it was awesome. It was a place for programmers to hang out, show off their work, and just chat. I learned a ton and contributed a lot to that community.

Years later, in 2017, I actually ran into him online again. We chatted a bit over email, and he's a solid guy who I still have a massive amount of respect for. I still wonder how he's doing and hope life's treating him well.

The site eventually shut down. I remember, pretty selfishly, trying to convince him to bring it back. He declined, explaining:

> I have no current plans to revive coderprofile. With hindsight and far more experience. I now see the errors of my ways. While the timing was right, I took on too much without the required resource to do so. It was stackoverflow, github, coderwall, LinkedIn and probably a few others all in one. But. I still to this day believe that I built the right culture and treated my members with the respect that many sites these days fail to achieve.

And you know what? He was right. He had his hands full, but he built an incredible community that I was lucky to be a part of.

## My "l337 h4x0r" Phase

Sorry for jumping around, but my teenage years were a bit chaotic. Back in 2007, I created my own website under my handle, [Darkvengance](https://web.archive.org/web/20070629100708/darkvengance.net/), to showcase my programming and "ultra 1337 h4x0ring skills." I was incredibly proud of it at the time. It had a slick admin panel and everything. I'd post my projects, random news, and I even offered [several services](https://web.archive.org/web/20070718014924/http://www.darkvengance.net/services.php) for a fee to help pay for hosting.

My other little venture was [MyGoldScripts.com](https://web.archive.org/web/20061024192620/http://www.mygoldscripts.com/). I sold turn-key websites for HYIP investments and gambling that used [E-Gold](https://en.wikipedia.org/wiki/E-gold) as the currency (if anyone even remembers that). Look, I was a teenager, I did some stupid stuff, not going to lie. But it made me a few hundred bucks a month doing basically nothing, which was more than enough to cover my web hosting.

## Still Coding in the Corps

Fast forward to my early 20s. I was serving in the USMC, but my love for programming never went away. I kept at it. I even made this ridiculous cupholder program in assembly, just for laughs.

```asm
format PE GUI 4.0
 include 'inc/win32a.inc'
 
        invoke  MessageBoxA,0,_text,_windowtitle,MB_ICONQUESTION+MB_YESNO
        cmp     eax,IDYES
        jne     endprog
 
        invoke  mciSendString,_open,0,0,0
        invoke  mciSendString,_eject,0,0,0
        invoke  mciSendString,_close,0,0,0
 
_text db 'Do you need a cupholder?',0
_windowtitle db 'Cupholder',0
 
_open db 'open cdaudio',0
_eject db 'set cdaudio door open',0
_close db 'close cdaudio',0
 
data import
 
 library kernel32,'KERNEL32.DLL',
         user32,'USER32.DLL',
         winmm,'WINMM.DLL'
 
 import kernel32,
        ExitProcess,'ExitProcess'
 
 import user32,
        MessageBoxA,'MessageBoxA'
 
 import winmm,
        mciSendString,'mciSendStringA'
 
end data
 
endprog:
        invoke  ExitProcess,0
```

## Looking Back

Eventually, my high school friends and I drifted apart, and I kept the `rejectedfreaks` domain for my personal site. It's wild to look back at it on the [Wayback Machine](https://web.archive.org/web/20111013190134/http://www.rejectedfreaks.net/) and see how I used to think, feel, and program. I found an old article I wrote on [Secure Hashing](https://web.archive.org/web/20111008010244/http://www.rejectedfreaks.net/modules/AMS/article.php?storyid=4). I guess I've always had a thing for blogging and trying to teach anyone who would listen.

I also wrote this port scanner in C++. Oh boy.

```cpp
#include <iostream>
#include <windows.h>
//#pragme comment(lib,"ws2_32.lib")
 
using namespace std;
 
int main()
{
//Lets get everything started
SOCKET newsock;
int startport(0),endport(0);
char addres[MAX_PATH];
WSAData wsadat;
 
//Now for the real work
SetConsol Title("Port Scanner");
newsock=WSAStartup(MAKEWORD(2,2),&wsadat);
 
if(newsock==SOCKET_ERROR){
cout<<"Couln't Open Socket";
return 0;
}
 
cout<<"Socket Opened";
newsock=socket(AF_INET,SOCK_STREAM,0);
cout<<"IP Address or Hostname:";
cin>>addres;
cout<<"n";
cout<<"n";
cout<<"Starting Port:";
cin>>startport;
cout<<"n";
cout<<"n";
cout<<"Ending Port:";
cin>>endport;
cout<<"n";
 
endport++;
 
```

Honestly, looking back at all this is a little embarrassing. But only a little. It's a powerful reminder of how much I've grown. From writing these playful little programs to designing and building enterprise systems that serve millions of users a day. I've come a long way.

While I was looking around I realized my old domains were up for grabs still, so I snatched them up. I probably won't do anything with them but I would like to retain ownership for posterities sake at the minimum. Who knows, maybe turn it into a weird museum or something lmao

And that's something to be proud of. While yeah, I was that cringey, teenage, "uber-awesome haxor," I was also learning, growing, and figuring things out. And I can look back on those memories, when things seemed so much simpler, with a lot of fondness.