---
share: true
description: "After a sudden, unannounced pricing update to the secrets manager Infisical locked me out of my own homelab, I had to completely rethink my CI/CD pipelines. This frustrating experience serves as a stark reminder of why establishing and maintaining trust is absolutely essential when choosing tools for your critical systems."

title: "Trust in critical systems"
date: "2026-07-24"
categories:
  - "general"
tags:
  - "update"
headerimage: "locked-out-header.png"
---

So, where do I start? First, hello everyone! I've started to realize that I fall into this trap of giving my website a lot of love and attention when I'm looking for a job, and then when I am employed, it kind of falls by the wayside. This is definitely something I need to work on.

Regardless, I am here and I am employed! Since my post back in October 2025, I found a new position with a company called [Temporal.io](https://temporal.io) and, wow. I don't want to be *that* guy, but the engineer in me really has to point it out: this is truly an amazing product. I am part of the Developer Success team, so if you're speaking to support, there's a good chance I might chime in to help you out with a problem you're having. :)

I have to say, I actually really enjoy this role. It's a lot different than my background in traditional software engineering, but all of my skills and past experiences absolutely help me out here. Reading source code, interpreting metrics, understanding architecture, developing reproductions, it’s basically a customer-facing software engineering job, but the customers are other engineers, so they speak my language! It’s really cool, and I get to assist in building customer confidence in our product.

Speaking of confidence, that's actually what I want to talk about today.

## The Homelab & Infisical

For over a year now, my home network has been software-defined, relying heavily on CI/CD pipelines to deploy services and handle the networking behind the scenes. Late last year, I was looking into a better system for secrets management and landed on a product called Infisical. I had [heard about it several years ago](https://www.reddit.com/r/programming/comments/z12szx/i_created_a_open_source_secrets_manager_check_it/) but shied away due to its infancy.

[At the time I noticed it](https://web.archive.org/web/20251206215935/https://infisical.com/pricing), the free tier was fairly generous and had everything I needed for my deployments. Over time, I began to rely on it more and more. Earlier this year, I realized they had released PAM (Privileged Access Management). With it included under their [free tier and "Free forever" plan](https://web.archive.org/web/20260310130528/https://infisical.com/pricing), my interest was definitely piqued!

![First Support Contact](freeforever.png)

After a slow integration, I began using it more heavily across my homelab. I even had a productive conversation with someone on their team about a few limitations I noticed, but overall, I saw it as an amazing tool.

## The Incident: Locked Out

With Infisical managing the credentials for my hardware and my access to them, I slowly tied it into my CI/CD pipelines, and it worked like a charm. For a while.

Last week, they changed how they handled PAM and introduced [breaking changes](https://github.com/Infisical/cli/pull/266) to the CLI tool, removing many of the flags that my pipelines relied upon. Okay, no big deal, right? Just adjust how that's handled. But then I noticed all of my credentials were suddenly placed into a state where I could no longer access them. I reached out to support on their community Slack:

![First Support Contact](Screenshot%202026-07-24%20184700.png)

I figured it was potentially my fault for not using the system correctly. I can own that and suffer the consequences. I spent the last few days getting back into the systems I could and backing up data just to make my life a little easier. Out of the five servers running in my rack, three were only accessible through Infisical and/or those credentials. All in all, I fully lost access to one node. No big deal (it was only running some metrics services anyway), but while it was frustrating that there were no notices or release notes detailing this, I moved on.

Fast forward to today. This morning, a [new deployment apparently rolled out](https://infisical-users.slack.com/archives/C04BSBMQAQ7/p1784895061635709?thread_ts=1784826528.621829&cid=C04BSBMQAQ7). When I tried logging in to access my systems, I was met with an error. I attempted to log in through their cloud platform and noticed this:

![Locked out](Screenshot%202026-07-24%20212429.png)

Oof... did I just get locked out? No way. After all, this is *free forever*, right? Right?!

![Locked out](nofreeforyou.png)

It seems that at some point this morning, Infisical quietly updated their pricing structure to [remove PAM from their free tier](https://web.archive.org/web/20260716200743/https://infisical.com/pricing). While simultaneously [announcing that they're just now launching PAM](https://www.linkedin.com/posts/today-were-launching-infisical-pam-privileged-ugcPost-7486450486393577472-Typh/?utm_source=share&utm_medium=member_desktop&rcm=ACoAABHiKrMBJOBjFgDyOsqGaxGnB322JThrzfk), none of this adds up. Why was it on their website and docs for so long if it's just now being "launched"?

### Quick update 7/26/26

I did hear back on their community slack.  I was informed that it `might be a mistake` and to contact their support email.   I did that and am awaiting a response.   I also noted that the concept of "Free forever" has been removed from all of their pricing pages.   If you are on the "Free" tier with Infisical, that's your warning there.  Get out while you still have access to your secrets.

## The Fallout & Moving Forward

So now I'm stuck in an awkward position: do I pay for PAM just to regain access to my services? Or do I wipe those three systems and start fresh? Because everything was formerly managed via CI/CD pipelines, it shouldn't be too difficult to get things configured to redeploy those services. But ultimately, I relied on this tool because I trusted a company in the security sector when they said "Free forever."

If they will not be honest about that, what else are they going to be dishonest about? Will they hold my secrets hostage next?

I reached out to their Slack support again, but to be fair, they haven't had enough time to respond yet:

![Shouting into the void](Screenshot%202026-07-24%20184626.png)

Ultimately, I have lost faith and confidence in them. While I would have happily paid for the service, the consequences of these changes were foreseeable (holding hardware hostage). Not to mention, they blatantly lied about their "free forever" promise. I can no longer trust them with my sensitive information and am moving away from them permanently.

I will likely move over to [OpenBao](https://openbao.org) and self-host it, or investigate the many other secrets management platforms out there. But again, if a company that holds your secrets will lie to you, what else will they do? This is exactly why it's so important to establish and maintain trust in the software ecosystem. I highly doubt I'm the only one who got burned by this.

I state all of this because, yes, it's just my homelab. Is it a major pain in the tail? Yes. Is it the end of the world? No. But I utilize these systems locally to identify if they'll be a good fit or not, so that I can offer an authoritative answer when recommending tools to a company, a friend, or anyone else.

I undoubtedly cannot recommend Infisical for any type of serious workflow or workload. Maybe this will change in the future, but for now, steer clear and stick with OpenBao or Vault.