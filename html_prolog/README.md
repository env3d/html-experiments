# Introduction to Prolog

## Introduction

Prolog (programming in logic) is one of the most widely used programming languages in artificial intelligence research.  As opposed to imperative languages such as C or Java (which also happens to be object-oriented) it is a declarative programming language. That means, when implementing the solution to a problem, instead of specifying how to achieve a certain goal in a certain situation, we specify what the situation (rules and facts) and the goal (query) are and let the Prolog interpreter derive the solution for us. Prolog is very useful in some problem areas, such as artificial intelligence, natural language processing, databases, ..., but pretty useless in others, such as graphics or numerical algorithms.


By following this introduction, you will learn how to use Prolog as a programming language to solve practical problems in computer science and artificial intelligence. You will also learn how the Prolog interpreter actually works (at a very high level!).  You will also see the connection between logical argument and Prolog, and how systems like this can be used to perform data analysis.


## Prolog Basics

For the purpose of our short Prolog discussion, we only need to know a few terminologies. 

*Fact* - A fact in Prolog simply states the data of our world.  For example:

```
man(adam).
```

States the fact that adam is a man.  The world adam is called an atom in Prolog.  Atoms are basically names that represents an entity and must starts with a lower case letter.  Each fact ends with a period (.) in Prolog.

Another way to think about this is that *adam* is a thing in our prolog universe, and *man* is a label or classification for adam.

Question: Is the following a valid Prolog fact?

```
man(eve).
```
*Query* - After entering all valid facts, a Prolog program is run by submitting queries in the query textbox. A query has the same structure as fact. Let's start with the following set of facts, describing the relationships between people::

```
man(alex).
man(joe).
man(jason).
man(joseph).
woman(sally).
woman(liz).
woman(ann).
woman(mary).
moron(alex).
moron(sally).
friend(jason, joseph).
friend(jason, alex).
friend(jason, ann).
friend(joseph, sally).
friend(joseph, mary).
friend(sally, liz).
friend(joe, mary).
```

The query `man(joseph).` would result in true, since `man(joseph)` exists in our list of facts.
The query `man(X).` would result in

```
X = alex
X = joe
X = jason
X = joseph
```

The above is an example of using a prolog *variabe*, you can think of a variable as a wildcard that matches anything.
Any uppercase letter inside a query would classify as a variable.  

Create queries for the following:

 1. Check if jason is a man
 1. Check if liz is a man
 1. Check if jason and liz are friends
 1. Retrieve all women
 1. Retrieve all of joseph's friends
 1. Retrieve all of jason's frields who is also a moron

### Exercise 1

The following rules are generated from imdb

```
actor(amy).
actor(benedict).
actor(chris).
actor(jenna).
actor(john).
actor(keira).
actor(robert).
actor(scarlett).
actor(steve).
movie(a_quiet_place).
movie(atonement).
movie(august__osage_county).
movie(baby_mama).
movie(christopher_robin).
movie(dangerous_matrimony).
movie(doctor_strange).
movie(end_of_the_road).
movie(foxcatcher).
movie(guardians_of_the_galaxy).
movie(her).
movie(inside_out).
movie(iron_man).
movie(iron_man_3).
movie(it_s_complicated).
movie(jurassic_world).
movie(levelland).
movie(little_miss_sunshine).
movie(lost_in_translation).
movie(motorcycle).
movie(peter_and_john).
movie(pirates_of_the_caribbean__the_curse_of_the_black_pearl).
movie(pride___prejudice).
movie(sherlock_holmes).
movie(slither).
movie(something_borrowed).
movie(star_trek_into_darkness).
movie(the_40_year_old_virgin).
movie(the_avengers).
movie(the_detective).
movie(the_giant_mechanical_man).
movie(the_imitation_game).
movie(the_lego_movie).
movie(under_the_skin).
movie(walk_hard__the_dewey_cox_story).
short(cocktail_muerte).
short(grand_union_canal).
short(the_corpse_wore_white).
short(the_shallows).
starred(amy,baby_mama).
starred(amy,inside_out).
starred(amy,parks_and_recreation).
starred(amy,saturday_night_live).
starred(benedict,august__osage_county).
starred(benedict,doctor_strange).
starred(benedict,star_trek_into_darkness).
starred(benedict,the_imitation_game).
starred(chris,auto).
starred(chris,christopher_robin).
starred(chris,cocktail_muerte).
starred(chris,dangerous_matrimony).
starred(chris,end_of_the_road).
starred(chris,grand_union_canal).
starred(chris,guardians_of_the_galaxy).
starred(chris,joy_and_the_apocalypse).
starred(chris,jurassic_world).
starred(chris,levelland).
starred(chris,linda_calise__suit___tie_feat._frankie_rossi).
starred(chris,maternal_instinct).
starred(chris,modern_marvels).
starred(chris,motorcycle).
starred(chris,parks_and_recreation).
starred(chris,peter_and_john).
starred(chris,the_casting_call).
starred(chris,the_corpse_wore_white).
starred(chris,the_detective).
starred(chris,the_lego_movie).
starred(chris,the_shallows).
starred(jenna,slither).
starred(jenna,snugglepuff).
starred(jenna,the_giant_mechanical_man).
starred(jenna,the_office).
starred(jenna,walk_hard__the_dewey_cox_story).
starred(john,a_quiet_place).
starred(john,it_s_complicated).
starred(john,something_borrowed).
starred(john,the_office).
starred(keira,atonement).
starred(keira,pirates_of_the_caribbean__the_curse_of_the_black_pearl).
starred(keira,pride___prejudice).
starred(keira,the_imitation_game).
starred(robert,iron_man).
starred(robert,iron_man_3).
starred(robert,sherlock_holmes).
starred(robert,the_avengers).
starred(scarlett,her).
starred(scarlett,lost_in_translation).
starred(scarlett,the_avengers).
starred(scarlett,under_the_skin).
starred(steve,foxcatcher).
starred(steve,little_miss_sunshine).
starred(steve,the_40_year_old_virgin).
starred(steve,the_office).
tvmovie(joy_and_the_apocalypse).
tvmovie(maternal_instinct).
tvseries(modern_marvels).
tvseries(parks_and_recreation).
tvseries(saturday_night_live).
tvseries(the_casting_call).
tvseries(the_office).
video(auto).
video(linda_calise__suit___tie_feat._frankie_rossi).
video(snugglepuff).
```

Create the following queries:

 1. Find out if the_casting_call is a movie
 1. Find out who starred in the_casting_call
 1. Find all actors
 1. Find all actors that have starred in the_office
 1. Find all movies that steve had starred in
 1. Find all movie actors (alternatively find all tv actors, etc.)
 1. Find all actors that have worked on a show with chris


## Prolog Rules

*Rules* - A rule consists of a head (a predicate) and a body. (a sequence of predicates separated by commas). Head and body are separated by the sign :- and, like every Prolog expression, a rule has to be terminated by a dot. Examples:

```
is_smaller(X, Y) :- is_bigger(Y, X).
aunt(X, Z) :- sister(X, Y), parent(Y, Z).
```

The intuitive meaning of a rule is that the goal expressed by its head is true, if we (or rather the Prolog system) can show that all of the expressions (subgoals) in the rule’s body are true.

*Query* - After entering all valid facts and rules, a Prolog program is run by submitting queries in the query textbox. A query has the same structure as the body of a rule, i.e. it is a sequence of predicates separated by commas and (optionally) terminated by a dot.  Examples:

```
Query: is_bigger(elephant, donkey).
Query: small(X), green(X), slimy(X).
```

Intuitively, when submitting a query like the last example, we ask Prolog whether all its predicates are provably true, or in other words whether there is an X such that small(X), green(X), and slimy(X) are all true.

*Variables* - You have seen these already, they are the X, Y, Parent, etc. in the previous examples.  Think of variables as placeholders when defining your rules and queries.  Variables are what make the Prolog system "intelligent".  Think of variables as the placeholders that we used in the general form of a logical argument.

# Answering Queries

We shall exemplify the process of the Prolog query engine by means of the following famous argument:

```
Premise 1: All men are mortal.
Premise 2: Socrates is a man.
Conculsion: Socrates is mortal.
```

In Prolog terms, the first statement represents a rule: X is mortal, if X is a man (for all X). The second one constitutes a fact: Socrates is a man. This can be implemented in Prolog as follows:

```
mortal(X) :- man(X).
man(socrates).
```

Note that X is a variable, whereas socrates is an atom. The conclusion of the argument, “Socrates is mortal”, can be expressed through the query mortal(socrates). After having entered the above rules and facts, we can submit this query to Prolog, which will cause the following reaction:

```
Query: mortal(socrates).
Yes
```

Prolog agrees with our own logical reasoning. Which is nice. But how did it come to its conclusion? Let’s follow the goal execution step by step.

1. The query mortal(socrates) is made the initial goal.
2. Scanning through the clauses of our program, Prolog tries to match mortal(socrates) with the first possible fact or head of rule. It finds mortal(X), the head of the first (and only) rule. When matching the two terms the instantiation X = socrates needs to be made.
3. The variable instantiation is extended to the body of the rule, i.e. man(X) becomes man(socrates).
4. The newly instantiated body becomes our new goal: man(socrates).
5. Prolog executes the new goal by again trying to match it with a rule-head or a fact. Obviously, the goal man(socrates) matches the fact man(socrates), because they are identical. This means the current goal succeeds.
6. This, again, means that also the initial goal succeeds.


## A more involved example

In the introduction it has been said that Prolog is a declarative (or descriptive) language. Programming in Prolog means describing the world. Using such programs means asking Prolog questions about the previously described world. The simplest way of describing the world is by stating facts, like this one:

```
small(dog).
small(monkey).
medium(horse).
large(elephant).
```

This states, quite intuitively, that our world divides animals into 3 different sizes: small, medium, and large.

However, these facts are just symbols to prolog, and have no human meanings associated with it.  To create some meaning, we can write the following rule:

```
bigger(X, Y) :- medium(X), small(Y).
```

The above rule suggest that a for X to be bigger than Y, X has to be a medium animal and Y has to be a small animal.

Try to come up with the following:

 1. Using the above rule only, write a query that finds all animals bigger than a dog
 1. Come up with a set of rules that captures the relationships between all sizes of animals


### Exercise 2

Draw the family tree corresponding to the following Prolog program:

```
female(mary).
female(sandra).
female(juliet).
female(lisa).
male(peter).
male(paul).
male(dick).
male(bob).
male(harry).
parent(bob, lisa).
parent(bob, paul).
parent(bob, mary).
parent(juliet, lisa).
parent(juliet, paul).
parent(juliet, mary).
parent(peter, harry).
parent(lisa, harry).
parent(mary, dick).
parent(mary, sandra).
```

After having copied the given program, define new rules (in terms of rules using male/1, female/1 and parent/2) for the following family relations:

1. father
2. sister
3. grandmother
4. cousin

You may want to use the operator neq/2 relation, which stands for NOT EQUAL. A query neq(X,Y) will match if and only if X and Y are not the same.  The opposite of neq/2 is eq/2.

Example: X is the brother of Y, if they have a parent Z in common and if X is male and if X and Y don’t represent the same person. In Prolog this can be expressed through the following rule:

```
brother(X, Y) :- parent(Z, X), parent(Z, Y), male(X), neq(X,Y).
```

