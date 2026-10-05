---
title: "Prep 5: Vue"
categories: preps
due_date: 2026-10-08 10:00:00 -0400
order: 5
---

**Due:** Thursday, October 8th, 10am\
**Submission:** On [Commons](https://class.mit-sdg.dev/)

## Overview

In this prep, you will get familiar with **Vue**, the frontend framework we will use for both the personal and group projects. You'll work entirely in your browser. It should take about an hour.

Vue is a **reactive** framework. You write a template that describes how the page should look for a given state, and when that state changes, Vue updates the page for you. In recitation, we'll compare Vue to a spreadsheet and to the actions and queries in your backend.

## Tasks

1. **Set your tutorial preferences.** Open the [Vue tutorial](https://vuejs.org/tutorial/). At the top of the page, set the **API Preference** switches to **Composition** and **SFC**. The projects use this style, with `<script setup>`.

2. **Complete the tutorial through step 13.** Work through steps 1 to 13 (Getting Started through Emits). In each step, you finish a small piece of code. Try it yourself before reaching for the **Show me!** button. Steps 14 and 15 are optional.

3. **Build a tiny list.** Open the [Vue SFC Playground](https://play.vuejs.org/). Starting from its example, make a short list that you can add items to and check items off. Under the list, show how many items are still unchecked, using `computed`. **Do NOT use LLMs to write it.** (We aren't looking for anything fancy---just that you write a few lines of Vue by hand.)

4. **Submit your work.** In your class repository, add a file `prep-5.md` with a screenshot of your list (with a few items checked off) and your playground link. The playground saves your code in its URL, so copy the link from your browser's address bar. Submit the [commit URL](../guides/hash.md) for that version of your repository on **Commons**.

## Extra resources

- Vue's [Introduction](https://vuejs.org/guide/introduction.html) explains its two core features, declarative rendering and reactivity.
- You can learn more about [reactivity](https://vuejs.org/guide/essentials/reactivity-fundamentals.html), [computed properties](https://vuejs.org/guide/essentials/computed.html), and [why lists need a `key`](https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key).
- [Components Basics](https://vuejs.org/guide/essentials/component-basics.html) covers props and events in more depth than the tutorial.
