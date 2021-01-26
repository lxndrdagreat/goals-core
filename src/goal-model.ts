export enum GoalOccurrence {
  Yearly,
  Monthly,
  Weekly,
  Daily,
  Sundays = 4 << 0,
  Mondays = 4 << 1,
  Tuesdays = 4 << 2,
  Wednesdays = 4 << 3,
  Thursdays = 4 << 4,
  Fridays = 4 << 5,
  Saturdays = 4 << 6
}

export class GoalModel {

  constructor(
    readonly title: string,
    readonly occurs: GoalOccurrence,
    readonly dateAdded: Date,
    readonly id: number
  ) {
  }

  static fromJSON(data: Record<string, string | number | Date>): GoalModel {
    if (!data.hasOwnProperty('title')) {
      throw new Error('Cannot create GoalModel from JSON: title is required.');
    }
    if (!data.hasOwnProperty('occurs')) {
      throw new Error('Cannot create GoalModel from JSON: occurs is required.');
    }
    if (!data.hasOwnProperty('dateAdded')) {
      throw new Error('Cannot create GoalModel from JSON: dateAdded is required.');
    }
    if (!data.hasOwnProperty('id')) {
      throw new Error('Cannot create GoalModel from JSON: id is required.');
    }
    return new GoalModel(
      data['title'] as string,
      data['occurs'] as GoalOccurrence,
      new Date(data['dateAdded']),
      data['id'] as number
    );
  }

  copyWith(changes: { title?: string, occurs?: GoalOccurrence, dateAdded?: Date, id?: number }): GoalModel {
    return new GoalModel(
      changes.title || this.title,
      changes.occurs || this.occurs,
      changes.dateAdded || this.dateAdded,
      changes.id || this.id
    );
  }

  get occursToday(): boolean {
    // Sunday === 0 in JS
    const today = 4 << new Date().getDay();
    return (this.occurs & today) === today;
  }

  get occursWeekly(): boolean {
    return this.occurs === GoalOccurrence.Weekly;
  }

  get occursDaily(): boolean {
    return this.occurs === GoalOccurrence.Daily;
  }

  get occursYearly(): boolean {
    return this.occurs === GoalOccurrence.Yearly;
  }

  get occursMonthly(): boolean {
    return this.occurs === GoalOccurrence.Monthly;
  }

  get occursSundays(): boolean {
    return (this.occurs & GoalOccurrence.Sundays) === GoalOccurrence.Sundays;
  }

  get occursMondays(): boolean {
    return (this.occurs & GoalOccurrence.Mondays) === GoalOccurrence.Mondays;
  }

  get occursTuesdays(): boolean {
    return (this.occurs & GoalOccurrence.Tuesdays) === GoalOccurrence.Tuesdays;
  }

  get occursWednesdays(): boolean {
    return (this.occurs & GoalOccurrence.Wednesdays) === GoalOccurrence.Wednesdays;
  }

  get occursThursdays(): boolean {
    return (this.occurs & GoalOccurrence.Thursdays) === GoalOccurrence.Thursdays;
  }

  get occursFridays(): boolean {
    return (this.occurs & GoalOccurrence.Fridays) === GoalOccurrence.Fridays;
  }

  get occursSaturdays(): boolean {
    return (this.occurs & GoalOccurrence.Saturdays) === GoalOccurrence.Saturdays;
  }

  hasOccurred(date: Date): boolean {
    // TODO: handle other cases
    if (this.occursDaily) {
      const dayStart = new Date();
      dayStart.setHours(0);
      dayStart.setMinutes(0);
      dayStart.setSeconds(0);
      return dayStart.getTime() <= date.getTime();
    } else if (this.occursWeekly) {
      const weekStart = new Date();
      weekStart.setHours(0);
      weekStart.setMinutes(0);
      weekStart.setSeconds(0);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      return weekStart.getTime() <= date.getTime();
    } else {
      return false;
    }
  }
}
