import * as path from 'path';
import * as fs from 'fs';
import { parseCsv } from '../parse-csv';
import { Expense } from '../expense';

describe('parseCsv', () => {
  it('should parse expense from csv', () => {
    const csv = fs.readFileSync(path.join(__dirname, './fixtures/book.csv'), {
      encoding: 'utf8',
    });
    const expenses = parseCsv(csv);
    expect(expenses).toEqual([
      new Expense({
        amount: 0.76,
        date: new Date('2021-10-01'),
        tags: [
          {
            color: '#000000',
            name: 'steam',
          },
          {
            color: '#000000',
            name: '游戏',
          },
          {
            color: '#000000',
            name: '玩',
          },
        ],
      }),
      new Expense({
        amount: 3.5,
        date: new Date('2021-10-02'),
        tags: [
          {
            color: '#000000',
            name: '超市',
          },
          {
            color: '#000000',
            name: '食',
          },
          {
            color: '#000000',
            name: '亚超',
          },
        ],
      }),
      new Expense({
        amount: 17.15,
        date: new Date('2021-11-01'),
        tags: [
          {
            color: '#000000',
            name: 'steam',
          },
          {
            color: '#000000',
            name: '游戏',
          },
          {
            color: '#000000',
            name: '玩',
          },
        ],
      }),
      new Expense({
        amount: 8.68,
        date: new Date('2021-11-02'),
        description: undefined,
        tags: [
          {
            color: '#000000',
            name: 'steam',
          },
          {
            color: '#000000',
            name: '游戏',
          },
          {
            color: '#000000',
            name: '玩',
          },
        ],
      }),
      new Expense({
        amount: 10.41,
        date: new Date('2021-11-30'),
        tags: [
          {
            color: '#000000',
            name: '交通',
          },
          {
            color: '#000000',
            name: '行',
          },
          {
            color: '#000000',
            name: '工作',
          },
        ],
      }),
      new Expense({
        amount: 7.58,
        date: new Date('2021-12-01'),
        tags: [
          {
            color: '#000000',
            name: '交通',
          },
          {
            color: '#000000',
            name: '行',
          },
          {
            color: '#000000',
            name: '工作',
          },
        ],
      }),
      new Expense({
        amount: 6.26,
        date: new Date('2021-12-01'),
        tags: [
          {
            color: '#000000',
            name: '超市',
          },
          {
            color: '#000000',
            name: '食',
          },
        ],
      }),
    ]);
  });
});
