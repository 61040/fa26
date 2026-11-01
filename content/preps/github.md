---
title: "Prep 9: GitHub"
categories: preps
due_date: 2026-11-05 10:00:00 -0400
order: 9
---

**Due:** Thursday, [November 5th](https://en.wikipedia.org/wiki/Guy_Fawkes_Night), 10am\
**Submission:** On [Commons](https://class.mit-sdg.dev/)

## Overview

Version control is helpful for individuals, but it becomes essential when developing software on a team.
Multiple people will be making changes to the same codebase---sometimes the same file.
Git and GitHub provide affordances to let each person work independently (in _branches_) and then combine their changes (using _merges_) after peer review (via _pull requests_).

In this prep, you will practice working in branches and merging into `main`.

## Tasks

1. **Create a new branch.** In terminal, in your team project repo, create and switch to a
   new branch. You can call it whatever you want, but it should describe the
   feature you are adding.

   `git checkout -b BRANCH_NAME`

2. **Add your bio.** Create a new file called `team.md` (or open it if it
   already exists). Make sure it has a heading, like `# Our Team`. Add a
   section with your name and a short bio. Commit the file and push to GitHub.

3. **Open a pull request.** On GitHub in your team project repo, go to the "Pull requests" tab and click "New pull request". Select your branch to merge into the `main` branch. Click create pull request.

4. **Merge the PR.** Often, you will wait for your collaborators to review your PR before merging it. In this case, it is okay to go ahead and merge it yourself. If there is a merge conflict, [resolve it](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/resolving-a-merge-conflict-on-github) and complete the merge.

Once everyone on your team has completed the prep, the `team.md` file on `main` should contain everyone's bios.

## Submission

Submit the URL of your _pull request_ on **Commons**. (If you already merged the PR, you can find it under the "Closed" filter on the "Pull requests" tab.)
