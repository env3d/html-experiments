# Introduction to Prolog

## Introduction

Prolog (programming in logic) is one of the most widely used programming languages in artificial intelligence research.  As opposed to imperative languages such as C or Java (which also happens to be object-oriented) it is a declarative programming language. That means, when implementing the solution to a problem, instead of specifying how to achieve a certain goal in a certain situation, we specify what the situation (rules and facts) and the goal (query) are and let the Prolog interpreter derive the solution for us. Prolog is very useful in some problem areas, such as artificial intelligence, natural language processing, databases, ..., but pretty useless in others, such as graphics or numerical algorithms.


By following this introduction, you will learn how to use Prolog as a programming language to solve practical problems in computer science and artificial intelligence. You will also learn how the Prolog interpreter actually works (at a very high level!).  You will also see the connection between logical argument and Prolog, and how systems like this can be used to perform data analysis.


## Prolog Terminologies

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
2. Scanning through the clauses of our program, Prolog tries to match mortal(socrates) with the first possible fact or head of rule. It finds mortal(X), the head of the first (and only) rule. When matching the two terms the instantia- tion X = socrates needs to be made.
3. The variable instantiation is extended to the body of the rule, i.e. man(X) becomes man(socrates).
4. The newly instantiated body becomes our new goal: man(socrates).
5. Prolog executes the new goal by again trying to match it with a rule-head or a fact. Obviously, the goal man(socrates) matches the fact man(socrates), because they are identical. This means the current goal succeeds.
6. This, again, means that also the initial goal succeeds.


## A more involved example

In the introduction it has been said that Prolog is a declarative (or descriptive) language. Programming in Prolog means describing the world. Using such programs means asking Prolog questions about the previously described world. The simplest way of describing the world is by stating facts, like this one:

```
bigger(elephant, horse).
```

This states, quite intuitively, the fact that an elephant is bigger than a horse. (Whether the world described by a Prolog program has anything to do with our real world is, of course, entirely up to the programmer.) Let’s add a few more facts to our little program:

```
bigger(elephant, horse).
bigger(horse, donkey).
bigger(donkey, dog).
bigger(donkey, monkey).
```

This is a syntactically correct program, and after having compiled it we can ask the Prolog system questions (or queries in proper Prolog-jargon) about it. Here’s an example:

```
Query: bigger(donkey, dog)
Result: Yes
```

The query bigger(donkey, dog) (i.e. the question “Is a donkey bigger than a dog?”) succeeds, because the fact bigger(donkey, dog) has previously been communicated to the Prolog system. Now, is a monkey bigger than an elephant?

```
Query: bigger(monkey, elephant).
Result: No
```

No, it’s not. We get exactly the answer we expected: the corresponding query, namely bigger(monkey, elephant) fails. But what happens when we ask the other way round?

```
Query: bigger(elephant, monkey).
Result: No
```

According to this elephants are not bigger than monkeys. This is clearly wrong as far as our real world is concerned, but if you check our little program again, you will find that it says nothing about the relationship between elephants and monkeys. Still, we know that if elephants are bigger than horses, which in turn are bigger than donkeys, which in turn are bigger than monkeys, then elephants also have to be bigger than monkeys. In mathematical terms: the bigger-relation is transitive. But this has also not been defined in our program. The correct interpretation of the negative answer Prolog has given is the following: from the information communicated to the system it cannot be proved that an elephant is bigger than a monkey.

If, however, we would like to get a positive reply for a query like bigger(elephant, monkey), we have to provide a more accurate description of the world. One way of doing this would be to add the remaining facts, like e.g. bigger(elephant, monkey), to our program. For our little example this would mean adding another 5 facts. Clearly too much work and probably not too clever anyway.

The far better solution would be to define a new relation, which we will call much_bigger:

```
much_bigger(X, Y) :- bigger(X, Z), bigger(Z, Y).
```

In this rule, :- means something like “if” and the comma between the two terms bigger(X, Z) and is_bigger(Z, Y) stands for “and”. X, Y, and Z are variables, which in Prolog is indicated by using capital letters.


The much_bigger relation is cool, but it only works for relationship that is one step removed.  A more general way of solving the problem is to create a the transitive closure (don’t worry if you don’t know what that means) of bigger. Animal X is bigger than animal Y either if this has been stated as a fact or if there is an animal Z for which it has been stated as a fact that animal X is bigger than animal Z and it can be shown that animal Z is bigger than animal Y. In Prolog such statements are called rules and are implemented like this:

```
is_bigger(X, Y) :- bigger(X, Y).
is_bigger(X, Y) :- bigger(X, Z), is_bigger(Z, Y).
```

Now we can use is_bigger to query any kind of bigger relationships.

You can think of the the bigger-facts as data someone has collected by browsing through the local zoo and comparing pairs of animals. The implementation of is_bigger, on the other hand, could have been provided by a knowledge engineer who may not know anything at all about animals, but understands the general concept of something being bigger than something else and thereby has the ability to formulate general rules regarding this relation. If from now on we use is_bigger instead of bigger in our queries, the program will work as intended:

```
Query: is_bigger(elephant, monkey)
Result: Yes
```

Prolog still cannot find the fact bigger(elephant, monkey) in its database, so it tries to use the second rule instead. This is done by matching the query with the head of the rule, which is is_bigger(X, Y). When doing so the two variables get instantiated: X = elephant and Y = monkey. The rule says that in order to prove the goal is_bigger(X, Y) (with the variable instantiations that’s equivalent to is_bigger(elephant, monkey)) Prolog has to prove the two subgoals bigger(X, Z) and is_bigger(Z, Y), again with the same variable instantiations. This process is repeated recursively until the facts that make up the chain between elephant and monkey are found and the query finally succeeds.

Of course, we can do slightly more exiting stuff than just asking yes/no-questions. Suppose we want to know, what animals are bigger than a donkey? The corresponding query would be:

```
Query: is_bigger(X, donkey)
```

Again, X is a variable. We could also have chosen any other name for it as long as it
starts with a capital letter.  What results do you see?

Horses are bigger than donkeys. The query has succeeded, but in order to allow it to succeed Prolog had to replace the variable X (a placeholder) with the value horse. Is horse the only answer?  What do you think Prolog is doing?

There are many more ways of querying the Prolog system about the contents of its database. As a final example we ask whether there is an animal X that is both smaller than a donkey and bigger than a monkey:

```
Query: is_bigger(donkey, X), is_bigger(X, monkey).
Result: No
```

The (correct) answer is No. Even though the two single queries is_bigger(donkey, X) and is_bigger(X, monkey) would both succeed when submitted on their own, their conjunction (represented by the comma) does not.

*Challenge:* Could you come up with a query that reports all animals between the size of an elephant and dog?

## Exercise 1

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

## Exercise 2

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

