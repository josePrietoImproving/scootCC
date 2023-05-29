import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { liveQuery } from 'dexie';
import { Database, db } from '../db';
import { todoItem } from '../models';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todoList: todoItem[] = [];
  descriptionQuery: string = '';
  priorityQuery: number | null = null;

  constructor() {
    liveQuery(() => db.todoItems.toArray()).subscribe((items) => {
      this.todoList = items;
    });
  }
  findItems() {
    let queryObj: any = {};
    if (this.descriptionQuery != '')
      queryObj.description = this.descriptionQuery;
    if (this.priorityQuery != null) queryObj.priority = this.priorityQuery;

    db.todoItems
      .filter((item) => item.description.includes(this.descriptionQuery))
      .toArray()
      .then((filteredItems) => (this.todoList = filteredItems));
  }
}
