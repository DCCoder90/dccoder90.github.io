---
layout: ../../layouts/MarkdownPostLayout.astro
share: true
title: "ACP: AI in your shopping"
date: "2025-10-26" 
categories:
  - "ai"
tags:
  - "ai"
  - "llm"
  - "agentic ai"
  - "mcp"
  - "acp"
  - "commerce"
  - "shopping"
---
Okay, check this out. There's yet a another development on the agentic AI front.  Now it's something called the [Agentic Commerce Protocol (ACP)](https://www.agenticcommerce.dev). You've probably heard me talk about agentic AI before in some of my [recent blog posts](https://dccoder.com/2025-10-24-ai-vs-agentic-ai/), well here we go again.  Now we're not just working with tools but plugging it directly into how we shop online, especially within conversational platforms like ChatGPT.

Think about it: you're chatting with an AI, maybe getting recommendations or asking questions about a product, and then... boom, you can actually buy it, right there in the chat. No more hopping over to a different website, filling out endless forms, searching around for the product or digging around for your credit card details. That's the core idea driving ACP.   I know, I know, this can either be really cool or really scary.  But let's dig into it.

## What Exactly is ACP?

At its heart, it's an open standard, [collaboratively maintained by OpenAI and Stripe](https://github.com/agentic-commerce-protocol), designed to let AI agents handle the entire checkout process for a customer. It keeps all the important backend stuff (order management, payment processing, and legal/tax compliance) in the merchant's existing systems. Think of it as a smart API connecting conversational AI with the e-commerce infrastructure that businesses already rely on.

How does it work? We can break it down into a few parts:

1.  **Product Feed:** Merchants provide a structured feed of their products. This includes details like ID, title, description, price, availability, images, and more in an AI platform, all defined by the [Product Feed Spec](https://developers.openai.com/commerce/specs/feed). Keeping this updated (potentially as often as every 15 minutes) is vital to ensuring the model has access to up-to-date information.
2.  **Checkout Flow:** When a user decides they want to buy something, the AI uses the [Agentic Checkout Spec](https://developers.openai.com/commerce/specs/checkout) to orchestrate the process. It makes calls to the merchant's specific REST API endpoints to manage the checkout session. It passes along cart contents and buyer details (like shipping address), retrieves shipping options and taxes, and ultimately completes or cancels the order. 
3.  **Payments:** This part is pretty neat. ACP utilizes a [Delegated Payment Spec](https://developers.openai.com/commerce/specs/payment). Instead of the AI handling raw payment data directly (which would be a massive security headache and [PCI compliance nightmare](https://www.pcisecuritystandards.org/standards/)), it passes the necessary payment details straight to the merchant's chosen Payment Service Provider (PSP) (of which [Stripe has the first](https://docs.stripe.com/agentic-commerce)).  The PSP then processes this information and sends back a secure, single-use payment token. The AI then takes this token and passes it along to the merchant during the final checkout API call. The merchant then uses this token to process the payment through their existing PSP setup, just like any other online transaction they handle. 
4.  **Order Updates:** After the purchase is successfully completed, the merchant's system needs to keep the AI platform in the loop so it can keep the user informed. This is done using webhooks, defined in the [Agentic Checkout Webhooks API](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.agentic_checkout.md#23-webhooks-separate-spec) spec. The merchant sends events back to the designated endpoint to make sure the user gets timely updates on their order.

## Why Would Customers Care?

For us, the buyers, this can be summed up in two words: Convenience and speed

* **TheExperience:** Imagine finding a product, asking the AI questions about it ("Does this come in blue?", "What's the return policy?"), and then just saying "Okay, buy it" all within the same conversation. 
* **Fewer steps:** It drastically cuts down the number of steps needed to make a purchase. Less form filling, and fewer buttons to click.
* **Personalization:** Because the whole interaction is happening within an AI chat, there's a real potential for a more personalized checkout experience down the line. The AI could potentially remember your preferences, suggest relevant add-ons more naturally, or help you navigate choices (like shipping options) in a more intuitive, conversational way.


## What about businesses?

Okay, so that's all good and dandy for the customers, but since most of you reading this are probably a tech professional of some kind we might want to steer this back to those that sign our paychecks: The businesses.   Why would they want to go through the trouble of implementing this new protocol when they already have a solid system in place?

* **Keep Existing Infra:** This is a huge one. Businesses don't have to rip out and replace their existing e-commerce platforms (like Shopify, Magento, etc.) or payment processors. ACP is specifically designed to integrate with what's already in place.
* **Cart Abandonment:** One of the biggest pains in e-commerce is cart abandonment. By making the checkout process significantly smoother, faster, and integrated into the conversation, ACP could potentially help reduce the number of people who start a purchase but bail out before completing it.
* **New Sales Channel:** It opens up a channel for direct, conversational interaction with customers right at the point of purchase. This could be used for up-selling, answering last-minute questions, or providing support in a more meaningfull way.


## The Catch

There's always a catch isn't there?   Well, Thankfully this one isn't that big.   The biggest catch is the technical effort required to implement this.  Some of the biggest pain points will be:

* Maintaining an accurate, frequently updated product feed (See #1 under What Exactly is ACP?)
* Build out the ACP API.
* Ensure your PSP supports the Delegated Payment Spec or, if your company meets the requirements (PSPs or PCI DSS level 1 merchants), directly integrate the spec yourself.
* Implement webhook handling for receiving order status updates
* Successfully [pass certification tests](https://developers.openai.com/commerce/guides/production) defined by the platform to ensure everything functions smoothly, securely, and reliably.

> Can merchants use their current payment processor with ACP?
> Businesses can use ACP with any compatible PSP—Stripe is the first compatible PSP with its Shared Payment Token. If you're a business on Stripe, you can learn more about Stripe's agentic commerce solutions in its documentation.

Per the [AgenticCommerce website](https://www.agenticcommerce.dev)

## Wrapping Up

Overall this new development of the ACP, even though it's still a draft, seems to show just how deeply AI is weaving it's way into our lives.   AI is rapidly becoming a part of our daily digital lives and it seems like we've only begun to scratch the surface.  ACP seems to provide customers the promise of a smoother, faster pipeline of "oh that's cool" to "oh look! A package was delivered!", while offering businesses a new sales channel without having to ditch their existing infrastructure.

What do you think? Is buying stuff through ChatGPT and similar AIs the future of online shopping, or is it just another interesting tech novelty that won't see mainstream use? Let me know your thoughts!