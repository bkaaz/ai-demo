---
name: explore
description: Search the codebase for patterns, usages, or architectural questions. Finds files, line numbers, and code examples. Use when the user asks "where is X", "find all Y", or "how does Z work".
allowed-tools: Bash(find *) Bash(grep *) Bash(ls *)
context: fork
agent: Explore
---

Search the codebase for: $ARGUMENTS

Use exploration tools (find, grep, Read) to answer the question.

Rules:
- Do NOT modify any files
- Search in src/, e2e/, docs/
- Show specific file paths and line numbers
- If the question is about patterns — show code examples

Response format:
1. Short answer (1-2 sentences)
2. List of found locations (file:line — context)
3. Observations/recommendations if any
