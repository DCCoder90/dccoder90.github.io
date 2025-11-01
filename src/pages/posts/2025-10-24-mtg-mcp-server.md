---
share: true
title: "Magic the Gathering meets AI: MTG MCP Server!"
date: "2025-10-24" 
categories:
  - "ai"
tags:
  - "ai"
  - "llm"
  - "agentic ai"
  - "mcp"
  - "programming"
  - "go"
  - "golang"
---

Before you dive into this, it's currently 12:32AM and I've been up since 5:45AM, so I'm a little tired and I apologize for any typos, or poor grammar...

Ever find yourself deep in a MTG deck-building session, wishing you could instantly pull up card details (with the power of AI of course)? Well, guess what? I got tired of wishing and decided to code it up myself\! I've built a nifty little MCP server specifically for MTG nerds like us.  Plus I'm just excited to show off that I kind of know a little of what I'm doing around AI ;) 

[Code is here](https://github.com/DCCoder90/mtg-mcp) for those that just care about that and don't want to read this post.

## First thing's first

Checkout out my website!  If you've been here before you may notice I have a new theme! It's been a long-time-coming honestly, but I finally just put my head down and got it done.  I mean, look at that difference!

### Before
![Before](../../../public/imgs/posts/2025-10-24/Screenshot-2025-10-24%20000353.png)
### After
![After](../../../public/imgs/posts/2025-10-24/Screenshot-2025-10-24%20000419.png)

But anyways, now that that's out of the way, let's get back to the actual article.

## What's This Magic Box Do?

Basically, this server acts as a bridge, letting tools like Claude Desktop tap into the [Scryfall API](https://scryfall.com/docs/api), an awesome little MTG database with tons of cards in it. Right now, the server's main job is card searching. Need to know the exact wording on that one commander? Trying to find all the blue instants with "counter" in their text? Just ask! It's super quick for pulling up details when you're preparing for a game.

But here's the exciting part... I'm already thinking up ways to make this server even more powerful. Imagine being able to ask your AI to help build a deck? Or asking it: "Where can I buy a copy of Sheoldred, the Apocalypse?" and have it pull up links to online stores? The goal is to make it a cool little companion for MTG.

## The Tools

I've implemented a few core search functions to get things started:

  * **`search_card_by_name`**: Got an exact card name? Bam\! This tool fetches its details.
  * **`search_card_by_color`**: Need cards of a specific color or combination? This one's got your back. Like, just ask for 'UB' and see what pops up\!
  * **`search_card_by_text`**: Trying to remember that card that does *that thing*? Search by Oracle text (aka the text on the card) and find it.

Under the hood, it's using the `go-scryfall` library to talk to the API. Here's a peek at how the search function works in `tools-impl.go`:

```go
 // [...]
 log.Printf("Searching Scryfall for %s: %s (Query: %s)", searchType, searchTerm, searchQuery)
 result, err := client.SearchCards(ctx, searchQuery, opts)
 if err != nil {
  log.Printf("Error searching Scryfall for %s %s: %v", searchType, searchTerm, err)
  // [...] Error handling
 }

 if len(result.Cards) == 0 {
  log.Printf("No cards found matching %s: %s", searchType, searchTerm)
  return &mcp.CallToolResult{
   Content: []mcp.Content{&mcp.TextContent{Text: fmt.Sprintf("No cards found matching the %s '%s'.", searchType, searchTerm)}},
  }, SearchCardResult{Cards: []scryfall.Card{}}, nil
 }

 log.Printf("Found %d cards matching %s: %s", len(result.Cards), searchType, searchTerm)
 return nil, SearchCardResult{Cards: result.Cards}, nil
 // [...]
```

And registering these tools with the MCP server using the Go SDK is pretty straightforward, as seen in `tools.go`:

```go
 func registerSearchByNameTool(server *mcp.Server) {
  searchTool := &mcp.Tool{
   Name:         "search_card_by_name",
   Description:  "Searches Scryfall for MTG card details by the card's exact name.",
   OutputSchema: outputSchema,
  }

  mcp.AddTool(server, searchTool, searchCardByName)

  log.Println("Tool 'search_card_by_name' registered.")
 }
 // ... similar functions for other tools ...
 func registerTools(server *mcp.Server){
  registerSearchByTextTool(server)
  registerSearchByNameTool(server)
  registerSearchByColorTool(server)
 }

```

## The Future...

Okay, so right now it's mainly about searching. But I'm excited to expand this. The dream is to build more tools to actively help with deck building. Imagine asking your to check mana curves, suggest replacements based on format legality, or build that Eldrazi deck you've always wanted\! With [Scryfall](https://scryfall.com/) it even has pricing data, and guess what?! TCG Player [has their own API](https://docs.tcgplayer.com/docs/welcome) that we could potentially tap into so you can get that deck in your hands. (Disclaimer: Not sure if TCG Player API has ability to order/add to cart, but if not I'm sure other stores do) ;)  