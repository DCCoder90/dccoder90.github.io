---
title: "Nested Learning - No more Forgetfulness!"
date: "2025-11-11"
description: "Google's new Nested Learning, might be the solution to one of AI's biggest problems: catastrophic forgetting."
headerimage: "1330557-3227131475.jpg"
tags: ["ai", "llm"]
---

If you've been in the AI space for any amount of time, you've probably heard of "catastrophic forgetting." It's one of the biggest issues we face with the neural networks. In a nutshell, sometimes when you try to teach an AI something new, is might completely and catastrophically forget everything it learned.

This means that current AI systems can't learn over time. Sure, we can retrain them, but they can't adapt and build upon their knowledge the way we do. 

## Nested Learning, a new way of...learning

The paper, titled ["Nested Learning: The Illusion of Deep Learning Architectures"](https://abehrouz.github.io/files/NL.pdf) introduces a new machine learning method. The idea is to stop treating a model's architecture and its training algorithm as separate components. Instead, it views a single ML model as a system of connected, learning problems all at once.

The goal? To stop catastrophically forgetting everything!

Instead of one giant brain trying to learn everything at once, Google is essentially trying to make a brain made of many smaller brains, each learning at its own pace and together, they form a memory system that doesn't wipe itself clean every time it encounters new information.

Google points out that while AI has made incredible leaps (especially since [their paper on Attention](https://arxiv.org/pdf/1706.03762)), continual learning has remained a problem. 

## How Does It Work?

Researchers and devs have tried to deal with catastrophic forgetting with architectural tweaks or better optimization rules, but they've always treated the network and the training algorithm as two separate things. Google thinks that this very separation is what's holding us back.

What if the model and the training process are actually the same thing, just operating at different "levels"?

Nested learning views an AI model as many learning systems nested inside each other, each with its own information and its own update speed. This creates what Google calls "deeper computational depth", not just more layers, but layers that learn differently. By assigning an update frequency to each component, these can be ordered into "levels" which is the heart of the traning method.

## Putting It to the Test with "Hope"

To prove this out, Google's team built a new, self-modifying architecture called Hope. It's a variant of a previous architecture known as Titans, which was designed for long-term memory.

The problem with Titans was that they only had two levels of learning: short-term and long-term. They could remember well, but they couldn't improve how they remember.

Hope fixes this by taking advantage of "unbounded levels of in-context learning." It can optimize its own memory through a self-referential process, creating a feedback loop of infinite, looped learning levels. It's a model that actually tweaks its own learning algorithm as it goes!  

Hope demonstrated lower perplexity and higher accuracy compared to modern models and standard transformers on a variety of tasks, including language modeling, long-context reasoning, and continual learning.

## Final Thoughts

Nested learning is still in the early stages of research by people much smarter than myself, but it represents a concrete step toward more human-like learning. By unifying architecture and optimization into a single, coherent system, Google may have found the key to solving one of AI's most significant flaws.

As the researchers put it:

> We believe the Nested Learning paradigm offers a robust foundation for closing the gap between the limited forgetting nature of current LLMs and the remarkable continual learning abilities of the human brain.
