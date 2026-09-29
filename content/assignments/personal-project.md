---
title: "Personal Project"
---

6.1040 Software Design · Fall 2026

## Overview

In this project, you’ll design and build a web application that addresses a problem you care about. You’ll develop the design, build an alpha and a beta, complete and deploy the app, and test it with potential end users.

| Milestone | Due date |
| :---- | :---- |
| [P1: Design](#p1-design) | Monday, October 5, 2026, 11:59 PM |
| [P2: Alpha (MVP)](#p2-alpha-mvp) | Tuesday, October 13, 2026, 11:59 PM |
| [P3: Beta (complete functionality)](#p3-beta-complete-functionality) | Monday, October 19, 2026, 11:59 PM |
| [P4: Code complete](#p4-code-complete) | Monday, October 26, 2026, 11:59 PM |
| [P5: User testing](#p5-user-testing) | Monday, November 2, 2026, 11:59 PM |

### Submission process

Your **project code and design documents** belong in your **project repository**. Keep your **design notebook and personal reflections** in your **private individual repository**, as described in the [class guide](https://61040.github.io/fa26/guide/#student-repositories).

For each milestone:

1. Place the deliverables listed for that milestone in the appropriate repository, written in Markdown where applicable. Include links to the deliverables in the main README. Include sketches and screenshots as images referenced in Markdown, and provide YouTube links to videos.

2. Make sure your work is committed and pushed by the assignment deadline and save the commit hash for each repository containing required work.

3. Submit the GitHub repository link and commit hash for each repository containing required work through the corresponding assignment in [Commons](https://class.mit-sdg.dev/). Include the deployed app URL and video link when required.

See the [guide to submitting a commit hash](https://61040.github.io/fa26/guides/hash/). Follow the [class guide](https://61040.github.io/fa26/guide/#grading-and-lateness-policy) for lateness and extensions.

### Grading

Your work in this class will be evaluated by its quality, not its quantity. Your grade for each milestone will be a competency level for each skill assessed at that milestone. The levels are:

- **Deficient.** You did not demonstrate the skill.

- **Emergent.** You demonstrated the skill in part, but were missing some critical aspects.

- **Competent.** You demonstrated the skill in all aspects.

- **Expert.** You applied the skill with the insight and creativity that distinguishes an expert from a routine practitioner.

Use the [problem framing](https://61040.github.io/fa26/rubrics/problem-framing/), [technical writing](https://61040.github.io/fa26/rubrics/technical-writing/), and [reflective practice](https://61040.github.io/fa26/rubrics/reflective-practice/) rubrics, along with the project rubrics below.

## P1: Design

**Due Monday, October 5, 2026, at 11:59 PM.**

### Overview

**Advice.** Read the advice section before you start\! It’ll help you succeed in this assignment, enjoy it more and complete it in less time. Note especially the part about keeping a design notebook.

**Design elements.** In this assignment, you’ll design the essential parts of the application you’re building for your personal project. These include: an articulation of the problem being addressed; an outline of the key features; a conceptual design comprising the main concepts (and a few representative reactions); some user interface sketches and a user journey explaining how some key features will be used.

### Tasks

**Design notebook.** Keep a chronological Markdown notebook in your personal repository throughout the project. Record your design decisions and interesting moments: what happened, what you learned, and any relevant links to your work. Use these notes when writing your final reflection.

**Problem framing.** Include a separate problem-framing section. You may copy or revise your framing from E1, taking account of feedback. Follow the [problem-framing rubric](https://61040.github.io/fa26/rubrics/problem-framing/).

Include a stakeholder list, with a name for each kind of stakeholder, and a sentence explaining their role (if any) in the problem.

**Application pitch.** Construct a succinct but compelling pitch that explains, in terms understandable to a lay user, how your application will solve the problem. Your pitch should be around **half a page** in length, and should include the following deliverables:

* **A name**: pick a fun and memorable name for your application.

* **A motivation**: summarize the problem that your application will solve in a sentence.

* **Key features**: explain up to three features in a brief narrative, ensuring that each has a name and a simple explanation of what the feature is; why it helps mitigate the problem; and how it impacts stakeholders. (See the note in the advice section on concepts vs. features.)

**Concept design**. Design a set of concepts that will embody the functionality of your app and deliver its features. We expect you to have 3-5 concepts. Fewer than 3 concepts would probably mean limited functionality or a lack of separation of concerns; more than 5 likely suggests overambition or lack of focus. (Talk to us if you think you need more\!) The deliverables are:

* **The concept specifications**, written in the standard form.

* **Some essential reactions**. You do not need an exhaustive collection of reactions, but should capture (a) any essential design ideas that involve multiple concepts; (b) representative reactions for kinds of reactions that are common throughout your application (such as for access control or notification).

* **A brief note**, at most half a page long, explaining the role that your concepts play in the context of the app as a whole. For example, if you have an authentication or authorization concept, you should say how it’s used to control access to other particular concepts. You should also explain how generic type parameters will be instantiated whenever it’s non-obvious.

(For example, that a generic user type will be bound to the users of an authentication concept is obvious; that the targeted items of an upvoting concept are users would not be.)

**UI Sketches**. Construct some low-fidelity sketches of your user interface that show the primary user interface elements and their rough layout, annotated with pointers or comments to explain anything that might not be obvious. You should omit any error handling and standard interactions (such as user registration), but should aim to convey how the essential features appear and are used. You can use any tool you like to draw the sketches, or you can draw them by hand and scan them.

You should include them in your design document as images referenced in markdown.

**User journey**. Write a narrative that follows a single stakeholder as they encounter the problem and use your designed app to address it. Tell their story in chronological order: what triggers their need, the steps they take with the app (referring to the wireframes), and the outcome. A good journey should both persuade a reader that the problem is worth solving, and illustrate how your app might help solve it.

The deliverable here is a few short paragraphs that form a coherent story but identify individual steps clearly, and reference your sketches when appropriate.

### Deliverables

**Creating a new repo**. Create a new public GitHub repository for your personal project. You will do your project design and implementation work in this repository. Keep your design notebook and personal reflections in your existing private individual repository.

Create a main README that serves as the single entry point to your complete design submission. 

Your submission is  a design document in Markdown in your public project repository, with clearly labeled sections for:

- Problem framing and stakeholders.

- Application pitch.

- Concept specifications, essential reactions, and the note explaining their roles.

- UI sketches.

- User journey.

The sections may link to separate Markdown files. These sections must be linked in the main README.

**Submitting your work**:

1. Create one or more files in your project repository that contain your design submission, written in Markdown. Include a link to your submission in the main README.  
2. Keep your design notebook in your private individual repository, linked from its main README.  
3. Make sure your work is committed and pushed in both repositories by the assignment deadline and save the commit hash for each.  
4. Submit both GitHub repository links and their corresponding commit hashes through the P1 assignment in Commons by the assignment deadline.

### Rubrics

Your work will be evaluated using these rubrics:

* [**Problem framing**](https://61040.github.io/fa26/rubrics/problem-framing/): your problem-framing section.

* [**Concept design**](../rubrics/concept-design.md): your concept specifications, essential reactions, and the note explaining their roles in the application.

* [**Communicating a proposed solution**](../rubrics/communicating-a-proposed-solution.md): your application pitch, UI sketches, and user journey.

* [**Technical writing**](https://61040.github.io/fa26/rubrics/technical-writing/): all written parts of your submission.

### Advice

**Start early**. If you make an early start on thinking about your design, you’ll have it in mind over the next few days, and you’ll mull it over in the back of your mind and find both interesting flaws and interesting fixes without trying too hard. But if you leave the whole assignment until the last day, it will be hard to think creatively, and you’ll have much less fun.

**Refining your problem framing**. In refining your problem framing, you are free of course to reuse material from your earlier assignment, but you should make whatever corrections and improvements were suggested by your TA (and you should not feel shy to ask your TA for feedback on possible changes).

**Scoping and focusing your app**. As explained in the very first lecture, one of the greatest risks in a project like this is **overambition**: that you lay out a design that is just too much to implement in the time you have available. Another equally serious risk is **lack of focus**: that you hand in a design that is full of plausible sounding elements, but haven’t really distilled your ideas into a compelling set of features, backed up by well-defined concepts.

To avoid these risks, we suggest that you not rush into writing the assignment, but that you spend time thinking very carefully about what your app will do and how it will work, and that you ruthlessly reduce the features, concepts and sketches to the absolute minimum that is necessary.

**A real app, not a proof of concept**. Another criterion explained in the first lecture: your app should be real, so that it can actually be put into use immediately, and not a proof-of-concept that merely illustrates some interesting functionality but that is actually not ready for real use.

As explained in class, to achieve this you will need to ensure that your app is as **simple as possible** (so it has only the absolutely essential concepts); that it **minimizes user friction** (so no requirements of tedious data entry, for example); that it **does not rely on a critical mass** of users; and that it does not make unrealistic assumptions about the use of external services which might turn out not to be available.

**How novel should your project be?** Your project should not be a clone of an existing app, but should be novel. Ideally, it embodies some novel ideas, for example in a new concept or in the way in which some existing concepts are used together. But don’t sweat this too much. If you have a compelling problem, in a domain you understand well, and you work hard on designing an elegant and minimal solution to it, you will inevitably end up with something novel.

Daniel Jackson learned this lesson from a photographer called [Arno Minkkinen](https://www.arnorafaelminkkinen.com/) whom he studied with at a summer workshop in 2006, where Arno explained his [Helsinki Bus Station Theory](https://jamesclear.com/great-speeches/finding-your-own-vision-by-arno-rafael-minkkinen) of innovation, which has since become very popular with management consultants and creative advisors of all sorts.

**Can you change your design later?** Recognizing that design is always iterative, and that you will discover design flaws and opportunities during implementation, we anticipate that you will want to make changes to the design during the upcoming implementation milestones to the design you develop here. But we expect the design as implemented to be very close to the design described in this assignment, so you should think hard and carefully about your design and try to anticipate issues that will arise.

Otherwise, you will not have a strong basis for implementation and risk being mired in frustrating changes and backtracking.

**Keeping a design notebook.** A critical aspect of learning how to design is *self reflection*, in which you constantly analyze your own process, your successes and failures, and learn from them. In order to keep this assignment to a manageable length, we are not requiring that you include a self reflection with it. You will, however, be reflecting on all aspects of your project at the end.

In your notebook, record the issues that arise, the options you consider, and why you choose one over another. Keep entries brief and write them as you work.

**Dialog with an LLM?** One provocative idea you might want to consider: some software developers have found it helpful to record all their thinking as a dialog with an LLM (such as ChatGPT), in which they explain each step in their reasoning and ask the LLM for a response. This can be a good forcing factor to keeping the design notebook, and has the added benefit of sometimes stimulating responses from the LLM.

**Concepts vs. features**. Your features will generally not correspond directly to concepts. Concepts are the building bricks of user-facing functionality from which your app is constructed; features are what users experience when concepts together bring value in addressing a particular need. Consider the feature example for an app to help people find movies to watch:

Wish List: *You can add a movie that you’ve heard about and want to see (but maybe missed when it was in theaters) to a wish list, and when it opens on a streaming platform that you’ve subscribed to, you’ll get a notification that it’s now available.*

Realizing this feature might require four concepts: a Wishing concept for recording the user’s wishes; a MovieReleasing concept that determines when movies are released on particular platforms; a Subscribing concept that tracks which platforms a user has subscribed to; and a Notifying concept that sends updates when certain events occur.

**UI sketches and visual design**. The purpose of the UI sketching is to explore fundamental user interaction decisions, and not to finesse the visual design. So make them as clear and simple as possible, but do not spend time on colors, typography or layout. Consider making them monochrome to avoid the temptation of getting caught up in visual design. If you enjoy visual design, you’ll have the opportunity later during implementation to make your user interface as pretty as you like\! For a short demonstration, see Nielsen Norman Group’s [How to Sketch a UI for Non-Designers](https://www.youtube.com/watch?v=X2CbeBojKVM).

**Concept independence**. Remember that when you define your concepts, they should be independent of each other. Whenever one concept uses a set of objects that comes from another concept, it should do so completely generically, without relying on any properties of those objects. This requirement is hard because it forces you to introduce modularity early on.

Often, developers are sloppy about this and then they have to introduce modularity in the code, when everything is more complicated and that can require a lot of reworking. Put another way, it’s a difficult task whenever you do it, but it’s easier to do at the design phase, and will make coding much easier. You might find it helpful to review the lecture on modularity and the associated slides.

**Identifying concepts**. See this [tutorial on criteria](https://essenceofsoftware.com/tutorials/concept-basics/criteria/) that you can apply to ensure that your concepts really are coherent concepts and not just arbitrary pieces of functionality. You can also read more about identifying concepts in Chapter 2 of Daniel’s book: [The Essence of Software](https://www.degruyter.com/document/doi/10.1515/9780691230542/html).

**Writing concept specs**. The concept notation is pretty minimal, so try and keep your concept specifications short and to the point. Include only the essential actions. Any additional commentary that you might want to include should be in a notes section at the end of the concept specification. Use the course background documents on [defining a concept](https://61040.github.io/fa26/background/defining-concepts/), [specifying a concept](https://61040.github.io/fa26/background/specifying-concepts/), and [specifying concept state](https://61040.github.io/fa26/background/specifying-concept-state/), together with [the concept-design rubric](../rubrics/concept-design.md).

## P2: Alpha (MVP)

**Due Tuesday, October 13, 2026, at 11:59 PM.**

### Overview

Build a working full-stack version of your app that demonstrates one useful user journey. Implement the concepts, reactions, and front-end components needed for that journey. The alpha may be rough around the edges; the remaining functionality is due with the beta.

**What you’ll learn**. There are two learning goals for this assignment. One is to apply the concept implementation and composition approach introduced in the earlier assignment to your own application. The other is to hone your skills as a developer by practicing programming in an intentional and incremental fashion, using an LLM to augment your own skills in a thoughtful and constructive way.

**What you’ll learn**. There are three further learning goals for the front end (1) learning how to implement a front end with reactive components; you’ll use Vue.js (v3) as the framework for this; (2) to give you experience with a course-supported agentic development tool; and (3) to help you develop skills in the visual and interaction design of user interfaces.

### Tasks

Build your application using [sync-engine](https://github.com/mit-sdg/sync-engine), following the setup and conventions from the earlier assignment. Keep your specifications up to date as you change the implementation.

**API documentation.** Document the requests and responses of your back-end API, including authentication where needed. Use the framework’s API documentation and generated contracts where they supply this information, adding explanations where needed. Link these artifacts from your README and use them when building your front end.

**Connect the front end.** Follow the setup and connection approach introduced in the earlier assignment. Use your current API documentation and generated contracts when implementing the front end.

**Concepts.** **Implement the concepts that are needed for this version of the implementation, along with a suite of test cases for the concept, conforming to the pattern specified in the background document for sync-engine.**

**Reactions****. Implement the necessary reactions,** **conforming to the domain-specific language specified in the background document for sync-engine.**

**Reactive Components.** Implement your sketches and concepts as a series of individual Vue.js components. These components should cleanly separate concerns—each component should be responsible for managing its own state/data and other behavior. Note: there may not be an exact one-to-one correspondence between your concepts and Vue components as some components may combine data from multiple concepts, or vice versa.

Components may be nested within one another, and will need to pass data back and forth accordingly (i.e., via [props](https://vuejs.org/guide/components/props.html) when passing data from a parent component to a child, or by [emitting custom events](https://vuejs.org/guide/components/events.html) to pass data vice-versa). You will likely also have some shared front-end state across components, using a [Pinia store](https://pinia.vuejs.org/).

The resultant user interface should be reactive: the web page should not need to be refreshed or reloaded to see the effect of the user’s action. For this task, we recommend focusing exclusively on the functionality of your components. Aesthetic concerns will come next.

**Testing your app and updating**. Make sure to test your front end repeatedly as you develop, ensuring that it works correctly with your back end. You are likely to find you will need to make changes both to the back end (for example, to add queries and actions) and to the front end. Document any significant changes to your back-end design.

**User journey**. Write a one-paragraph user journey of one possible way in which someone might use your app. You may re-use a user journey from past assignments if you’d like, or come up with a new one. By the alpha deadline, your prototype must be, at a minimum, capable of demonstrating this user journey. It’s okay if the prototype is very rough around the edges and doesn’t contain your final style and layout. It is okay if your final app ultimately differs substantially from this prototype.

**Screen recording**. Make a screen recording (maximum two minutes long) where you use your app and demonstrate the user journey. Provide a narration describing the user journey as it takes place. You can use any tool you’d like to make the screen recording. (For instance: QuickTime Player on Mac can simultaneously record a video of your screen and audio from your microphone; on Windows, the Snipping Tool [documentation](https://support.microsoft.com/en-us/windows/use-snipping-tool-to-capture-screenshots-00246869-1843-655f-f220-97299b865f6b) can record a video of your screen and lets you add audio after.)

### Deliverables

- Your working alpha code, including the concept specifications and tests for the functionality implemented so far.

- Your application’s API documentation and generated contracts, linked from the README.

- Your user journey.

- Your screen recording. Note that you should **not** spend a lot of time preparing this; its purpose is just to allow the staff to assess how your work is progressing.

- Your design notes, including significant changes and a brief account of what remains to be implemented for P3.

### Rubrics

P2 assesses [implementing a concept-based application](#implementing-a-concept-based-application), [testing and validating software](#testing-and-validating-software), and [technical writing](https://61040.github.io/fa26/rubrics/technical-writing/).

For P2, your alpha journey must work across concepts, reactions, the front end, and persistent storage, with the necessary access controls. Additional features and final styling may wait until P3.

#### Implementing a concept-based application

A good implementation should have these qualities:

- **Faithfulness.** The code and current specifications agree, and the implemented behavior fulfills the intended user journeys.

- **Modularity.** Concepts separate concerns and remain independent. Reactions coordinate them without duplicating rules throughout the front end or concept implementations.

- **Integration.** The front end, back end, and persistent data work together. Authentication and access control are enforced in the back end wherever the implemented functionality requires them.

- **Intentional development.** Design notes explain significant changes and the reasons for them. The code, specifications, and development record make it possible to understand how the design evolved.

Common pitfalls:

- **An appearance of functionality.** A demonstration relies on mock screens, manual data edits, or a path that avoids necessary behavior.

- **Broken boundaries.** Concepts call each other or read each other’s state, pass objects that expose another concept’s internals, or rely on front-end checks for access control.

- **Unexplained drift.** The code differs materially from its specifications, or design notes describe superficial changes while omitting important decisions.

Competency levels:

- **Deficient.** Essential behavior within the milestone’s scope does not work, or the implementation provides no coherent evidence of concept-based structure.

- **Emergent.** Some useful behavior works, but missing integration, inconsistent specifications, significant dependencies, or access-control gaps prevent the implementation from fulfilling its intended scope reliably.

- **Competent.** The required behavior works across the application, the specifications match the code, and concepts and reactions preserve their intended boundaries. Relevant access controls are enforced in the back end, and significant design changes are explained.

- **Expert.** The implementation meets the competent criteria and demonstrates unusually good judgment in resolving a difficult integration or modularity issue. The code and design record show how a well-chosen refinement simplified the application or made its behavior more consistent without sacrificing its purpose.

#### Testing and validating software

Good validation should have these qualities:

- **Behavioral coverage.** Tests exercise operational principles and meaningful variants, including error cases and the actions required by the milestone.

- **Effective checks.** Tests determine success programmatically and would detect relevant incorrect behavior. Test setup uses concept actions rather than bypassing the concept’s interface.

- **Integration evidence.** Validation follows user journeys through the front end, back end, and stored data, rather than treating passing concept tests as proof that the whole app works.

- **Legible results.** Saved outputs, demonstrations, and explanations make clear what was checked, what happened, and any remaining limitations.

Common pitfalls:

- Useless **tests.** Many repetitive examples exercise the same easy path while important failure modes remain unchecked.

- **Testing around the problem.** Setup edits state directly, assertions do not check the intended behavior, or a demonstration avoids a known failure.

- **Unjustified confidence.** A successful local run is treated as evidence that the deployed app works, or failures are shown without diagnosis or follow-up.

Competency levels:

- **Deficient.** There is little credible evidence that the required behavior was tested, or the tests cannot establish whether it works.

- **Emergent.** Tests and demonstrations cover some expected behavior, but important actions, variants, integration paths, or checks are missing. Results do not support confidence in the milestone’s scope.

- **Competent.** Required principle and variant tests meaningfully check the implemented behavior, and integration checks exercise the relevant user journeys. Results are successful, understandable, and consistent with the submitted version; limitations are identified honestly.

- **Expert.** Validation meets the competent criteria and targets a subtle or consequential risk that routine happy-path testing would miss. The evidence shows thoughtful diagnosis, a justified correction or conclusion, and an effective way to detect recurrence.

### Advice

#### Evolving your design

**Evolving your design**. As you implement your design, you will likely find opportunities to improve it, either because you encounter implementation challenges, or because you realize, as you play with the running code, that different behaviors would be better.

Or perhaps you will discover that your understanding of concept design was imperfect, and that the concepts you specified did not embody sufficiently rich functionality (for example, because you specified a concept that was little more than a data structure) or violated concept modularity rules (for example, because one concept relied on making calls to another concept). However well you might have designed your concepts, some evolution is likely.

You are free to make changes as you see fit, so long as (a) you ensure that the concept specifications (which will be included in your repo as files in their own right) are kept up to date with the code, and (b) you record any significant design changes in files in your repo also (as explained below), summarizing not only the changes but also your rationale for making them.

At the end of this project, you will be asked to write a brief reflection on your experience and how your project evolved, and these design notes will prove to be very helpful in this reflection.

#### Working incrementally





**Working incrementally**. In our experience of teaching software development to undergraduates at MIT for many years, we have found that the single most common cause of frustration and lack of progress that students sometimes experience is a failure to work incrementally.

A student may implement a substantial change before checking its behavior, find that it doesn’t work as expected, and then get trapped in an endless cycle of debugging, often to discover (after much wasted time) that the problem was a simple mistake early on, or a basic misunderstanding about how some mechanism works. The risk of this happening is dramatically increased when writing in an unfamiliar language or when using a new platform or API.

Accepting agent-generated changes without understanding or checking them can compound this problem.

Work in increments that you can understand and evaluate, treating each step as a hypothesis about the intended behavior that you can test before continuing. An increment may be a complete concept or user journey; use smaller steps when the behavior is unclear or failures are difficult to diagnose.

To novices eager to make quick progress, this incremental approach can seem too slow, but in practice, working incrementally turns out to be the way to make progress as rapidly as possible, since it eliminates a lot of wasted work, and ensures that you develop a strong understanding as you go that corresponds to the state of the artifact you’re producing.

That’s why expert programmers usually work in this way, and only increase the size of the increments when they are very confident that they know what they’re doing.

Software development organizations have used incremental development practices for decades, with one of the earliest examples often cited being NASA’s Project Mercury in the 1960s. More recently, incrementality is the main idea behind agile development, which many companies have adopted.

**Intentionality and reflective practice**. What sets experts apart is that they work *intentionally*, always clear on what they are doing and why they are doing it. This doesn’t mean they don’t play or brainstorm or try things out, but that when they do those things, they know they are doing them, and they are acting out of a conscious choice.

Experts also work *reflectively*, thinking not only about the artifacts that they are producing but also about their process, always looking for ways to improve how they work: how they approach problems, how they evaluate their solutions, how they overcome their own blindspots and biases, and so on.

(The best known formulation of this notion of reflective practice comes from Donald Schon, who was a professor of urban planning at MIT and wrote an influential book in 1983 called The Reflective Practitioner.)

#### Using LLMs

**Agentic coding**. Agentic coding tools, like Anthropic's Claude Code or OpenAI's Codex, are very powerful. They are capable of rapidly building prototypes of complex web applications in a short amount of time. Yet, there are not any, to our knowledge, popular pieces of software that have been autonomously designed and created by AI. Below, we discuss some recommendations for using AI. You can read more on the philosophy of AI in this course at https://61040.github.io/fa26/guide/\#using-ai

**The risks of LLMs**. LLMs are very imperfect tools. They are non-deterministic and unpredictable. When they work well (for example when an LLM writes a bug-free implementation of a complex function, or builds a professional-looking front end in seconds), they seem like magic. But when they fail, they can be frustrating.

LLMs can introduce serious security vulnerabilities; they can break existing functionality when adding new functionality; they can hit a functionality brick wall and be unable to code the requested requirements; and they can damage the quality of a codebase with bad coding practices, making it messy and incomprehensible.

There is also a pedagogical risk that if you rely too heavily on an LLM you may never acquire essential programming skills, and will be unable to evaluate the code an LLM produces or fix things when it screws up.

**The costs of LLM coders**. Keep track of your usage limits and credits, and follow the course’s current tool recommendations. Long-running tasks and repeated attempts can consume your allowance; choose tools and settings appropriate to the task.

Ask the staff for help when you get stuck, and share useful discoveries on the class forum.

**Risks of agentic coding**. The main risk of using these tools is that you will allow them to create code that outpaces your ability to understand it, and that you will end up with a codebase that does not meet your design intentions and that you are unable to modify easily.

To mitigate this risk, choose a scope of work that you can understand and evaluate. You may ask an agent to implement a complete concept or user journey, provided you can check its conformance to your design and assess the resulting changes. Use smaller steps when the behavior is unclear or failures are difficult to diagnose.

**Verification**. Tell the agent what behavior to check and ask it to run the tests. Some agents have computer use capabilities, and you can watch them navigate the application for you. Just as importantly: inspect the results and try the affected user journeys yourself.

#### Repository organization and design notes

Keep your back-end and front-end code in separate directories within your project repository, following the project structure introduced in the earlier assignment. Keep your design documents, concept specifications, test scripts, and saved test outputs in your project repository, with links from the README.

* **Source code**. One area will contain your source code and will resemble a conventional codebase. You will be free to modify these files as you please, and to insert code generated by the LLM.

* **Design documents**. A second area will contain your design documents, which will include notes that you write about your design work, prompts that you present to the LLM, background documents that you include as context in your LLM queries, and concept specifications. Just like the code files, you are expected to modify these files as you please.

For example, you might have a file that represents a prompt for generating some code, and you may want to run it repeatedly, adjusting it after each run in order to get better results.

**Markdown documentation**. All the files in the design area (the design documents, background documents, specifications and LLM prompts) will be written in markdown. This brings three key advantages. First, it allows documents to be structured using relative links; you can build an LLM prompt, for example, with a link to background documents and a link to a concept specification to be implemented. Second, it allows structuring of documents for more effective LLM processing.

And third, it makes more documents more readable (and is compatible with many tools, including Github). You can use a markdown editor in combination with an IDE (we recommend using Obsidian with Visual Studio Code) but you can also use a markdown plugin in your IDE if you prefer.

**Interesting moments**. As you work on your implementation, some moments will be worth recording. For example, you might discover that your concept specification was wrong in some way; a test run might expose a subtle bug in a concept implementation; the LLM might generate some code that is unexpectedly good or bad in some way; you might discover a way to simplify your design; and so on. When any such moment arises, you should save a link to the relevant file and place it in your design document.

Use links to particular Git commits when referring to a version of a file, so that later edits do not change the evidence you are citing. By P3, your design document should include 5–10 pointers to interesting moments, each with a couple of sentences explaining it.

**Documenting each step**. Record the key steps of your work in your design notes and Git history. For example, a series of steps might include: asking the LLM to generate code for a concept spec; asking the LLM to generate test cases for the generated implementation; running the test cases; changing the concept design; modifying the concept specification; rerunning the LLM to generate code; and so on.

**Push frequently**. We strongly recommend that you commit and push changes to your repo very frequently. Almost every year there is a poor student who delayed pushing their work and then had a laptop or disk failure. Don’t let that happen to you\!

#### Concepts, reactions, and tests

Implement your concepts and their reactions together as you build each user journey. Authentication and access control must be enforced in the back end wherever required.

**Why back-end** **reactions****?** Your front end can effectively synchronize the actions of back-end concepts, by coordinating calls to the back end. But this is not secure, because the user can easily modify what calls the front end makes.

Moreover, the reactions won’t be clear in your front-end code because Vue.js does not have a systematic way to declare them and organize them, and they may be scattered throughout the code. Moving reactions to the back end lets you make them both secure and more consistent.

Choosing an implementation step. Implementing one action at a time can help when learning an unfamiliar mechanism or isolating a bug. You may also implement a complete concept or user journey as one step when you can meaningfully review and test it. In either case, check the behavior against the specification before building further on it.

**Refactoring your concepts**. In P1, you defined the concepts for your application. In this assignment, as you implement and test your concepts, they will become more concrete and you will more easily be able to see any flaws. You should therefore take this opportunity to refactor your concepts as you see fit, taking into account feedback you received on the design assignment, and evolving them as you work. You should pay particular attention to correcting these common flaws:

* **Composite objects**. Make sure that all of the arguments and results of your actions are either primitive values (strings, numbers, etc) or object identifiers (actually document identifiers in MongoDB). Composite objects should be used only inside concept implementations and never exposed.

* **Conflation of concerns**. Make sure that your concepts separate concerns, and that each one embodies only one concern and does not conflate multiple, unrelated concerns. You may want to review the lectures on modularity if you are not confident that you understand this idea.

* **Data structures**. A concept that is nothing more than a data structure without any interesting behavior is suspect, and is usually a sign that the data structure should have been incorporated into another concept.

* **Dependencies**. Make sure that your concepts are fully independent. There should be no function calls between concepts, and no reference in one concept to the database state of another concept.

**Testing concepts**. Your tests should cover the basic behavior of the concept but should also include some more interesting cases. Your tests should use your implementation platform’s testing framework and should be programmatic (that is, determining in the code whether they succeeded or failed, and not requiring a human to interpret console messages). They should also print helpful messages to the console with action inputs and outputs so that a human reader can make sense of the test execution when it runs in the console.

Some more details about the test cases you should include:

* **Operational principle**. A sequence of action executions that corresponds to the operational principle, representing the common expected usage of the concept. This sequence is not required to use all the actions; operational principles often do not include a deletion action, for example.

* **Interesting scenarios**. Sequences of action executions that correspond to less common cases: probing interesting corners of the functionality, undoing actions with deletions and cancellations, repeating actions with the same arguments, etc. Check expected failures and refusals as well as successful behavior.

* **Number required**. For each concept, you should have one test sequence for the operational principle, and 3-5 additional interesting scenarios. Every action should be executed successfully in at least one of the scenarios.

* **No state setup**. Your test cases should not require any setting up of the concept state except by calling concept actions. When you are testing one action at a time, this means that you will want to order your actions carefully (for example, by the operational principle) to avoid having to set up state.

* **Saving test execution output**. Save the test execution output by copy-pasting from the console to a markdown file.

By P3, the repository should include for each concept:

* a specification file (in markdown, using our structured specification notation);

* an implementation file (in TypeScript);

* a test script file (in TypeScript);

* a copy of the console output showing the execution of the test script (in markdown);

* a design file explaining changes you made to the concept as specified in P1 and any other issues that came up (in markdown).

Note that your specifications must be **complete and consistent** with your implementations. Your grade will suffer if you hand in specifications that are vague or out-of-step with the implementations, even if you have working implementations. If you have not fully grasped the state and action specification notation, now is the time to master it (and to use the LLM to help you, by providing feedback and even asking for help generating specifications).

Your code should be written in TypeScript, using MongoDB for persistent storage. Sync-engine coordinates concept execution and composition; it does not persist concept state for you. Follow the implementation, persistence, and testing guidance introduced in the earlier assignment.

As usual, your codebase should be pushed to a GitHub repository.

**Handling the API key**. As before, make sure your uploaded code does **not** contain your API keys.

#### Further implementation advice

**Ask for help**. As you apply the earlier assignment’s implementation approach to your own project, make use of office hours when you need help. We will also be monitoring the class forum closely, and we expect you to ask for help. Remember that asking questions helps everyone, and if you’re stuck with something, then other students probably are as well.

**Watching LLM costs**. Keep track of your usage limits and credits when using the LLM in your development work. If you have an AI-augmented concept, you should be careful to design it so that you can still test it effectively without consuming all your credits. In particular, check the cost of processing images as well as text.

**Saving immutable snapshots**. For some of the deliverables (the interesting moments and test run outputs in particular), you will want to present particular versions of files. For example, for your test outputs, you may keep a single markdown file into which you copy-paste the console repeatedly; this will mean that the final version of the file may not be the one you want to submit.

To overcome this problem, commit the version you want to preserve and link to that file at the particular Git commit. You can then link to that file in your design document. One nice consequence of everything being linked is that if you want to share a prompt or some code with someone else (for example, to ask a question about it on the class forum), you can refer to it with an absolute URL into your GitHub repo.

**Choosing a tool and model**. Follow the current course recommendations and keep track of your usage allowance.

**Exploit background materials as prompts**. You’re encouraged to use your LLM not only for code generation tasks but for other tasks too: brainstorming, generating concept specifications, reviewing specifications and code, interpreting console errors, etc. Try and make good use of the background documents that we are providing for the context of these tasks, and feel free to add your own background documents.

For example, you can create a prompt that points to the backgrounds docs about concept design, and to the rubric, and that asks for a critique of a concept spec you’ve written.

**Using rubrics with an LLM**. Treat an LLM’s rubric-based critique as suggestions to evaluate, not as a reliable grade. Repeatedly revising your work to raise an automated rubric score can make it less useful or coherent. Judge proposed changes against the underlying design goals, evidence, and course criteria.

**Following up**. When the results are incomplete or incorrect, explain the missing behavior and what success would look like. Where the agent can run your project’s tools, ask it to reproduce the failure, fix its cause, and rerun the relevant checks. If it cannot access the environment, supply the error output and relevant context yourself.

**When strange things happen**. If the implementation differs unexpectedly from your design, inspect the specification, the context the agent used, the implementation, and the observed behavior to locate the mismatch. The cause may be an ambiguous requirement, missing or outdated context, or an implementation error. Check the diagnosis against evidence and verify the correction.

Augmenting **background material**. If you find a recurring misunderstanding, clarify your project-specific guidance or point the agent to the relevant course material. Keep this guidance concise and check whether it improves the result. Record the mistake, the correction, and what you learned as an interesting moment.

**Must I code with an LLM?** If you prefer to write your code entirely by hand, you are welcome to do so, but you should still follow the incremental and reflective workflow, committing versions of your specifications and implementations to Git. You should pay particular attention to ensuring that your concept specifications have fully elaborated state and action specifications and that they are consistent with the implementations.

**Finishing all your concepts**. You may find that you are not able to complete an implementation of every single concept in your design by the alpha deadline. Your work will be judged on quality rather than quantity, as evidenced by the artifacts you produce and the interesting moments that you cite. Remember though that you will have to finish all your concepts by the beta deadline in order to complete your personal project.

**Why Vue.js?** We use Vue.js as the front-end framework in this class because (1) it incorporates the key notions of components and reactivity that are present in most frameworks; (2) it is widely used and well represented in LLM training sets; and (3) it is easier to learn than more complex frameworks (such as React).

#### Back-end and front-end development

**Connecting the front end and back end**. Follow the approach introduced in the earlier assignment. Keep the application’s API documentation and generated contracts consistent with the implementation, and use them when developing the front end.

As you evolve your front end, you will undoubtedly find that you want to make changes to your back end (for example because a concept does not provide a query that the front end requires). Update the concepts, composition, and corresponding specifications as needed.

**Iterative development**. You will build a working web app by iterating on the following steps:

* Polishing one or more concepts in your back end to ensure that they provide the behavior (and in particular the queries) that are needed to support the front end components.

* Updating the API documentation and generated contracts using the framework’s workflow, and using them when developing your front end.

* Implementing front-end components that use the back-end service, with agent assistance if you choose, and checking them against your intended interaction design.

* Running and testing the complete app using the workflow introduced in the earlier assignment.

#### Front-end advice

**Student plans**. See the course’s current AI tool recommendations for student plans and available credits. Keep an eye on usage limits; a student subscription may have limits that affect which models you can use.

**State storage**. You will probably need to store some state across front-end components. You can use a [Pinia store](https://pinia.vuejs.org/) to manage shared front-end state.

**Connecting and checking your app**. Connect the front end using the approach introduced in the earlier assignment, and verify authentication and access control across the complete user journey. Follow the course guidance on cookies and sessions; storing a token in front-end state does not itself protect it from malicious JavaScript running in your page.

**Using Postman to check your back-end service**. Before you start coding your front end, it’s a good idea to just check that your back end is responding to HTTP requests as expected. You can execute it easily with a variety of tools. Probably the easiest to use is [Postman](https://www.postman.com/), an app that lets you form a request in a simple UI and then view the response. Here is an illustrative example of checking a login request. Use your own application’s routes, request format, and authentication conventions:

![Example of checking a login request in Postman](/assignments/assets/postman-login.png)

Note that when your API expects a JSON request body, the parameters are presented as raw JSON, so make sure to select that option and to enter a JSON expression as we’ve done here.

**Review 6.1020 (6.031) material.** This assignment builds on ideas covered in 6.1020 (6.031) including [callbacks and graphical user interfaces](https://web.mit.edu/6.102/www/sp24/classes/17-callbacks-guis/) and [asynchrony and Promises](https://web.mit.edu/6.102/www/sp24/classes/15-promises/). We recommend working through the materials from 6.1020 (6.031) if these ideas are new to you, or you haven’t seen them in a while.

## P3: Beta (complete functionality)

**Due Monday, October 19, 2026, at 11:59 PM.**

### Overview

Complete the functionality of your app and refine its visual and interaction design. By this milestone, the front end, back end, and reactions should work together to support all the intended functionality.

**Visual design study.** This assignment includes an exercise in visual design. The sketches you constructed in P1 focused on identifying the high-level user interface elements your app would use, how they would be laid out, and how users would flow between different screens of your app. In contrast, a visual design study will help you establish the ”look and feel” of your app—namely, what fonts and colors will you use, and what do they communicate about your app’s purpose.

### Tasks

**Complete and test your app.** Implement the remaining concepts, reactions, and front-end components. Keep specifications consistent with the code and complete the principle and variant tests for every concept, as described in [P2](#concepts-reactions-and-tests).

**Testing your app and updating**. Make sure to test your front end repeatedly as you develop, ensuring that it works correctly with your back end. You are likely to find you will need to make changes both to the back end (for example, to add queries and actions) and to the front end. If you didn’t complete all your concept implementations, this is the time to do it\! Document any significant changes to your back-end design.

**Visual design study.** Look through a diverse range of visual media (including photographs, screenshots, magazines, newsprint, graphic novels, etc.) and assemble two slides of inspiration focusing on typography and color respectively.

On each slide, collage together examples that you find particularly inspiring, and then use the margins to extract or annotate particular design choices you might be interested in exploring (e.g., specific color palettes and font families, or characteristics that you find interesting such as serifs, tall/short x-heights, etc.).

[Here](https://vis-society.github.io/assets/imgs/color_study.png) is an example of a slide that focuses on color selection.

**Styling and Layout.** Once you have your component tree implemented, turn to the aesthetic aspects of your user interface design. Drawing on your design study, make choices for the layout of your components, as well as the colors and typography they use, to provide a usable, accessible, and pleasant experience for your users.

Think about how you can use these different aspects of style to convey importance (e.g., using colors to indicate successes or errors) or an order of operations (e.g., left or right sidebars, or heading levels to suggest an outline).

**Update your user journey and screen recording.** Update the journey to reflect the beta, and make an updated narrated screen recording, at most two minutes long.

### Deliverables

- Your complete beta code, current concept specifications and API documentation, test scripts, and saved test outputs.

- Your visual design study.

- An updated user journey.

- An updated screen recording.

- An updated design document summarizing any major changes and the interesting moments recorded so far.

### Rubrics

P3 assesses [implementing a concept-based application](#implementing-a-concept-based-application), [testing and validating software](#testing-and-validating-software), [interaction and visual design](#interaction-and-visual-design), and [technical writing](https://61040.github.io/fa26/rubrics/technical-writing/).

For P3, all intended functionality must work. Test the concepts and complete user journeys. Explain your interface choices in the visual study; further polish may wait until P4.

#### Interaction and visual design

A good interface should have these qualities:

- **Understandable interaction.** The interface helps users learn the application’s concepts and provides an intelligible path through their tasks.

- **Feedback and recovery.** Actions produce clear feedback without unnecessary page refreshes. Appropriate validation and useful error messages help users understand and recover from problems.

- **Visual organization.** Layout, typography, and color communicate relationships, importance, and available actions, and provide a usable, accessible, and pleasant experience.

- **Purposeful choices.** The visual study and design notes explain choices that support the app’s purpose; visual inspiration is applied thoughtfully rather than copied as decoration.

Common pitfalls:

- **Polish without usability.** An attractive interface obscures the next action, hides state, or makes common tasks unnecessarily difficult.

- **Inconsistent behavior.** Similar controls behave differently, feedback is missing, or errors leave users unable to proceed.

- **Unconnected inspiration.** The visual study collects attractive images but does not inform the interface’s typography, color, or organization.

Competency levels:

- **Deficient.** The interface makes essential tasks difficult to understand or complete, with little coherent interaction or visual organization.

- **Emergent.** Core tasks are possible, but inconsistent navigation, weak feedback, poor recovery, or unclear visual hierarchy causes significant friction. The visual study has little connection to the implemented design.

- **Competent.** The interface supports the intended tasks coherently, communicates state and errors, and uses layout, typography, and color consistently and purposefully. The visual study informs choices that make the app usable and accessible.

- **Expert.** The interface meets the competent criteria and shows particular insight into how users understand the app or encounter difficulty. A focused interaction or visual decision makes a novel concept easier to grasp or removes a consequential source of friction; the rationale explains why it works.

### Visual design advice

**Color palettes.** Finding colors that work together can be tricky business. We recommend using a color palette generator like [Coolors](https://coolors.co/) or [Adobe Color](https://color.adobe.com/).

**Typography.** You are not restricted to the basic fonts available in the browser. Instead, feel free to browse the large libraries of free fonts available via [Google](https://fonts.google.com/) and [Adobe](https://fonts.adobe.com/) — follow the instructions for how to include such fonts in your Vue app. If you Google around, you’ll find lots of recommendations for which fonts are popular currently, and how you might mix fonts together (e.g., a serif font for body text, and a sans serif font for headings, etc).

## P4: Code complete

**Due Monday, October 26, 2026, at 11:59 PM.**

### Overview

In this milestone, you will make the finishing touches to your personal project. You’ll check the behavior and access control of your app, polish the interface, deploy your app so that it can be accessed by others, and summarize your design notes.

### Tasks

Review your reactions and access control. Check that your reactions handle authentication and access control appropriately, and make any other changes you think improve the design. We recommend that you do this incrementally, checking each change as you go. Record your design ideas and the rationale for your reactions as you work.

**Polish your app**. Play with your app, adding some plausible data. Make whatever changes seem desirable to you, in visual aspects or behavior. Feel free to modify the reactions and even the concepts themselves. Record any significant changes and their rationale as you work.

**Deploy your app**. Using Render, deploy your app so that it can be accessed at a public URL. See the [deployment section of the resource guide](https://61040-fa25.github.io/resources) for the existing instructions.

**Make a final video**. Make a short video (up to 3 minutes in length) showing your app in use, and highlighting its key features, with an audio narration throughout. You should show at least some intelligible user journey (for example the one you used before) and can also point to features without demonstrating them fully. Save the relevant execution trace for the demonstrated user journey, using the tracing guidance introduced in the earlier assignment.

**Complete your design document**. Turn your design notes (recording your ideas, changes, and observations) into a coherent document of **one to two pages** in length that summarizes how your final design differs from your initial concept design in P1 and your visual design in P3. Be succinct and to the point, and use bullets and subheadings to make it easy to navigate. Feel free to use diagrams and screenshots to illustrate your points if helpful.

To refer to particular versions of concept specifications and prompts, use links to particular Git commits.

**Prepare for user testing.** Read P5 and schedule your two participants now, so that you have time to conduct the tests and analyze the results before November 2\.

### Deliverables

- Your front-end and back-end code in your project repository, including current specifications, reactions, tests, and design notes.

- The URL of your deployed app.

- **Your design document**.

- **Your video and the associated trace of incoming actions**.

The design document, link to your demo video, and trace of incoming actions from the demo video should be in one or more Markdown files, placed in the project repository, and clearly linked from the README.

### Rubrics

P4 assesses [implementing a concept-based application](#implementing-a-concept-based-application), [testing and validating software](#testing-and-validating-software), [interaction and visual design](#interaction-and-visual-design), and [technical writing](https://61040.github.io/fa26/rubrics/technical-writing/).

For P4, test the deployed application, including persistence, access control, and error handling. Your design summary should explain the significant decisions behind the final app.

### Advice

Reviewing composition and integration. Follow the earlier assignment’s guidance when updating your composition and connecting the front end. Keep the API documentation and generated contracts current, and verify that the front end uses them correctly. Use the execution trace to investigate unexpected behavior and check authentication and access control across the complete user journey.

## P5: User testing

**Due Monday, November 2, 2026, at 11:59 PM.**

### Overview

Over the last several weeks, you identified some unmet user needs, brainstormed and refined a series of design ideas, and then implemented them as a full-stack web app. Hooray\! The final step of the design process is then to test your app out with potential end users to evaluate how successfully it addresses the needs and issues you identified in your problem framing, as well as other design goals you set yourself in subsequent milestones.

**Purpose.** This assignment will help you gain experience with planning and conducting user tests, and then reflecting and synthesizing a set of observations for future improvements.

### Tasks

In this assignment, you will conduct **two user tests,** each with a different participant. Ideally, your participants are members of the intended audience of your application, but they may be anyone of your choosing—the only limitation is that they cannot be currently taking 6.1040. Each test should last approximately **one hour**, comprising a period where your participant works through a series of tasks you have set them, and then a portion to debrief them about their experience.

To plan your tests:

**Prepopulate Realistic Data.** As we described at the beginning of this class, we should not expect end-users to be designers. Thus, while dummy data (e.g., Lorem Ipsum, Alyssa P. Hackers and Ben Bitdiddles, etc.) were suitable during your design and implementation phases, end-users will have trouble understanding your application if it isn’t filled with realistic data that is appropriate for your domain.

Richly populate your app with a diverse range of data to give users a vibrant impression of what it would be like to use your app at the peak of its usage and popularity.

**Formulate a task list.** To make sure your user tests yield informative results, it can often be better to set your users specific tasks rather than let them explore your app in an open-ended way.

Create a list of tasks that cover the key concepts of your app, focusing on the concepts that are particularly unique or important to your design. Each task should typically involve executing a sequence of user interaction actions. You should include at least **5 tasks**, from simple one-action tasks to more complex multi-action tasks, that will test how easily the user can cross the gulfs of execution and evaluation discussed in lecture.

You should plan for these tasks to take roughly 40 minutes of your hour session.

Format your task list as a **table**, where each row corresponds to a different task and with columns for: (1) a short title for each task; (2) a succinct instruction, in words that could be given to the user; and, (3) a brief rationale for including the task, explaining why the task is worth testing, what you hope to learn or uncover about your design when testing this task with a user versus executing it yourself as part of a cognitive walkthrough.

Order the rows in such a way that any application state required by subsequent tasks has been correctly set up by earlier tasks.

Conduct your studies by **asking each participant to perform the tasks in your task list**. Remember to obtain your participant’s consent, and prep them about their role and expectations. Have them perform each task following the order defined in your table, and encourage them to think out loud. If they fall silent, prompt them to keep thinking out loud. If they get stuck, give them a chance to get unstuck first—only intervene if they are really unable to make progress.

Try to say as little as possible, and avoid explaining the user interface to them.

Throughout the study, **watch what your participant is doing, saying, and even feeling** (e.g., watch for facial expressions, sighing, etc. which often signal frustration or other emotions). Take careful notes throughout. You might also consider capturing a screen recording, as well as audio/video of your participant (all with their consent, of course) for further analysis after the session is complete.

In the **final 20 minutes** of your hour session, **debrief your participant** to get their overall thoughts and impressions of your application. What did they think worked well, versus what could be improved? Dig into moments you noticed them hesitate, get confused, or get stuck—what did they find confusing, what were they hoping to do, how did they figure things out?

For each study, write a **300–400 word report** that summarizes and analyzes key moments of participant behavior—i.e., what interesting or unexpected things did you notice, and why do you think they occurred. For instance, you might observe a participant struggle with a particular interface element or interaction flow—your analysis might then rely on your debriefing to describe what were they expecting to do, what did the interface do instead, across which gulf did the flow break down, etc.

Aim for your report to be balanced between reporting positive and negative results.

Follow these summaries up by **bullet pointing 3–5 flaws or opportunities for improvement**. Each bullet point should describe *what* the flaw or opportunity is, *explain* why it is currently occurring, and brainstorm ways that future designs and implementations might be able to address it. For each bullet, classify it by level (physical, linguistic, or conceptual) and degree of severity (minor, moderate, major, critical).

For instance, minor issues introduce some friction to the experience that, while annoying, a participant can recover from and move on; critical issues, however, bottleneck participants so severely that they required your intervention to make further progress. Moderate and major issues fall along that spectrum.

### Reflect on your experience

**Reflect on your experience**. Reflect on your experience in this project.

Some questions you might consider: What was hard or easy? What went well? What mistakes did you make, and how would you avoid making them in the future? What skills did you acquire and which do you feel you still need to develop further? How did you use an agentic coding tool? What conclusions would you draw about the appropriate role of LLMs in software development? Write your reflections down, in a half to one page.

Be succinct and to the point, and use bullets and subheadings to make it easy to navigate.

Include what you learned from user testing and how it affected your understanding of your design. Write your reflection yourself, following the [class AI policy](https://61040.github.io/fa26/guide/#using-ai), and keep it in your individual repository.

### Deliverables

- Your task list, including the instruction and rationale for each task.

- Your deployed app, populated with realistic data for the tests.

- Two study reports, 300–400 words each.

- Your list of 3–5 design flaws or opportunities, with explanations, possible improvements, and classifications by level and severity.

- Your personal reflection, half to one page, in your individual repository.

Place the user-testing writeup in Markdown in your project repository and link it from the README. Use the common submission process above. P5 asks you to analyze and propose improvements; it does not require a further implementation milestone.

### Rubrics

P5 assesses **planning and conducting user tests**, **analyzing user-test findings**, **reflective practice**, and **technical writing**. Use the [reflective practice](https://61040.github.io/fa26/rubrics/reflective-practice/) and [technical writing](https://61040.github.io/fa26/rubrics/technical-writing/) rubrics.

A study that uncovers serious flaws in your app can demonstrate excellent user-testing and analysis skills. We assess the quality of the investigation and reasoning, not whether participants liked the app or whether all tasks succeeded.

#### Planning and conducting user tests

Good user testing should have these qualities:

- **Purpose.** Tasks address important questions about the app’s concepts and use. Rationales explain what observing a participant can reveal beyond testing the software yourself.

- **Realism.** Participants and realistic data support an informative test. Tasks span meaningful levels of complexity, and their order supplies any state needed for subsequent tasks.

- **Facilitation.** Participants understand their role and consent to the study. Task instructions and prompts support thinking aloud without teaching the interface or leading participants to the desired answer.

- **Observation.** Notes and debriefing capture actions, expectations, confusion, and successful use. The report makes clear when help was given and identifies limitations of the study.

Common pitfalls:

- **An uninformative test.** Tasks cover routine clicks but miss the app’s distinctive or important interactions, or placeholder data makes the scenario hard to understand.

- **Coaching instead of observing.** Instructions reveal how to perform the task, or the facilitator intervenes before the participant can reveal a difficulty.

- **Lost evidence.** Reports rely on general impressions without recording what the participant did or said.

Competency levels:

- **Deficient.** The work does not provide credible evidence of the required studies, or the plan and conduct cannot reveal how participants use the app.

- **Emergent.** Studies produce some useful observations, but unrealistic data, weak task rationales, gaps in task coverage, leading assistance, or inadequate notes substantially limit what can be learned.

- **Competent.** The required studies use realistic data and well-chosen tasks, with clear rationales and appropriate facilitation. Observations and debriefing provide concrete evidence about important interactions, including where participants needed help.

- **Expert.** The studies meet the competent criteria and show unusual judgment in testing a consequential uncertainty about the design. Task choices and careful observation expose behavior that a routine walkthrough would miss, while acknowledging what the participants and setting cannot establish.

#### Analyzing user-test findings

Good analysis should have these qualities:

- **Grounding.** Claims are supported by specific observations or participant feedback. Distinguish what happened from your interpretation of why it happened.

- **Explanation.** The analysis connects behavior to the design, the participant’s expectations, and the task. It goes beyond reporting whether a task succeeded.

- **Balance.** Consider informative successes as well as difficulties. Avoid drawing broad conclusions from two participants, and acknowledge uncertainty or alternative explanations.

- **Actionable judgment.** Flaws and opportunities have clear descriptions, reasoned severity and level classifications, and plausible improvements connected to the evidence.

Common pitfalls:

- **A transcript instead of analysis.** The report recounts events but does not explain what they reveal about the design.

- **Unsupported diagnosis.** A proposed cause or redesign is asserted without evidence, or a participant’s preference is treated as proof that everyone needs the change.

- **Quantity over insight.** A list meets the required count but consists of trivial findings, repeated symptoms, or generic improvements.

Competency levels:

- **Deficient.** Findings are unsupported or too vague to identify what happened or what could be learned.

- **Emergent.** The report includes concrete observations but mostly describes events. Explanations, severity judgments, or proposed improvements have weak connections to the evidence.

- **Competent.** The analysis explains important successes and difficulties using observations and participant feedback, distinguishes evidence from inference, and proposes plausible improvements. Classifications and priorities are justified, and conclusions respect the study’s limits.

- **Expert.** The analysis meets the competent criteria and reveals a consequential, non-obvious issue in the design or its assumptions. It considers alternative explanations and derives a focused improvement or next investigation whose value follows convincingly from the evidence.

### Advice

* **Build rapport**. We recommend building rapport with your participant so that they feel comfortable thinking out loud and making mistakes in front of you. Emphasize that you are testing your application, not the participant—their performance (including when they get stuck, confused, etc.) does not reflect poorly on them.

* **Prompting thinking aloud**. Thinking out loud will feel very strange to most participants, and they will be prone to fall silent. When they do, prompt them to keep talking. Remind them to tell you what they are thinking, what they are trying to do, what questions come up when they try to do a task, and even reading out the things they see on the screen (which can be an important signal of the order in which participants read things on screen, including whether they miss certain things\!).

* **Pre-decide where to help**. You are going to be very tempted to jump in to help the participant every time they get stuck—resist that temptation. Instead, come up with a pre-determined set of criteria for when you will intervene, and try to stick to that. Of course, if participants are completely unable to make progress, that is a good time to intervene.
