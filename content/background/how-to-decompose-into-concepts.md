---
title: "How to decompose into concepts"
---

This document explains why you should decompose functionality into multiple concepts, and how to do it.

## Disentangling functionality

You're designing a software system, agentic workflow or organizational process. That means designing a *behavior*, or thinking in terms of the value you get from it, some *functionality*. You could represent the entire behavior or functionality in a single concept, as one complicated course of action. But it's better to break it into multiple, smaller concepts than are then composed. Sometimes this is relatively easy to do, but sometimes you have to work harder to disentangle different strands of behavior that belong in separate concepts but initially seemed to be part of the same behavior.

Here is what is gained by decomposing into multiple concepts:
- **Simplification**. Smaller and more focused concepts whose behavior is well aligned with a compelling purpose are easier to understand than one big concept.
- **Familiarity**. Concepts that designers and users already know and are familiar with are easier to understand than new concepts.
- **Reuse**. By factoring out concepts that can be reused in other contexts, you save later work.
- **Alignment of shared concepts**. When different members of a product family, or different groups within an organization, use different variants of the same concept, confusion arises and unnecessary work is done to reimplement the same basic idea multiple times, and to reconcile needless differences. This can be avoided by identifying shared concepts, but will often call for decomposing a more complicated behavior to find the shared one.
- **Ease of change**. A decomposition into robust concepts, each with its own clear purpose and behavior that fulfills it, makes it easier to localize evolution. When a change to behavior is needed, it's clearer where to make the change, and the change can be made in a smaller context.
- **Reliability of execution**. Coherent and focused concepts are executed more reliably because they are easier to understand than large and unfocused ones. For a concept that defines a policy, this means it's easier for people to understand and follow it. For a concept implemented in code, this means it's easier for an LLM to generate the code reliably and without bloat or bugs.

Of course these advantages are only obtained if you decompose a complicated behavior into the *right* concepts. If the concepts are arbitrary and incoherent, the result can be even worse than having one big complicated concept.

## How concepts fit together

Before learning how to do a concept decomposition, you need to understand how concepts fit together. 

### Interleavings of action histories

A concept offers a *course of action*, and is defined by its *behavior*. This behavior comprises the collection of all possible scenarios or *traces*, each trace being some sequence of action occurrences.

An action can be performed by a human, an agent or a machine; when a concept is realized as a software service, some of the actions will become API functions that are called and others are executed spontaneously by the service. 

When concepts are composed, every trace is just an interleaving of the traces of the individual concepts. So if you took the trace of all action occurrences, and filtered it to include only the actions of a given concept, you would obtain a trace of that concept. In other words, composition *preserves* the behavior of the individual concepts.

### Example of interleaving

Consider a social media app that includes a Posting concept with actions for creating, editing and deleting a post, and Commenting concept with actions for adding a comment to a post and removing it. The Posting concept allows its actions to happen in any order so long as a post is deleted only after it was created, and is edited only after being created and before being deleted. The Commenting concept likewise allows adding and removing comments, but removing only after adding. 

So a trace of Posting is

>create ("helo"): (post1)
>edit (post1, "hello")
>delete (post1)

in which post1 is created with the contents "helo", edited to fix the typo, and then deleted. And a trace of Commenting is

>add (post1, "nice"): (comment1)
>remove (comment1)

in which comment1 is added to post1 and then removed.

Composing these two concepts results in a system whose traces can interleave these in any way. In this interleaving, for example, the comment is added after the post is edited, and removed after the post is deleted:

>create ("helo"): (post1)
>edit (post1, "hello")
>add (post1, "nice"): (comment1)
>delete (post1)
>remove (comment1)

and in this trace the comment is added after the post is created and removed before the post is edited:

>create ("helo"): (post1)
>add (post1, "nice"): (comment1)
>remove (comment1)
>edit (post1, "hello")
>delete (post1)

Some interleavings will not make sense: for example, adding a comment to a post after it has been deleted. Such interleavings will be ruled out with reactions.

### The role of states in concept composition

A concept has *state* that remembers which actions have been performed. In theory, states aren't necessary, and a concept's behavior is defined by its traces -- the actions that happened. But states are useful in practice for several reasons:
- **Defining behavior**. States give you a way to define the traces implicitly, without having to enumerate them all (which would generally be impossible since there's usually an infinite number of them).
- **Reacting on state**. When concepts are composed together with reactions, the reactions can refer to concept states to decide how actions in one concept are constrained by actions in another.
- **Visible states**. In some realizations of concepts, the states are visible to users, and provide useful information about which actions have happened.

### Coordinating concepts with reactions

When concepts are composed, not every interleaving is usually allowed. Instead, you specify some *reactions*, which are rules that constrain occurrences of actions between concepts. 

Reactions play many roles in a design, such as:
- **Maintaining invariants**, for example by cascading deletes
- **Enforcing access controls**, by causing actions to occur only when permitted
- **Automating follow-up actions**, for example sending notifications

Often the reactions of a system embody the more domain-specific properties, allowing the concepts themselves to remain more general, so they can be reused more widely.

A reaction has the form: 
- **when** some action occurs (in some concept)
- **where** some condition holds (on the state of one or more concepts)
- **then** one or more additional actions should occur.

## Suppressing actions and request actions

A reaction can't suppress the occurrence of an action; it only causes actions to happen. Instead, you want to prevent some action from occurring, you treat it as inaccessible to the outside world, and activated only by reactions. A reaction can then link occurrence of that action to a *request action* that represents a request coming in, and not firing the action in response to the request is tantamount to suppressing it.

### Examples of reactions: deleting posts

To illustrate reactions, let's return to the social media example with Posting and Commenting. We'll need some requesting actions which we'll think of as belonging to a Requesting concept that represents the course of action involved in making web requests and getting responses.

This reaction says that **when** an editPost request happens for a particular user and post, with some new content for that post, **where** the user is the author of the post, **then** the edit action happens:

>**when** Requesting.editPost (user, post, newContent)
>**where** Posting: user is author of post
>**then** Posting.edit (post, newContent)

Note that if the user is not the author of the specified post, then the follow up action will not occur. The where clause queries the state of the Posting concept to find the post's author; this will be the user who previously created the post.

What should happen when a post is deleted that might have comments associated with it? These three designs define three different ways to handle this problem. In the first, the request to delete a post only leads to it being deleted if there is no comment on it (and the user deleting the post is its author):

>**when** Requesting.deletePost (user, post)
>**where** Posting: user is author of post
>	**and** Commenting: post is not a target of a comment 
>**then** Posting.delete (post)

In the second, the post is deleted if the user is the author, and any comment associated with it is deleted too in a second reaction:

>**when** Requesting.deletePost (user, post)
>**where** Posting: user is author of post
>**then** Posting.delete (post)

>**when** Posting.delete (post)
>**where** Commenting: post is a target of comment 
>**then** Commenting.delete (comment)

In the third, if the post has a comment, it is not actually deleted but the post is edited to say "deleted":

>**when** Requesting.deletePost (user, post)
>**where** Commenting: post is a target of comment 
>**then** Posting.edit (post, "deleted")

This last reaction might be combined with the first above to cause a regular deletion when there is no comment.

## How concepts enforce independence

When designing with concepts, it's vital to understand that concepts achieve a degree of modularity that is unusual in software systems. This means that concepts are, by construction, always fully independent of one another. But it also means that the kinds of escape hatches that allow you to fudge things in traditional designs aren't available, so you really need to design carefully.

Here are the key ways in which concept independence is ensured:
- **No calls**. The actions of one concept cannot "call" the actions of another concept; the only way data or control can flow between concepts is through reactions.
- **No shared state**. The state of each concept is accessible only to that concept. That is, it is updated by the actions of the concept, and used to determine whether an action can happen. A software implementation of a concept can make the state queries that reactions use in their where clauses available as query functions. A concept's query functions can access only the concept's state, and not the state of another concept.
- **No mutable objects passed**. In object-oriented systems, state can be shared in a rather subtle and complicated way: by passing a mutable object that is mutated in one place and queried in another. Concept design has no such objects. When an individual is passed as an input or output of an action, only the identity of the individual is passed. Structured data can be passed as values, but values are not mutable.
- **No constraints on other concepts' types**. When one concept accepts individuals in its actions that are created by other concepts, it cannot make an assumptions whatsoever about those individuals. For example, if an Authenticating concept creates user individuals, and a reaction passes a user to an action of a Posting concept as the author of a post, the Posting concept is not entitled to assume that a user has a name, even if the Authenticating concept does associate users and their names in its state. If you want to think about this in type theoretic terms, the Posting concept is polymorphic in the type of Author, which is a parameter rather than a concrete type. That Author type parameter might be bound to the type of user generated by Authenticating in one system, but in another it might be bound to a different type. This allows concepts to be applied more generally: a Commenting concept, for example, would treat the target of comments as such a parameter, so that the same concept could be used to comment on posts, or on articles, or even on users.

## How to decompose

Now we get to the central question: how to decompose a behavior into concepts. A variety of strategies can be applied:
- **Recognizing familiar concepts**. The first step is to consider whether the behavior embodies some familiar concepts. If so, they become the first candidate concepts. In some situations, you might even find that most or almost all of the concepts are familiar ones. If you were building a social media app or a task tracker or an online forum, for example, you'd expect most of the concepts to be ones that you've seen already. A familiar concept may not apply exactly, but you may be able to adjust it to fit by making small changes. Just bear in mind that usually adjustments in behavior are better achieved in reactions, leaving the concepts as conventional as possible.
- **Analyzing proposed concepts**. Assuming that the familiar concepts have now been factored out, only novel concepts remain. These can now be analyzed in turn, using criteria laid out below, which might suggest breaking a concept into smaller concepts or coalescing two concepts into one.
- **Simplifying reactions**. When you come to compose your concepts by specifying the reactions that constrain their interleavings, the clarity and simplicity of your reactions will follow from the quality of the concepts. Inadequacies in concepts (for example, not having a rich enough state) can result in needlessly complicated reactions. So checking the reactions and thinking about how they might be simplified by changing the concepts is a useful feedback loop.

## Analyzing a concept

Let's consider the design criteria that can be applied to a concept, acting both as a rubric pointing to ways in which the concept might be improved, but also sometimes suggesting breaking up or coalescing concepts. Each criterion has some rules that can be checked.

### Criterion: Cohesion

The concept should hold together as a coherent unit of behavior. Rules to check:
- **Compelling purpose**. The concept's purpose should be compelling and understandable. It should avoid circumlocutions and vagueness; one bad smell is saying that the concept "manages X", where is some individuals. The positive part of the purpose indicating what value it brings should be paired with a negative part that explains what bad situation it mitigates or prevents. The value and the bad situation should be recognizable and familiar.
- **Coherent course of action**. The course of action that the concept prescribes should be coherent so that it makes sense in isolation from the courses of aciton of other concepts. it should never be the case that the actions of one concept only make sense on the assumption that other actions in other concepts are happening too.
- **Dense use of state by actions**. Most of the actions should be connected to most of the parts of the state. If the state is complicated and has many components, only a few of which are accessed in a each action, something is likely wrong.
- **Optional arguments and disjunctive specifications**. Optional arguments to actions are a symptom that an action isn't coherent, and should be split into two actions, one with the argument and one without. An action that is defined as having multiple different (and unrelated) effects depending on the value of one of its arguments is said to have a disjunctive specification which is a sign of incoherence. A good design should have an expressive set of simple actions.

#### Examples

Violations of compelling purpose:
- **User concept**. A concept whose purpose is to "manage users" and that just acts as a container for every property of a user (their authentication details, communication preferences, subscriptions, etc) is incoherent, and should be split into concepts that have compelling and focused purposes such as Authenticating and Subscribing.
- **Your top shows**. The Apple Podcasts app has a concept called "your top shows" that lists (at the top of the user's home screen) a collection of supposedly relevant shows. But these are not shows that a user has intentionally selected; in fact, they are chosen algorithmically by an opaque algorithm that interprets passive clicks and may include shows the user sampled and disliked. The user cannot add or remove shows. Better to split into more coherently defined concepts, such as RecentListening (which tracks podcasts the user has listened to recently) and Favoriting (which holds podcasts and shows the user has explicitly selected as favorites).
- **Spotify folders**. The folder concept in Spotify might seem to have the purpose of letting you organize your library of songs, albums and playlists. But only playlists can be inserted in a folder; songs and albums are confusingly turned into playlists. The concept should be generalized to allow any kind of item (song, album or playlist) to be placed in a folder. If hierarchical playlists are required, that might be an enrichment of the Playlisting concept.
- **Security questioning**. A few apps still make users select and answer security questions, but the purpose of this concept is unclear. It does not mitigate the risk of forgetting passwords, since user's often forget exactly which answer they gave to a security question (especially since the answers may be case sensitive). It also doesn't keep attackers out, since security questions often involve routine personal information that is easily obtained online. 

Violations of coherent course of action:
- **Submitting expenses**. In SAP Concur, the concept for submitting expenses does not let you just record an expense and then submit it. Instead, there's an additional, intermediate action after recording an expense in which it is itemized, and the expense cannot be submitted until the collection of associated itemized expenses sums exactly to the original expense. Users find this incoherent and annoying. If it's desirable to report individual expense items and also to aggregate them into larger groups, this suggests multiple concepts: one for Itemizing, one for Categorizing, and so on.

Violations of dense use of state by actions:
- **User concept**. Consider a bad concept intended to "manage users" whose state components include passwords, user names, display names, email addresses, subscription details, etc. Each action of the concept updates one or perhaps two of these components. This is maximally sparse, with N state components, N actions and only N/(N^2) = 1/N state references per action. It indicates that there are no strong relationships between components, and that the concept is not cohesive, and should have been broken into concepts with more compelling and focused purposes, such as Authenticating, Subscribing, ProfileNaming, etc.

Violations of optional arguments and disjunctive specifications:
- **Reserve with replace**. Suppose a Reserving concept has a reserve action that includes as an input a replace flag, which if set to true, causes the new reservation to replace all existing reservations by this user. This would be bad, because when the replace flag is true, the action does something very different. It also would not be very helpful, since a user may not recall what other reservations they have made, and their intent was only to replace a reservation on a given date at a given restaurant. Instead, there should be a separate action to cancel a reservation. In general, an expressive 
- **Unix move**. The move command in Unix, written mv, does several very different things depending on its arguments. If the first input is the name of a file F and the second input is the name of an existing directory D, then mv F D will place F inside D. If the first input is the name of a file F and the second input N is not the name of an existing file or directory, an existing directory D, then mv F N will rename F to N. If the first input is the name of a file F and the second input G is the name of another file, mv F G will delete the file previously called G and create a new file called G with the contents of F. Needless to say, novices find this confusing, and would benefit from distinct actions such as *rename*, *move*, etc.
- **Git checkout**. In the Git version control system, *git checkout x* will either switch to the branch x (if x is the name of a branch) or will load the file x from the repository and discard local changes (if x is the name of a file). In the newest version of Git, the actions were split into *git switch* and *git restore*.
- **Handling job applications**. A concept for deciding on job applications has an action *decide* that takes as inputs (a) the candidate and (b) a decision of reject, interview or offer. The different decision options lead to completely different state updates and future actions. A better design would split decide into *reject*, *requestInterview*, *makeOffer*.
 
### Criterion: Separation of concerns

The concept should *separate concerns*, and not conflate courses of action that serve different purposes. Rules to check:
- **Singular purpose**. The purpose of the concept should be singular, and not two or more purposes in disguise. A concept is *overloaded* when it serves more than one purpose. This results in a lack of clarity in the behavior, and less flexibility for users because the purposes are not delivered in an orthogonal way but rather different features are tied together in ad hoc ways.
- **No compelling subconcept**. There should be no subconcept that could be extracted that would be a compelling concept in its own right, independently of the concept from which it was extracted.
- **No unnecessary details**. Every part of the concept should be necessary to support its purpose. There should be no actions or state components that are extraneous and could be removed without losing some tangible benefit that could not be more straightforwardly provided by another concept.
- **Single role state components**. Each state component should play only one role. For example, a user's email address should not be used both as a username and a channel to send messages.

#### Examples

Violations of singular purpose:
- **JPEG dimension setting**. In Fujifilm cameras, a single menu embodies a concept that lets you select the JPEG dimensions of the recorded image. This serves two purposes. One is to let you choose the resolution (by choosing more or fewer pixels on both sides); the other is to change the aspect ratio (by changing the relative number of pixels). Conflating these results in a confusing menu with many settings (one for each resolution and aspect ratio combination), and doesn't allow the aspect ratio to be changed when the recording format is raw only (even though the camera does actually write aspect ratio data to the raw files). A better design would factor out Aspecting and ResolutionSetting as two concepts.
- **Liking songs**. In Spotify, liking a song has two consequences: it adds it to a favorites list, and it marks it for the recommending algorithm. These should be separate actions in separate Favoriting and Recommending concepts.
- **Archiving**. In Instagram, archiving a post makes it disappear from public view, but archiving a story makes it available for highlighting publicly. There should be two distinct concepts, Archiving for saving and hiding private posts and stories, and Highlighting for managing the workflow of saving stories in a special highlighting pool and selecting them for publication.

Violations of no compelling subconcept:
- **Sessioning within authenticating**. An authenticating concept might include registering users with user names and passwords, logging in (creating a session) and logging out (ending the session). Sessioning can be factored out as an independent concept of its own, which would simplify the design, and give more flexibility by allowing sessions to be combined with non-password authenticating means (such as biometrics), and authenticating to be used without sessions (eg, when reauthentication is needed during a session for a critical request, such as a large bank transfer).
- **Membership tracking within group chatting**. A group chatting concept may include not only actions for posting messages in a group but also actions for joining and leaving the group. These are better handled separately in a MembershipTracking concept that has its own lifecycle and purpose, and is not specific to group chats.
- **Allocating within reserving**. A reserving concept may include not only the action that reserves a resource, but also the action that allocates it. Allocating can be factored out, because the lifecycle of the resource is distinct from the lifecycle of the reservation. Once factored out, the reserve action of the Reserving concept would take a resource as an argument that is provided as part of a reaction that ensures, using the Allocating concept, that the resource is available. This decomposition becomes even more valuable when Allocating becomes domain-specific and complicated. In a restaurant reservation system, for example, Allocating dining slots involves considerations of turn time and overbooking.

Violations of no unnecessary details:
- **Department for expensing**. An ExpenseReporting concept may include the employee's department, on the grounds that the expense report will need to be approved by the department head. But this adds no useful functionality, since the employee's department is already stored in a concept that tracks reporting relationships. In contrast, if the department were associated not with the employee but with the expense report (so the employee could submit different expenses to different departments) that would make sense, since that information belongs to the expense function and is not replicated elsewhere.

Violation of single role state components:
- **Email address**. An authenticating concept might include a user's email address as both a user name and a communication channel. This suggests a conflation. The user would like to choose a preferred email for notifications, and not have this be tied to their user name.
- **Shopping time**. A shopping cart concept might save the time at which shopping began, and then use it both to limit the amount of time the cart can be active for and to timestamp the resulting order. A user who had their cart open for 4 hours before submitting the order would then see the order as being submitted 4 hours too early. This points to several conflations: in addition to the Shopping concept that handles the cart actions, there should be an Ordering concept that accepts orders and timestamps them, and a Sessioning concept that limits user sessions.

### Criterion: Completeness

The concept should be *complete* with respect to its purpose, not requiring the presence of other concepts to fulfill that purpose, so that functionality is *fragmented* across concepts. Rules to check:
- **Complete course of action**. The course of action represented by the concept should be complete in the sense of being a full lifecycle, including both early actions for initialization and late actions for completion. If some actions of the concept rely on certain facts about individuals (that is, state conditions) being established prior to being executed, those facts should be established by actions within the concept itself, and not outside.
- **Not just CRUD**. A concept that just supports actions that just perform the standard CRUD operations (creating, reading, updating and deleting) without any richer lifecycle behavior is suspect, and suggests that the full lifecycle of the concept has not been properly considered.

#### Examples

Violations of complete course of action:
- **Authenticating without registering**. An Authenticating concept that only authenticates users but didn't include their previously registering won't have sufficient state to authenticate, and would have to rely on another concept, which would fragment the authenticating functionality across two concepts.
- **Reserving without redeeming**. A Reserving concept that lets users reserve resources but has no action for actually using or redeeming a resource would be incomplete. The omission would make it hard to prevent attempts to use the same reservation multiple times.
- **Group membership without group creation**. A MembershipTracking concept that lets users join groups but leaves the creation of groups to another concept would fragment the lifecycle of a group across two concepts.
- **Shopping without ordering**. A Shopping concept that has no *order* action might seem acceptable because the creation of an order would belong to a separate Ordering concept. But the Shopping concept needs its own action to terminate the shopping session to ensure proper synchronization of the concepts, and prevent two orders being issued for the same shopping cart.

Violations of not just CRUD:
- **Trading stocks**. A StockTrading concept might have actions to create an order, update it (eg with the price when filled), and delete it (when canceling). This neglects the rich lifecycle of an order: that it can only be deleted in a short window of time after submission, and that the filling of an order can involve multiple steps of partial filling, potentially at different prices.
- **Preferences concept**. Many applications implement some kind of preferences concept that holds a collection of preference properties and allows them to be updated or reset to defaults. This is not a good concept. It separates preference settings from their usage context: a preferred communication channel should be part of a Notifying or Communicating concept, and a language choice should be part of an Internationalizing concept. By conflating different concepts, it also denies the user granular control: resetting preferences would reset all preferences rather than allowing preferences related to a given task (such as notification preferences) to be reset separately.

## Simplifying Reactions

A complicated reaction can be a symptom that a concept has been fragmented, so that data and control that could be contained within one concept has to flow between two. The complications can take several forms:
- **Additional where clauses**, to preserve invariants that relate states in two different concepts that could have been preserved within individual actions.
- **Propagating updates**, where redundancy between concepts requires changes to the state of one to be propagated to the other. 
- **Passing excessive data**, because the state of a concept has been fragmented and needs to be passed between concept actions, or because a concept is not sufficiently generic.

Replicating some data across concepts is not always bad, however, and is acceptable when the sets of data items in the two concepts play very different roles.

#### Example of simplifying reactions

An example of additional where clauses:
- **Fragmenting MembershipTracking**. Suppose instead of a single MembershipTracking concept that has actions to create groups and join and leave, you have two concepts, one (GroupCreating, say) maintaining a set of groups with actions to create and delete groups, and one (GroupJoining, say) maintaining the memberships of the groups, with actions to join and leave. (Of course the poor names of the concepts are already a symptom that a concept has been fragmented.) Every action of GroupJoining will need to be guarded by a where clause on the first concept that ensures that the group being joined or leaved actually exists.

An example of propagating updates:
- **Fragmenting MembershipTracking**. Continuing the same example, if the existence of groups was stored redundantly in GroupJoining, that would then require reactions to propagate creation and deletion from GroupCreating to GroupJoining. 

An example of passing excessive data:
- **Fragmenting Rating**. Suppose you have a RestaurantRating concept that has an action for rating restaurants, and a RestaurantFinding concept that provides a pool of restaurants that can be searched. You decided that the RestaurantRating concept should hold the name and address of the restaurant so that displays of ratings can all be managed within that concept. That was a mistake, because you now have two copies of a restaurant's name and address, one in RestaurantRating and one in RestaurantFinding and they will need to be kept in sync. When a user finds a restaurant and then rates it, the rating action will need to be passed the restaurant details. A better option is to for RestaurantRating to associate the restaurant (that is, the restaurant's identity) with the rating. Then it becomes clear that the restaurant is just the subject of the rating, and the concept can be generalized to a Rating concept in which arbitrary subjects are rated.

An example of acceptable redundancy:
- **Postal addresses in online store**. An online store might have an AddressSelecting concept that lets customers recall addresses from previous purchases, and an Ordering concept that lets customers issue orders that also have addresses. The sets of addresses in the two concepts play very different roles. One is the set of relevant addresses for a customer; the other is the set of addresses that have been used in orders. An address in the first can be updated and removed. An address in the second is immutable and cannot be removed except when the order it belongs to is removed. In this design, a reaction will have to copy address fields when a customer requests an order be sent to a previous address. This copying is necessary to preserve the independence of the two concepts and to allow their address records to be managed separately.
