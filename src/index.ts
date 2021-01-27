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

export async function generateTestData(storageService: GoalStorageService): Promise<void> {
  // Create some daily and weekly goals
  const dailies: GoalUpsertData[] = [];
  const weeklies: GoalUpsertData[] = [];
  const titles = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Xi',];
  for (let i = 0; i < 5; ++i) {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    date.setMonth(date.getMonth() + i);
    dailies.push({
      title: titles.pop() as string,
      dateAdded: date,
      occurs: GoalOccurrence.Daily
    });
    weeklies.push({
      title: titles.pop() as string,
      dateAdded: date,
      occurs: GoalOccurrence.Weekly
    });
  }

  const goals = await Promise.all([
    ...dailies.map(daily => storageService.upsertGoal(daily)),
    ...weeklies.map(weekly => storageService.upsertGoal(weekly))
  ]);

  // create daily completions
  let count = 0;
  for (const goal of goals.filter(goal => goal.occursDaily)) {
    for (let i = 1; i < 14 - count; ++i) {
      let date = new Date();
      date.setDate(date.getDate() - i);
      await storageService.toggleGoalCompletion(goal.id, date);
    }
    count += 2;
  }

  // create weekly completions
  count = 0;
  for (const goal of goals.filter(goal => goal.occursWeekly)) {
    for (let i = 1; i < 6 - count; ++i) {
      let date = new Date();
      date.setDate(date.getDate() - (i * 7));
      await storageService.toggleGoalCompletion(goal.id, date);
    }
    count += 1;
  }
}
