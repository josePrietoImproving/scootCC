import { Dexie } from 'dexie';
import { todoItem } from './models';

// Database handles all database interactions for the web app.

export class Database extends Dexie {
  public todoItems!: Dexie.Table<todoItem, number>;

  constructor() {
    super('my_db');
    var db = this;
    this.version(1).stores({
      todoItems: '++id, description, dueDate, priority',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    await db.todoItems.bulkAdd([
      {
        description: 'The quick brown fox ',
        dueDate: new Date(),
        priority: 1,
      },
      {
        description: 'jumped over the lazy dog',
        dueDate: new Date(),
        priority: 2,
      },
      {
        description: 'Lorem ipsum sir dolor at ',
        dueDate: new Date(),
        priority: 3,
      },
    ]);
  }
}

export var db = new Database();
