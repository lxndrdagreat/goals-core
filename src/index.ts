import {GoalModel, GoalOccurrence} from './goal-model';
import {CompletionModel} from './completion-model';

export * from './goal-model';
export * from './completion-model';

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

export abstract class GoalStorageService {

  abstract getGoalsWithOccurrence(occurrence: GoalOccurrence): Promise<GoalModel[]>;
  abstract getGoalWithId(goalId: number): Promise<GoalModel>;
  abstract upsertGoal(goalData: GoalUpsertData): Promise<GoalModel>;
  abstract deleteGoal(goalId: number): Promise<void>;
  abstract toggleGoalCompletion(goalId: number, completionDate: Date): Promise<boolean>;
  abstract isGoalCompleted(goalId: number): Promise<[boolean, number]>;
  abstract getGoalCompletions(goalId: number): Promise<CompletionModel[]>;
}
