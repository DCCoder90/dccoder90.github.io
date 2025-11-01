---
share: true
title: "What Are AI Tokens and How Do They Work?"
date: "2025-10-22" # You can adjust this date
categories:
  - "general"
  - "programming"
  - "ai"
tags:
  - "ai"
  - "llm"
  - "tokens"
  - "nlp"
  - "tokenization"
---

When I first started learning about AI one of the more confusing things to me were tokens.  Sure, I understood the transforms, I understood how neural networks operated.  But what the heck were tokens?  If you've been playing around with AI APIs or just reading up on how they function, you've probably seen this term pop up. But what are they, really, and how does plain text turn into them?

It's tempting to think of tokens as just words, but it's a bit more complicated than that.

![AI Tokens](AI-token-615x410-4161998531.jpeg)

## The Tokenization Process

Let's be real, a computer is just a rock we tricked into thinking with lightning. It doesn't 'read' text. It needs numbers. Tokenization is the engine's dirty, unglamorous job of taking our messy human language and chopping it up into a predictable list of numerical IDs it can actually do math on.

The tokenizer just an algorithm the LLM uses to make this happen. Its job is basically twofold:

1.  **Segmenting the Text:** It chops up the input text into chunks based on a predefined set of rules and a vocabulary it learned during training.
2.  **Converting to Numbers:** It maps each of these chunks (tokens) to a unique numerical ID.

So, a token is essentially a chunk of text often a word, but sometimes smaller or larger, that the model treats as a single unit. These units can be:

* **Whole words:** Common words like "the", "a", "is" usually get their own token.
* **Parts of words:** This happens a lot with longer, complex, or less common words. For example, "tokenization" might become "token" and "ization". This is super helpful because it lets the model handle variations (like "run", "running", "ran") and even words it hasn't explicitly seen before by breaking them into familiar parts.
* **Punctuation:** Commas, periods, question marks? Yep, they often get their own tokens.
* **Spaces:** Sometimes spaces, particularly leading ones, get bundled into a token (e.g., `" hello"`).
* **Special characters:** Things like newlines (`\n`) or maybe even code formatting characters might have their own dedicated tokens.

## From words to numbers 

This is the really crucial step for the machine. Neural networks crunch numbers, not letters. During tokenization, the tokenizer uses its vocabulary, basically a massive dictionary of all the possible tokens it knows, to swap the text chunks for numerical IDs.

Imagine a super simplified vocabulary like this:

* `"the"`: 1
* `" quick"`: 2
* `" brown"`: 3
* `" fox"`: 4
* `"."`: 5
* `"jumps"`: 6
* `"over"`: 7
* `"lazy"`: 8
* `"dog"`: 9

The sentence `"The quick brown fox."` would get tokenized into something like `["The", " quick", " brown", " fox", "."]`. Then, that gets converted into a sequence of numbers the model can actually understand: `[1, 2, 3, 4, 5]`.

This is what is actually fed into the LLM's neural network. When the model generates a response, it's doing the reverse: spitting out a sequence of numbers, which then get translated back into text using that same vocabulary.

## Why not just use words or characters?

You might be thinking, 'This is dumb. Why not just use words?' Trust me, people tried. It’s a disaster. You get what’s called 'vocabulary explosion.' You’d need an ID for 'run', 'running', 'ran', and 'runs'. What about a new word like 'yeetasaurus'? Or a unique name like 'Schwarzenegger'? The dictionary would be infinite.

Characters are just as bad—it’s too slow. t\-h\-e\- \-q\-u\-i\-c\-k is a ton of data for just two words. Subwords are the 'Goldilocks' solution: not too big, not too small.

Tokenization, especially with subword methods like [Byte Pair Encoding (BPE)](https://en.wikipedia.org/wiki/Byte_pair_encoding) or [WordPiece](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/37842.pdf), is a nice middle ground. It keeps the vocabulary size manageable by breaking down rarer or complex words into common subwords, while still keeping common words as single tokens. This lets the model chew through a huge variety of text pretty efficiently.

## What can be a token? 

It's wild what counts as a token. The obvious ones are common words like 'the' or 'and'. But the real magic is in the subwords. 'Tokenization' almost always gets split into `token` and `ization`. This is the model's superpower, it can understand a word it's never seen, like 'unbelievably', just by knowing its parts: `un`, `believe`, and `ably`.

It's not just words; punctuation like `.` or `?` almost always gets its own token. And here's the one that trips everyone up: whitespace. A leading space often gets bundled with the next word. That's why `" hello"` is a different token, with a different ID, than `"hello"`.

## The Pipeline

So, does our input such as `"Hello AI!"` actually turn into something the AI can use like `[15496, 11585, 0]`? It's usually a two step process that's done by the tokenizer:

1.  **Segmentation (Chopping):** First, the tokenizer breaks the raw text string into chunks (the tokens) based on its specific rules and vocabulary. This might involve:
    * Doing an initial split based on spaces and punctuation.
    * Applying subword algorithms to break words down further, often based on how frequently parts appear together in the training data.
    * Handling capitalization and special characters according to how it was trained.

2.  **Numerical Mapping (Vocab Lookup):** Each piece (token) that comes out of step 1 is then looked up in the model's vocabulary. Think of this vocabulary as a massive dictionary built during the tokenizer's training, mapping every possible token string it knows to a unique integer ID.
    * `"Hello"` -> `15496`
    * `" AI"` -> `11585` (See? The space might get included!)
    * `"!"` -> `0`

The output is that sequence of numbers that the LLM can actually understand.  This is similar to how assemblers turn code into binary for the processor. When the model generates text, it does the reverse: it outputs integer IDs, which get mapped back to their text versions using the same vocabulary.

## Why don't all models do it the same way?

Here's a key thing to grasp: feed the exact same sentence to GPT-3, GPT-4, Gemini, or Llama, and you'll probably get slightly (or sometimes very) different token sequences and counts. Why the inconsistency?

1.  **Different Training Data:** Tokenizers learn how to split text based on the mountans of data they're trained on. Different datasets have different mixes of words, subwords, punctuation styles, and structures (e.g., one might have more code, another more formal prose). This directly impacts which text chunks show up often enough to earn their own spot in the vocabulary.
2.  **Different Tokenization Algorithms:** Models don't all use the same recipe for building their vocabularies and segmenting text:
    * **Byte Pair Encoding:** Generally starts with individual characters (or bytes) and iteratively merges the most frequent adjacent pairs to create new vocabulary entries (subwords). You'll find this used by GPT models.
    * **WordPiece:** Similar idea to BPE, but decides which pairs to merge based on maximizing the likelihood of seeing that merge in the training data, rather than just raw frequency. BERT and related models often use this.
    * **SentencePiece:** Treats the input text as a raw sequence of Unicode characters and often includes whitespace as part of the tokens themselves, which can simplify preprocessing steps. Models like Llama and T5 use variations of this.
    These algorithms make different choices about what pieces to merge and when to merge them, leading to different ways of breaking down words.
3.  **Vocabulary Size:** Models are trained with a specific, fixed vocabulary size (like, say, 50,000 tokens or 100,000 tokens). A bigger vocabulary can represent more words as single tokens but takes up more memory and computational power. A smaller vocabulary has to rely more heavily on breaking words into subwords. It's a design trade off made when the model is created.
4.  **Handling of Specifics:** Models might just have different rules for handling things like capitalization (is `"Apple"` the same token as `"apple"`?), numbers, multiple spaces in a row, or rare Unicode characters.

## Practical Implications

Okay, so they're different. Why should you care?  Well, there's a few reasons why should care:

* **Cost & Context Window:** The exact same piece of text can end up being a different number of tokens depending on the model you use. This directly hits your API costs and determines how much text you can actually stuff into the model's context window.
* **Performance:** It's often subtle, but the way words get broken down can sometimes influence how well a model grasps certain nuances or handles specific kinds of text (like code with weird variable names or long compound words). A tokenizer that's better matched to the model's training data might give slightly better results.
* **Compatibility Issues:** You absolutely cannot just take the numerical token IDs generated by one model's tokenizer and feed them into a different model expecting it to understand. Their vocabularies (the mapping from ID to text) are different. It'd be like trying to use a French dictionary to look up Spanish words.

## Takeaway

To finish this article up: Tokens are the numerical units of language that LLMs use. The process of tokenization is how we convert strings of text into sequences of numbers using a prelearned vocabulary. This whole system allows models to handle language efficiently.  Understanding the process and use of tokens gives us a much clearer picture of what's happening under the hood and helps us use these powerful AI tools more effectively and economically.  If you yourself are learning about AI and are struggling with this concept, feel free to reach out to me on LinkedIn and we can have a chat about it!