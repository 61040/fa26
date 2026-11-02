---
title: Final Project
# Every final project deadline, in table order. This is the one place to edit
# them: templates/final-project.html renders it on this page and on each phase
# page. `page` is the file the row links to (no extension). Each milestone has
# one row, and unreleased milestones keep theirs.
deadlines:
  - { label: "Team formation", due: "Tue, Oct 27", note: "One form per student", page: f-team-formation }
  - { label: "F0: Team contract", due: "Sun, Nov 1", note: "Prior to start of team work", page: f0 }
  - { label: "F1: Project pitch", due: "Wed, Nov 4", note: "In person class presentation", page: f1 }
  - { label: "Initial meeting with TA mentor", due: "Fri, Nov 6", note: "By arrangement with your mentor", page: f-mentor-meeting }
  - { label: "Peer critique: pitch", due: "Sat, Nov 7", note: "Of project pitch", page: f-critique-pitch }
  - { label: "F2: Problem framing", due: "Mon, Nov 9", note: "Includes ethical analysis", page: f2 }
  - { label: "Peer critique: problem framing", due: "Thu, Nov 12", note: "Of problem framing", page: f-critique-problem-framing }
  - { label: "F3: Concept design", due: "Mon, Nov 16", note: "Includes development plan", page: f3 }
  - { label: "Peer critique: concept design", due: "Thu, Nov 19", note: "Of concept design", page: f-critique-design }
  - { label: "F4: Alpha checkpoint", due: "Mon, Nov 23", note: "First running version of app", page: f4 }
  - { label: "F5: Beta checkpoint", due: "Mon, Nov 30", note: "Near complete running version of app", page: f5 }
  - { label: "F6: User testing", due: "Mon, Dec 7", note: "Testing completed", page: f6 }
  - { label: "F7: Full demo", due: "Wed, Dec 9", note: "Demo of final version of running app", page: f7 }
  - { label: "F8: Project report", due: "Wed, Dec 9", note: "All remaining deliverables", page: f8 }
---

## Overview

**Purpose**. The purpose of the final project is to give you an opportunity to deepen your skills and understanding of the ideas taught in the class by applying them again, this time in a team setting.

**Expectations**. All members of the team are expected to contribute roughly equally, and to engage in _all_ activities. This means that you are welcome to divide responsibilities so that team members work on different areas of the project, but you may _not_ divide by activity: every member must be involved in problem framing, designing, implementation, and so on. At the same time, you may choose to assign primary _oversight_ of a given activity to a single team member. All members of the team should expect to receive the same grade unless there are major inequities in effort; we hope this won't happen and should be notified early on if it seems to be happening so that we can help remedy it.

**Activities**. The activities that comprise the final project will be the same as the activities that you have already performed in the personal project, with the addition of (1) a few new activities related to team management and (2) a consideration of ethical issues. For those activities that are not new, this document does not explain the activities and only specifies the deliverables; you can refer to the earlier assignment documents and rubrics for guidance and advice on those activities. The new activities are as follows:

- **Team contract**. At the very start of your project, you'll agree on a contract for how you'll work together as a team to minimize the likelihood of misunderstandings.
- **Ethical analysis**. As part of your problem framing, you'll conduct an ethical analysis using a framework called _value sensitive design_, identifying some of the possible undesirable consequences of the kinds of app that address the problem you're working on, and extracting lessons that are relevant for your own design.
- **Pitches and critiques**. Prior to submitting your problem framing document, your team will present a "pitch" in person to the whole class for feedback on your project idea. Each student in the class will provide a brief critique of one project, so that each project will receive three or four peer critiques, in addition to feedback from the teaching staff.
- **Project plan**. As part of your design document, you will include a plan that explains how you will develop your project incrementally; what risks you are most concerned about; and how you will mitigate them.

**Advice**. We hope that this project will be a wonderful experience for you; that you'll build an exciting app, do creative and thoughtful design work, and learn a lot. With that in mind, we offer the following advice:

- **Engage with us**. Your teaching staff are here to help, so make good use of us! Come to your mentoring meetings with your TAs well prepared with a clear articulation of the problems you're currently facing, the issues you'd like advice on, and your plans going forward. When hard design questions arise, feel free to post questions on Commons. The lecturers are also available and eager to help.
- **Be ambitious but control risk**. This project is a chance to do something exciting, so be ambitious. But work hard from the start to keep your project focused and avoid including non-essential concepts: better to have one great concept than a dozen mediocre ones. If your design involves some aspect that might fail (for example, use of an API or a technology that might not work as expected), make sure to include a fall-back option in your design.
- **Stick to your plan**. Don't let your team get behind. If you find that some activity is taking much longer than expected, then revisit your plan and consider cutting back or changing directions rather than just forging ahead and hoping for the best.
- **Collaborate fully**. Take the time to meet with your teammates in person, and to stay in regular contact. You can assign tasks and do them independently so long as you sync up frequently, but you might also consider getting together to work for camaraderie and to bounce ideas off each other.
- **Platform**. You are required to use the sync engine framework, but you are welcome to augment it with additional technologies (such as CSS frameworks, external APIs and services, etc).
- **Reusing and sharing concepts**. Feel free to reuse designs and code from your personal projects in your team project, including concepts that were implemented by any student in the class or by the teaching staff. You are encouraged to reuse the designs and implementations of concepts from [Commons](https://github.com/mit-sdg/commons), the class LMS, and from the [Concept Box](https://github.com/61040-fa25/conceptbox) demonstration project. If you develop a concept in the course of your team project that you think might be of interest to other teams, post a message about it on the [Commons forum](https://class.mit-sdg.dev) and you will receive extra credit if the concept is used by another team!

## Due dates

The class schedule only includes the major deadlines, so a fuller list is provided here. Note that no lateness can be permitted in order to ensure that projects stay on track. All deadlines are at 11:59pm on the specified day. Remember that the user testing activity will require that you schedule sessions with users who are appropriate to your domain, so you will want to plan this in advance.

Grades will be provided as competency levels for each of the relevant rubrics. The final project is worth approximately 30% of your overall grade.

{% render "final-project.html" %}

## Project updates

After your [initial meeting with your TA mentor](./f-mentor-meeting.md), you will meet with your TA mentors weekly to get advice and feedback on the progress of your project. Every team member is expected to attend every meeting. If for some reason, you are unable to come to a meeting, you should let your mentor know in advance.

It is _your_ job to structure the meetings and make sure that they are helpful to you; you should think of your mentor as a consultant rather than a grader. For each meeting, you should come prepared with: a brief report on your progress since the last meeting; a list of problems or issues you want help with; an agenda for the meeting (what order you want to discuss things in, and how long each will take). At the meeting, you should write down your plan for the following week and any decisions you made.

Deliverables associated with each meeting:

- **Agenda**: topics to be discussed with time allocated to each
- **Progress report**: how last week went, alignment to plan
- **Design changes**: what changes were made to the design since the last meeting
- **Issues**: problems and issues to address, with a sentence or two explaining each
- **Plans & decisions** (completed after): plans for next week and decisions made

You should have a separate folder in your team repo for your mentor meetings. You can organize these deliverables as you please; you might, for example, have a single markdown file for each meeting with sections for each area. There is no official submission, but the quality of these deliverables will be taken into account at the end in determining a portion of your team's grade.

Relevant rubrics:

- [Professionalism rubric](../rubrics/professionalism.md)
- [Project management rubric](../rubrics/project-management.md)

## Repos & submissions

**Repositories**. Each team should create one GitHub repository for their design and implementation work; it can be owned by one of the team members, with the other team members as collaborators. The other team members can then clone the repo and push changes to it. We recommend that you use a separate branch for each task or feature, making regular commits, which are pushed to the central repo; then you can open pull requests to merge from the feature branch into the main branch. The individual team members should continue to use their own personal repositories for reflections.

**Document format**. All non-code artifacts should be in markdown format, with any diagrams or screenshots inserted as linked images.

**Submissions**. As before, submissions will be made using Commons, providing a commit hash URL to mark the version of the repository to be graded (with the exception of the team proposal which is submitted as a form) . No slack days or lateness are permitted in final project deliverables.

<script>
  // These sections used to live on this page; send old links to their new pages.
  const moved = {
    "#team-proposal": "f-team-formation/",
    "#team-contract": "f0/",
    "#project-pitch": "f1/",
  };
  if (moved[location.hash]) location.replace("/assignments/" + moved[location.hash]);
</script>
