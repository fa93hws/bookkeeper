import { Expense } from './expense';
import * as csvParser from 'papaparse';
import type { Tag } from './tag';

function selectColor(colorNum: number, colors: number) {
  if (colors < 1) colors = 1; // defaults to one color - avoid divide by zero
  return 'hsl(' + ((colorNum * (360 / colors)) % 360) + ',100%,50%)';
}

function generateColor(expenses: Expense[]) {
  const tags = expenses
    .map((expense) => expense.tags)
    .flat()
    .map((t) => t.name);
  const uniqueTags = [...new Set(tags)];
  const colorMap: Record<string, string> = {};
  uniqueTags.forEach((tag, i) => {
    colorMap[tag] = selectColor(i, uniqueTags.length);
  });
  expenses.forEach((expense) => {
    expense.tags.forEach((tag) => {
      tag.color = colorMap[tag.name];
    });
  });
}

export function parseCsv(csv: string, autoGenerateColor?: boolean): Expense[] {
  const csvResult = csvParser.parse<(string | number)[]>(csv, {
    dynamicTyping: true,
  });
  if (csvResult.errors.length > 0) {
    throw new Error(`Error parsing CSV: ${csvResult.errors}`);
  }
  const { data } = csvResult;
  const headers = data.shift();
  if (headers == null) {
    throw new Error('csv is empty!');
  }
  const dateIdxs: number[] = [];
  const priceIdxs: number[] = [];
  const tagsIdxs: number[] = [];
  headers.forEach((header, idx) => {
    if (header === 'Date') {
      dateIdxs.push(idx);
    } else if (header === 'Price') {
      priceIdxs.push(idx);
    } else if (header === 'Tags') {
      tagsIdxs.push(idx);
    }
  });
  if (
    dateIdxs.length !== priceIdxs.length ||
    dateIdxs.length !== tagsIdxs.length
  ) {
    throw new Error('Should have same amount of date, price and tags');
  } else if (dateIdxs.length === 0) {
    throw new Error('no data is found');
  }

  const expenses: Expense[] = [];
  for (let rowNumber = 0; rowNumber < data.length; rowNumber++) {
    const row = data[rowNumber];
    if (row.every((cell) => cell == null)) {
      break;
    }
    for (let i = 0; i < dateIdxs.length; i++) {
      const date = row[dateIdxs[i]];
      const price = row[priceIdxs[i]];
      const tags = row[tagsIdxs[i]];
      if (date == null && price == null && tags == null) {
        continue;
      }
      if (typeof date !== 'string') {
        throw new Error(
          `expect date to be string, but got ${date} at (${rowNumber}, ${dateIdxs[i]})`,
        );
      }
      if (typeof price !== 'number') {
        throw new Error(
          `expect price to be number, but got ${price} at (${rowNumber}, ${priceIdxs[i]})`,
        );
      }
      if (typeof tags !== 'string') {
        throw new Error(
          `expect tags to be string, but got ${tags} at (${rowNumber}, ${tagsIdxs[i]})`,
        );
      }
      const tagsArray: Tag[] = tags
        .split(';')
        .filter((t) => t.length > 0)
        .map((t) => ({
          name: t,
          color: '#000000',
        }));
      expenses.push(
        new Expense({
          date: new Date(date),
          amount: price,
          tags: tagsArray,
        }),
      );
    }
  }

  expenses.sort((a, b) => a.date.getTime() - b.date.getTime());
  autoGenerateColor && generateColor(expenses);
  return expenses;
}
