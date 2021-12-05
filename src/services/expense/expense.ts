import type { Tag } from './tag';

export interface IExpense {
  // At what day this expense is spent
  date: Date;
  // date as yy-mm-dd format
  dateAsYYMMDD: string;
  // How much is spent
  amount: number;
  // tags of the expense
  tags: Tag[];
  // description of the expense
  description?: string;
}

export class Expense implements IExpense {
  public date: Date;
  public amount: number;
  public tags: Tag[];
  public description?: string;
  constructor({
    date,
    amount,
    tags,
    description,
  }: {
    date: Date;
    amount: number;
    tags: Tag[];
    description?: string;
  }) {
    this.date = date;
    this.amount = amount;
    this.tags = tags;
    this.description = description;
  }

  get dateAsYYMMDD(): string {
    return this.date.toISOString().slice(0, 10);
  }
}
