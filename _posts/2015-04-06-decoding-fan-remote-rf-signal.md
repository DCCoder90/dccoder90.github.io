---
title: "Decoding fan remote RF signal"
date: "2015-04-06"
categories: 
  - "posts-from-old-site"
  - "rf"
tags: 
  - "gnuradio"
  - "news"
  - "radio"
  - "rf"
  - "sdr"
---

It’s been quite a while since I’ve last posted here so I figured I’d do a little experiment.  I haven’t even touched my SDRs in a few months, but I recently purchased a [HackRF](https://web.archive.org/web/20150523023304/https://greatscottgadgets.com/hackrf/) and [WIFI Pineapple](https://web.archive.org/web/20150523023304/https://www.wifipineapple.com/) (they haven’t arrived yet) so I figured I’d pull out my old dongles and brush up some on SDR and DSA.  Well, I wanted to start with the simplest thing I could think of so I grabbed a [remote control for our ceiling fans](https://web.archive.org/web/20150523023304/https://apps.fcc.gov/eas/GetApplicationAttachment.html?id=919219) and decided I’d try to decode the signal.

On the back I located the FCC ID and did a search on it over at the FCC’s .gov website.  With this all that I looked at was the operating frequency which turned out to be 303.758MHz, well within range of my receiver.  From here I tuned to the frequency and came up with a little [GRC](https://web.archive.org/web/20150523023304/http://gnuradio.org/redmine/projects/gnuradio/wiki) Flow Graph to run so I could visualize it.

![](images/Graph-300x127-300x127.png)

Here is the signal it through out (after some tuning of course):

![](images/Signal-300x224-300x224.png)

Now I’m sure even the most basic of beginners can identify this modulation…that’s right! It’s OOK!  From here just by pausing the display I could visually determine the bits within the string.  I made sure to type down what each button said.

![](images/bits1.png)

Now, armed with this I decided to take a closer look at the bits.  After looking at them for a few minutes and playing around with the DIP switches on the back of the controller (next to the battery) I was able to determine the first bit had to be a parity bit, the four after it where the ID, and the remaining where the actual command that is sent to the fan.  I plugged them all into a spreadsheet for a little easier reading.

![](images/Organized.png)

_Note: As you can see the first row and the last row contain the same command but different ID, this is because I pressed the same button for each, but the DIP switches were in different positions (to select a different fan)._

 

That’s about it for this entry, when my HackRF and WIFI Pineapple arrive I’ll be sure to post some more updates due to the fact that I’ll be playing around with them a LOT.
