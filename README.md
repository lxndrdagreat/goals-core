# Goals Core

This serves as a library with the core data types for the Goals project.
It is pretty much useless by itself; its intended use is to use it within a
project alongside a storage service to handle storing the data.

## Storage Services

This library does not contain a default storage service; that is the
responsibility of other projects. To enable developers writing UI/apps to have
a consistent API to work against, this project contains an [abstraction](src/index.ts) that
other projects should inherit from.

```typescript
export abstract class GoalStorageService {

  abstract getGoalsWithOccurrence(occurrence: GoalOccurrence): Promise<GoalModel[]>;
  abstract getGoalWithId(goalId: number): Promise<GoalModel>;
  abstract upsertGoal(goalData: GoalUpsertData): Promise<GoalModel>;
  abstract deleteGoal(goalId: number): Promise<void>;
  abstract toggleGoalCompletion(goalId: number, completionDate: Date): Promise<boolean>;
  abstract isGoalCompleted(goalId: number): Promise<[boolean, number]>;
  abstract getGoalCompletions(goalId: number): Promise<CompletionModel[]>;
}
```

### Storage Projects

- IndexedDB Storage
