# Goals Core

The "goals project" is sort of like a "todo" app with a twist. Instead of making
one-liner "to do" items and checking them off, you create goals in the form
of recurring items. E.g., a weekly goal might be to vacuum a rug while a daily
goal might be to brush your teeth.

## This Library

This serves as a library with the core data types for the project.
It is pretty much useless by itself and is intended to be used within a
project alongside a storage service to handle storing the data.

## Goals and Completions

Goals recur; for example, a weekly goal of "wash the dog" occurs every week.
Completions are the individual records of a goal's completion for a time
period. If "wash the dog" was completed last week as well as the week before,
there will be two completion records for it.

### Goals

The [GoalModel](src/goal-model.ts) has the following members:

#### title

The `string` title for the goal, e.g., "wash the dog".

#### occurs

The [GoalOccurrence](src/goal-model.ts) enum representing how the goal occurs.

#### dateAdded

The `Date` of the creation of the goal.

#### id

Unique id for the goal. Generally reserved for the storage service, you usually
shouldn't set this manually.

### Completions

The [CompletionModel](src/completion-model.ts) has the following members:

#### goal

The unique id for the goal that this completion is for.

#### id

The unique id for the completion record.

#### dateCompleted

The `Date` the completion record was created.

## Storage Services

This library does not contain a default storage service; that is the
responsibility of other projects. To enable developers writing UI/apps to have
a consistent API to work against, this project contains an [abstraction](src/index.ts) that
other projects should inherit from.

### getGoals

Returns all the goals.

### getGoalsByOccurrence

Returns all the goals with the given occurrence.

### getGoalById

Gets a specific goal.

### upsertGoal

Updates an existing goal or creates a new one if it does not exist.

### deleteGoal

Deletes the goal with the given id.

### toggleGoalCompletion

Sets/unsets a goal as completed.

### isGoalCompleted

Checks a goal's completion based on the goal's occurrence; for example, if a
goal has a completion for yesterday, but the `occurs` is `GoalOccurrence.Daily`,
the goal is not completed for today.

If a goal is completed, this returns a tuple of `true` and the id of the
completion (`[true, 42]`). If it is _not_ completed, a tuple of `false`
and `-1` is returned (`[false, -1]`).

### getGoalCompletions

Returns all the completion records for a goal.

### getGoalsWithCompleted

Returns all the goals as a tuple with the goal and whether that goal is
completed: `[GoalModel, boolean]`.

### Storage Projects

- [IndexedDB Storage](https://github.com/lxndrdagreat/goals-storage-indexeddb)
