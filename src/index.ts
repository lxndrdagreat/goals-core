import {GoalModel, GoalOccurrence} from './goal-model';
import {CompletionModel} from './completion-model';

export * from './goal-model';
export * from './completion-model';
export * from './date-utils';

export class GoalNotFoundError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export interface GoalUpsertData {
  id?: number;
  title: string;
  dateAdded: Date;
  occurs: number;
}

export interface GoalCompletionScore {
  rate: number;
  completions: number;
  possible: number;
}

export abstract class GoalStorageService {

  abstract getGoals(): Promise<GoalModel[]>;

  abstract getGoalsByOccurrence(occurrence: GoalOccurrence): Promise<GoalModel[]>;

  abstract getGoalById(goalId: number): Promise<GoalModel>;

  abstract upsertGoal(goalData: GoalUpsertData): Promise<GoalModel>;

  abstract deleteGoal(goalId: number): Promise<void>;

  abstract toggleGoalCompletion(goalId: number, completionDate: Date): Promise<boolean>;

  abstract isGoalCompleted(goalId: number): Promise<[false, -1] | [true, number]>;

  abstract getGoalCompletions(goalId: number): Promise<CompletionModel[]>;

  abstract getGoalsWithCompleted(): Promise<[GoalModel, boolean][]>;

  abstract getGoalCompletionScore(goal: GoalModel): Promise<GoalCompletionScore>;
}
