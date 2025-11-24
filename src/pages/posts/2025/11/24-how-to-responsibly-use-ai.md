---
title: "How to properly use AI tooling as a Software Engineer."
date: "2025-11-24"
description: "Move beyond 'vibe-coding', how to use AI to actually increase your productivity without sacrificing your engineering soul."
headerimage: "proper-ai-use.jpg"
tags: ["ai", "general", "programming"]
---

These days the use of "vibe-coding" is ever-present, to the point that "Vibe-coding cleanup expert" is starting to become a real title, allegedly. I haven't seen it in a job description yet, but it's been meme'd about on LinkedIn quite a bit. And honestly? It concerns me. Not because I’m afraid of AI. Over the past week I've been using it fairly consistently on side-projects.  It concerns me because of the complacency it breeds.   

So I wanted to explore a way to use AI to actually increase your productivity without sacrificing your engineering soul. However, this one comes with a caveat. If you are a new engineer, ignore all of this. This article is not tailored towards the following people:

- Don't know software development fundamentals.
- Don't understand system architecture.
- Aren't able to debug/troubleshoot code manually.

Basically, you should already have a solid foundation. The purpose behind this is when AI messes up (and it will) you will need to know how to read the code and fix it yourself. You will need to be able to understand everything the AI spits out, it is just here to help you go faster, not do the job for you. This is a tool, not a replacement for a human.

## Use the CLI

For this we are only going to be covering Claude, there are many other tools out there as well such as [Gemini](https://github.com/google-gemini/gemini-cli) or [OpenAI](https://github.com/topics/openai-cli), but we're sticking with [Claude Code](https://github.com/anthropics/claude-code) because (in my opinion) it handles context better than the others at this point.

First thing is first... use the CLI. Seriously, as a seasoned developer you should already been more than comfortable living in the CLI. Tools with a UI are nice, but CLI tools are always faster, and more powerful.

First, download Claude CLI.

```
npm install -g @anthropic-ai/claude-code
```

Poke around a little bit. Try typing `/` to get some details about what you can do.

## CLAUDE.md 
The most important part of using the CLI is setting up your context. Create a file in your root called CLAUDE.md. This is basically a "Read Me" for the AI. Put your build commands, your linting rules, and your architecture preferences in there. When Claude starts, it reads this file first. It saves you from having to type "Remember, we use Tailwind, not Bootstrap" five hundred times a day. To quickly generate this file you can use the `/init` command inside the tool.

Here is where you enforce your standards. Do you want to ensure every piece of code is tested? Put it in the instructions.

```
## Testing Standards
- **Methodology**: We follow strict TDD. You must create the test file first before writing implementation code.
- **Execution**: Run `npm test` after every change to verify functionality.
- **Coverage**: Do not accept code that lowers overall coverage below 80%.
```

Do you always use camelCase? Tell Claude! The more specific you are in this file, the less "cleanup" you have to do later.  I'll provide a brief example of a CLAUDE.md file in the appendix below.

## Ignore files

Make sure you tell Claude to ignore sensitive files. You don't want it being able to just do anything with your secrets ;) You can read more about this in the [documentation](https://code.claude.com/docs/en/settings#excluding-sensitive-files).

This is also incredibly useful for telling Claude to ignore `node_modules`, `dist` folders, and lock files. Context windows are large, but they aren't infinite. You definitely don't want Claude loading a 40k line `package-lock.json` file into context and wasting your tokens (and money)!

## Use Subagents

Claude CLI has the ability to [create custom](https://code.claude.com/docs/en/sub-agents) subagents. These are specialized AI assistants that can be invoked to handle specific types of tasks. They enable more efficient problem-solving by providing task-specific configurations with customized system prompts, tools, and a separate context window.

By isolating the context, you prevent the AI from getting "confused" by previous unrelated tasks. You can have a qa-bot that only cares about testing and a security-auditor that only cares about vulnerabilities.

To run one, you just tell claude to run it:

```text
Use the system-docs-writer subagent to document my recent changes.
```

You can also have it run multiple subagents in parallel, accomplishing many tasks at once!  Or you have have it run them based on context!  But these topics are going to be a bit more that I'm covering in this article.

(See the Appendix for a full config example).

## Only allow selective edits

Don't let your tooling edit just every file. Make sure you pay attention to what it's doing. This can ensure that not only is it staying on task but that you can understand the work once it's done.

If you manually approve each edit you can see the code that's being changed and be able to easily follow it in the future. The CLI will show you a diff—read the diff. If the diff looks like spaghetti, reject it. Don't just "vibe" your way into a broken production build. You can also use commands like `git diff` or configure the tool to show you the changes in your IDE before committing.

## Prompting

If you treat the AI like a magic 8-ball, you get vague answers. If you treat it like a junior engineer, you get results. Be specific Don't say "Fix the bug." Say "The login handler is timing out because of a race condition in the user state. Analyze auth.ts and propose a fix using a mutex pattern."

Keep asks small Do not paste a 50-page requirement doc and say "Build this." Break it down. One file, one function, one test at a time. Use the ["Think" Pattern](https://www.anthropic.com/engineering/claude-think-tool) For complex tasks, force the model to plan before it acts. This forces the model to output its reasoning process, which often catches logic errors before they turn into code.   

## Slash Commands

Use `slash-commands` for common prompts. Most CLI tooling allows for the creation of [custom slash-commands](https://code.claude.com/docs/en/slash-commands#slashcommand-tool) which allow for easily invokable and commonly used prompts. This can make it easy to quickly invoke your subagents on your code base.   

These live in your `.claude/commands` directory. If you find yourself typing the same instructional prompt more than twice, turn it into a slash command.

For example, I have a `/refactor` command that explicitly forbids the AI from changing the behavior of the code, and only allows it to clean up the syntax. (See Appendix for example).

## Manage Your Context Economy

Your context window is a finite resource, treat it like one. The CLI provides tools to keep your session lean. Use `/context` to visualize exactly what is loaded into your context, and rely on `/usage` to keep a running tally of your token count and session costs. 

If your session history is getting bloated with long back-and-forth debugging, run `/compact`. This forces the AI to summarize the conversation history, preserving the essential context while reclaiming token space. When you pivot to a completely new task, don't just keep going! Use the `/clear` command! This wipes the slate clean, ensuring you aren't paying for unrelated history and preventing "context bleed" where a previous bug haunts your new feature.

## Scratching the Surface

We have only really scratched the surface of what is possible here. The ecosystem is evolving rapidly, particularly with the introduction of MCP (Model Context Protocol) servers. You can now configure agents to interact directly with your ticketing systems to manage workflows, create new tickets, or pipe your code through vulnerability scanners before you even commit. You can even integrate these tools into your CI/CD pipeline to perform automated code reviews on every PR. But a final word of warning: treat these agents like the tools they are. You wouldn't blindly add a new library to your build without understanding how it works or what it does to your system. Don't do it with AI.

## Appendix

### An example CLAUDE.md file

```text
# CLAUDE.md

## Build & Test Commands
- **Build**: `npm run build`
- **Test**: `npm test`
- **Lint**: `npm run lint`
- **Type Check**: `npx tsc --noEmit`
- **Start Dev**: `npm run dev`

## Architecture & Code Style
- **Language**: TypeScript (Strict mode enabled).
- **Style**: Functional preference. Avoid classes unless necessary for specific patterns (e.g., Singleton).
- **Formatting**: Prettier default settings.
- **Error Handling**: No `console.log`. Use the `Logger` service in `src/utils/logger.ts`.
- **No `any`**: Explicitly define types or interfaces for all data structures.

## Testing Standards (Strict)
- **Methodology**: Test-Driven Development (TDD). 
  1. Write the failing test in `__tests__` first.
  2. Run the test to confirm failure.
  3. Implement the minimal code to pass.
- **Coverage**: Maintain >80% code coverage.
- **Mocking**: Use `jest.mock` for external integrations (Database, API calls).

## Project Structure
- `src/core`: Business logic and domain entities (Pure functions).
- `src/infra`: External adapters (Database, API clients).
- `src/api`: Express controllers and routes.
- `src/config`: Environment variables and configuration objects.

## Critical Instructions
- **Security**: NEVER print secrets or API keys to stdout/logs.
- **Dependencies**: Do not install new packages without explicit permission.
- **Refactoring**: When refactoring, ensure existing tests pass before submitting changes.
```

### An example subagent

**system-docs-writer**

```text
---
name: system-docs-writer
description: Use this agent when critical system components are changed.
model: sonnet
color: blue
---

You are an elite technical documentation specialist with deep expertise in software architecture documentation. Your mission is to create and maintain crystal-clear, accurate documentation for critical and complex systems in the docs/system/ directory.

## Your Core Responsibilities

1. **Identify Documentation Needs**: Analyze code, architecture, and system interactions to determine what requires documentation.
2. **Create Comprehensive Documentation**: Write documentation that includes Overview, Architecture Diagrams, Configuration, and API Contracts.
3. **Maintain Documentation Accuracy**: When code changes, update the docs immediately.

## Output Format

Always output documentation as properly formatted Markdown. Begin with:
\#

**Last Updated**:

## Overview
[Clear description of what this system does]
\
```

### An example slash-command

**The Safe Refactor**
Save this as `.claude/commands/refactor.md`

```text
-----
description: Refactors code without changing logic
argument-hint: "<The file to refactor>"
-----

Refactor the following file: $1

## Constraints:
- Do NOT change the logic or behavior of the code.
- Only improve readability, variable naming, and remove redundancy.
- Add documentation to complex functions/methods
```
