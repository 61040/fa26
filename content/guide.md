---
title: Class Guide
---
This guide tells you the main things you need to know about the class and how it runs. Please read it carefully! We will **not** be using class time to explain this, but we'll be happy to answer any questions you may have on the class forum. 

## Admin details

**Prereqs and credits.** 6.104 (aka 6.1040) is a 15-unit junior/senior level class, and offers AUS2, DLAB2, and II credit. You can use the class to provide all of these credits at once. Prerequisites are 6.1020 Software Construction (6.031) and 6.1200[J] Mathematics for Computer Science (6.042). From 6.1020 (6.031), we rely on the ability to think about a program in an abstract and code-independent way (using notions such as specifications, interfaces, representation independence, abstraction functions and invariants), and on some practical skills (knowledge of JavaScript, basic familiarity with Node/Express, and programming maturity, notably the ability to deal with sometimes messy and under-documented frameworks). From 6.1200, we rely on the ability to understand structures in terms of sets, relations and graphs. We don't enforce the prerequisites strictly but students are warned that without the background they provide this class can be extremely challenging.

**Lectures**. There are two 80-minute lectures each week, from 2:35pm to 3:55pm on Mondays and Wednesdays in room 1-190. Lectures will focus on fundamental ideas and skills. During each lecture, there will be short exercises and class discussions to help you solidify your understanding. Regular in-person lecture attendance is expected, and video recordings will not be made available except in extenuating circumstances where it is impossible for a student to attend a class. We ask that students do not use **laptops or phones** in class. Research suggests that students who do so unwittingly spend much of the time surfing the internet leading to worse [educational outcomes](https://www.scientificamerican.com/article/students-are-better-off-without-a-laptop-in-the-classroom/), and that [taking notes by hand](https://bpb-us-w2.wpmucdn.com/sites.udel.edu/dist/6/132/files/2010/11/Psychological-Science-2014-Mueller-0956797614524581-1u0h0yu.pdf) is much more effective. You may use laptops during class exercises of course, and you may use a tablet to take notes.

**Recitations**. There is one 50-minute recitation each week. Recitations are taught by teaching assistants, and will give you a chance to delve more deeply into ideas introduced in lecture, and to explore the underlying technologies that you will be using in your projects. You are expected to attend recitations, and you can choose which to attend (but you should stick to the same time from week to week as much as possible, so you get to know your recitation instructor).

**Preps**. To help you get up to speed with platforms and tools, there will be short "preps" that you are required to do in **advance** of most of the recitations. In the recitations, you will do short exercises based on these.

**Problem sets.** There are two problem sets that students will work on individually, whose purpose is to inculcate some important skills that might not otherwise be acquired in the context of project work. 

**Projects.** There are two projects in the term: a first, during which students learn the essential skills and try them out for the first time as a dry-run, and a second more ambitious project to apply the skills at a larger scale, and having learned the lessons of the first project. The steps for both projects will be the same. The first project will be done individually, and the second in teams of four. Students will be able to choose their own teams, and devise their own projects (subject to a few important constraints).

**Readings**. [_The Essence of Software_](https://essenceofsoftware.com/), which explains the key ideas of concept design, is a _recommended_ but not required text. 

**Listeners**. Listeners for the class are welcome and will have access to all the materials. Listeners cannot join project teams or submit work for grading.

**Office hours.** The TAs will be available for consultation during open hours each week at times that will be posted on the website. These are likely to change in response to student demand, so be sure to check when you make your plans for the week. Office hours are intended to provide a place where several students and TAs will be working so that you can get help as you need it. Office hours will be phased out when the team project begins; after that, TA meetings will be made by appointment.

**Meeting with lecturers.** The lecturers will be happy to discuss the ideas they introduced in class with you, to talk about software design in general, and to hear thoughts and ideas about the class. Lecturer meetings are by appointment; please email the lecturers individually to arrange.

## What the class is about

This class is about _design_. You’ll learn how to design software that is fit for purpose: that fulfills the needs of users, and is flexible, powerful and easy to use. Design happens at the meeting point of technology and people. It’s not primarily about the user interface; the focus of the class is about how to shape the underlying functionality that the user experiences.

Skills taught in the class includes (1) designing functionality, and achieving modularity, through an approach called concept design; (2) how to innovate and shape products to meet authentic demand; (3) engaging with users for needfinding and application testing; (4) using LLMs for designing and coding; and (5) incorporating AI agents in software designs.

Although the focus of the class is not technology, you'll learn all the tools you need to be a proficient web stack developer. These include: GitHub for maintaining a repository and GitHub Pages for hosting a static website; Node/Express for backend development; deployment playforms; MongoDB, for persistent storage; and a frontend reactive framework (TBD, but probably Vue).

## Does the class meet industry standards?

Students sometimes ask if the design approach that we teach in the class is the "standard industry approach." Of course it isn’t! If it was, you could learn it on the job and you wouldn’t need an MIT degree. Or to put it another way: the role of education is to shape the future (including yours!), not to reiterate the past.

The class will teach you some of the most effective techniques currently used in industry but it would be a pretty poor class if that was all. In particular, we teach [concept design](https://essenceofsoftware.com) to empower you to be a better designer than you could ever be just by learning on the job, or by taking a UX bootcamp. Concept design is consistent with current best practices (spec-driven development, event-based architectures, microservices, domain-driven design) but offers better modularity and alignment with AI coding tools.

## A learning community

**Goals**. Our goal is for this class to for you to acquire skills, insights and sensibilities that will serve you well for your entire life. Knowing how to build an app may help you get a summer job, but remember that’s not why you’re taking this class. Learning how to think deeply about design matters more. 

**Community**. To make the class as effective as possible, we want it to be a _learning community_. We have explicitly designed the class so that you do not feel you are in competition with one another. Great design is a social activity: it happens when you're inspired by someone else's work, remix it into your own, or when someone else offers a generous and constructive critique of your work to help push it further.

**No hoops**. A healthy learning community is also centered on _trust_. We, the staff, will treat you, the students, as grownups. We won’t penalize you for small mistakes, or ask you to jump through arbitrary hoops to demonstrate your learning. Everything we ask you to do will be in service of building your skills for working on real problems.

**Participation grade**. Participating in activities in lecture and recitation, and in team mentoring meetings, is required. We won't nickel and dime you: we understand that you won't be able to attend every session, and we won't be grading your activities in detail. But you should know what it will not be possible to obtain a grade of A if you have not participated fully. We hope also that students in the class will be generous in sharing their knowledge and understanding with each other, by asking and answering questions in the forum (but this aspect of participation is not strictly required). We are also happy for students to help each other with their assignments, and to discuss their design and coding ideas with each other. We do expect each student to write up their assignments themselves.

**Asking questions about your work**. Note that there is one particular major difference between this class and most MIT classes. In most classes, students are not encouraged to ask for help in the class forum on assignments. But since all the assignments in this class involve working on projects that are chosen by students, there are no "answers" to give away. We therefore **strongly** encourage students to ask questions about their design and coding work in public on the forum. Just bear in mind that questions that ask for help with debugging are unlikely to be answered if they're vague ("I wrote this 100 line file but it doesn't seem to work. Can you tell me why?"). You're welcome to ask for help with debugging, but you should formulate a clear question ("I thought this query on my database would produce this result, but it doesn't. Can you tell me why?"). For the problem sets, which involve the same questions for all students, we do ask that students not post tentative solutions in public, but the TAs will be happy to provide feedback privately.

Some students are reluctant to ask questions on the forum for fear of looking bad. This is a mistake. Realize that if you have a question, it's likely that other students have the same one, and they'll appreciate your asking it. In our experience, MIT students often miss out on opportunities for guidance and feedback, and the ones who ask questions are more likely to succeed and tend to receive better grades.

**Class feedback**. Some classes provide a way for students to offer feedback anonymously. But we believe that anonymous feedback is not a great idea, because it gives the impression that the class is an impersonal product and the students are consumers, rather than the students and teachers embarking on a shared journey. We also believe that it's an important skill for students to learn how to provide candid and constructive feedback. So although we won't be providing an anonymous feedback line, we strongly encourage you to share your thoughts with the lecturers and TAs. We will also be asking for regular feedback about the assignments. We will be very grateful for your ideas, suggestions and constructive criticism.

## Attendance

Why is lecture attendance is required? First, we’ve found that students who attend lecture do better: they learn more, they’re happier, and they get better grades. Second, when students don’t attend lectures they often become a burden to the staff because, when the assignment comes and they discover they are unprepared, they try to learn the lecture ideas in office hours and by asking questions online.

We put a lot of work into making lectures engaging and educational, and we believe there is no substitute for being there in person, joining your peers on class activities, and participating in discussions. If you have suggestions for how to improve lectures, we will be glad to hear them.

## Collaboration

Design is all about collaboration, so we encourage it in all aspects of the class. You can talk with anyone about anything; you can share ideas; and you can use other people’s ideas in your own submissions with appropriate credit. The only constraint is that you must write up your work by yourself (this ensures that you really understand it!) and note the set of people you collaborated with.

The class will run on an honor code. We will assume that you are not cheating by copying text or code from other students in the class or from work submitted in previous terms. If we discover that you have violated the honor code, you may fail the class and have a complaint registered with the Committee on Discipline.

You are free to use any third-party code, whether as libraries or code fragments, and to adopt any idea you find online or in a book, so long as it is publicly available and appropriately cited (see the [section on code](http://integrity.mit.edu/handbook/writing-code) in the MIT [handbook](https://integrity.mit.edu) on academic integrity for details).

## Using AI

An important part of this class is learning how to use AI effectively in software development, so in general you are encouraged to use LLMs extensively.

Using AI effectively means not only understanding where it falls short, but also knowing when it becomes a crutch that damages your learning. Remember that the "product" of your education isn't a collection of assignments or projects, or a transcript or a GPA. You're the product. The goal is to enhance your own skills, and to become a more creative and thoughtful person.

To do that, you'll need to be constantly aware of the risks of ceding your agency to an LLM. And that's easy to do, because you're busy and LLMs are powerful and, at the start, likely to be more proficient than you are. Realize too that LLM usage is seductive, but that once you've fallen into the rabbit hole it may be hard to get out. You may find yourself with a mass of design work or code that you've lost track of, with no way to regain control.

Rest assured that LLMs are not (yet!) that good at software design. Designing concepts that are aligned with authentic demands is very challenging. The designs LLMs come up with tend to be competent but bland and conventional, and often overcomplicated. Their attempts at achieving modularity tend to be poor. 

Know too that LLM writing is often easily recognizable. An LLM wants not to just to be your writing companion---but to be an authoritative voice. It writes so that ideas land well, and travel easily. LLM writing often seems to say more than it really does, has little variety in sentence length and rhythm, and everything comes in threes. In short, if your writing is full of LLM slop we'll notice and your grade will suffer.

Here are some tips for using AI in the context of this class:
- **Do it yourself the first time**. Avoid using an LLM to draft your writing. Better to write it first yourself, and then maybe ask an LLM to point to ambiguities or infelicities and suggest improvements. When you're learning a new skill, such as how to design a concept, try to do it without help first. The two problem sets in particular will be much more useful to you if you attempt them without LLM support.
- **Never use an LLM for personal reflections**. Throughout this class, you'll be asked to reflect on what you've learned. This is to help you develop the skills of meta cognition (thinking about thinking). If you ask an LLM to reflect on your behalf, the results will be flat and colorless, and you'll rob yourself of the chance to grow intellectually and emotionally.
- **Use an LLM as a critic**. Ask it to review your design or your code, and give it the background documents we provide you with (including rubrics) to inform its critique.
- **Ask for explanations**. When an LLM writes code for you, ask it to explain it. Point to a line of code that you don't understand and ask what it does. When you're learning a new technology for the first time, an LLM can provide excellent tutoring, especially if you engage thoughtfully and ask good follow-up questions.
- **Be skeptical**. When an LLM makes suggestions, push it to justify them. Don't accept vague arguments, but press on the weak spots. Ask for citations when an LLM points to sources, and check them. 
- **Generating code**. LLMs are very capable coders when the context is sufficiently narrow. If you ask an LLM to one-shot an entire app, it may be able to produce something that works, but it will likely be poorly structured and unmaintainable. The quality of the code that you get will be determined by the quality of your concept design; if you design well, the code will follow smoothly. Make sure to actually look at the code that is generated, and keep an eye out especially for excessive complexity.
- **Brainstorming**. One of the best ways to come up with novel ideas is to brainstorm with some friends or colleagues. An LLM can play this role too, less creatively and more predictably than people, but also with more background knowledge.
- **Social isolation**. Keep track of how much of your time is spent interacting with an LLM. Everyone needs social contact, fresh air and time without devices. Consider setting aside times to think and work with just pencil and paper. If you haven't done this before, you'll be amazed at how much you can accomplish---how much creativity and clarity comes when the noise is gone. When you hit a problem you don't know how to solve, take a walk.

## Student repositories

Your individual work for the term will be within two GitHub repositories, one for your personal reflections and problem sets, and one for your project. For the team project, all team members will share a single repo. Your own personal reflections on the team project will be in your personal repo.

To submit each assignment, you will commit it in your repo **and** complete a submission form that will ask you for the commit hash corresponding to the last time you updated the submission prior to the deadline.

## Grading and lateness policy

Your work in this class will be evaluated by its quality, not its quantity. Each assignment will have a list of a few skills that the assignment aims to teach you. There will be a rubric for each skill, which you can also use as a background document to have an LLM give you feedback on your work prior to submission.

Your grade for each assignment will be a competency level for each skill. The levels are:
- **Deficient**. You did not demonstrate the skill.
- **Emergent**. You demonstrated the skill in part, but were missing some critical aspects.
- **Competent**. You demonstrated the skill in all aspects.
- **Expert**. You applied the skill with the insight and creativity that distinguishes an expert from a routine practitioner.

These levels correspond roughly to grades (A for expert, B for competent, C for emergent). Thus if all of your work is deemed to be competent, for example, you can expect to receive a B. For an A, you are expected to do mostly expert work, and to have participated consistently in class. Team work will be graded by team and not participant. Adjustments and compensations will be made to account for circumstances. For example, a team member who fails to turn up for team mentoring meetings, or who does not do their fair share of team work, can expect a lower grade.

**Late submission and slacks**. Assignments submitted after the deadline will generally not receive credit. Each student has three "slacks" that allow you to hand in an assignment or problem set three days late (eg, on Friday night rather than Tuesday night) without penalty. You do not need to notify us when you plan to take a slack. You cannot take less than one slack on a deadline (ie, fewer than three days) or more than one slack (ie, more than three days), and you cannot use slacks for the team project deliverables. If you anticipate trips or conflicting commitments, you should expect to use slacks to cover them.

**Extenuating circumstances**. In the case of emergencies, illness or other extenuating circumstances that are unanticipated, we will obviously grant extensions. **It is your responsibility to obtain a letter from an [Student Support Services](https://studentlife.mit.edu/s3) (S3) dean that specifies explicitly how many days extension they believe you should be granted.** Please note that participation in clubs, conferences, sports events, job recruiting, etc, are not grounds for extensions, but should be accommodated by slacks.

**Completion plan**. Sadly, some students find that even with extensions they are unable to make adequate progress. If, just prior to the team project, your overall grade is not a C or better, you will not be able to join a project team. In this case, we may offer you the option to use the rest of the term to complete the individual assignments, which must be handed in one week before the end of term. Your final grade will be one letter grade lower than what it would have been if all your assignments had been submitted on time, and will be no better than a C. Students may not elect to take this option unilaterally.

## Advice

Some general advice:

- **Get started early**. We know that 6.104 isn't your only obligation. You’re busy and have to juggle many other classes and other responsibilities. But don't underestimate the time 6.104 assignments will take. They can look deceptively straightforward, and thinking through a design often requires some elapsed time. It's amazing how just having a problem in the back of your mind will make it easier to solve, as ideas will spontaneously occur to you when you're walking, showering, etc. So don't wait until the day an assignment is due to start thinking about it. That will (a) make you stressed, (b) give you few chances to get help, and (c) lose the advantage of mulling a problem over in the back of your mind. So try and get started early on, and figure out what you’ll need to do, and what help you might need.
- **Ask for help**. Don’t be shy to ask the staff for help in office hours, or to post questions on the class forum. In our experience, students who ask for help enjoy the class more, learn more, and get better grades.

## Getting Help

Do make good use of all the resources the class offers. We're here to help you!

- For **administrative questions** (eg, regarding due dates or interpreting assignment instructions); for **technical questions** about programming or the various platforms; for **questions about ideas** taught in lecture; for **larger questions** about design whether or not directly related to lecture content; for **questions and feedback about the pedagogy** of the class; for **clarifications about assignments and exercises**; for **detailed design and implementation questions about project work**: post publicly in the appropriate category in the class forum.
- For help when you're **feeling confused** on a design or programming issue, and can't formulate a question, or would like advice on your design or code: go to TA office hours or faculty office hours. Please do not email the TAs individually to ask for help.
- For a **personal issue** about grading, attendance, or team issues: post a private question for the staff in the class forum.
- For an **S3 extension**, have the S3 dean send email to the lecturers.
- For a personal problem or for **friendly life advice**: email a lecturer. We’d be delighted to find a time to chat with you.

Students are sometimes wary of posting basic questions in the class forum, but bear in mind:
- If you have a question or are confused about something, other students almost certainly are too, and you will be doing them a service by articulating a question.
- Learning how to be straightforward about what you don’t understand, and where you need help, is an important professional skill. People who confidently ask for help are better team members than those who struggle silently.

## Life at MIT

Life at MIT is intense, fast-paced and exciting. But it can also be exhausting, and almost all students have times when they feel demoralized or frustrated. And a campus can be a lonely place even when you’re surrounded by others.

MIT is committed to helping students deal with the pressures and challenges of student life. A good place to start is [ask.mit.edu](https://ask.mit.edu), which has pointers to many useful resources. If you are dealing with a personal or medical issue that is impacting your ability to attend class, complete work, or take an exam, you should contact a dean in [Student Support Services](https://studentlife.mit.edu/s3) (S3). S3 is here to help you.

The staff of this class is deeply committed to making your experience this term one that will not only give you valuable skills and insights, but will also bring you confidence and joy in your work. We hope that if the class does not live up to our aspirations of supporting you effectively in any way, you will let us know. The lecturers are also keen to engage with students individually, so be in touch if we can help.

You might find Daniel Jackson's book [Portraits of Resilience](https://portraitsofresilience.com) helpful. It includes stories of MIT students who have experienced serious challenges in their life at MIT and how they handled them.
