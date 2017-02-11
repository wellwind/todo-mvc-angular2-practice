import { EditMode } from './edit-mode';
import { DataService } from './data.service';
import { TodoItem } from './todo-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inputHint = 'What needs to be done?';

  todoText;
  todos: TodoItem[] = [];

  filterStatus;

  editMode: EditMode;

  constructor(private dataService: DataService) {
  }

  private updateTodos() {
    this.dataService
      .updateTodos(this.todos)
      .subscribe(todoItems => {
        this.todos = todoItems;
      });
  }

  private loadLocalEditMode() {
    const localEditMode = JSON.parse(localStorage.getItem('editMode'));
    if (localEditMode) {
      this.editMode = localEditMode;
    } else {
      this.resetEditMode();
    }
  }

  private resetEditMode() {
    this.editMode = {
      editId: null,
      editText: ''
    };
    this.saveTempEditingTodo();
  }

  ngOnInit() {
    this.loadLocalEditMode();

    this.filterStatus = 'All';

    this.dataService
      .loadTodos()
      .subscribe(todoItems => {
        this.todos = todoItems;
      });


  }

  addTodo() {
    const newTodoItem = { id: Math.max(...this.todos.map(todo => todo.id)) + 1, todoText: this.todoText, done: false };
    this.todos = [...this.todos, newTodoItem];
    this.todoText = '';
    this.updateTodos();
  }

  doneTodo(todoItem: TodoItem) {
    todoItem.done = !todoItem.done;
    this.updateTodos();
  }

  clearCompletedTodo() {
    this.todos = this.todos.filter(todo => !todo.done);
    this.updateTodos();
  }

  filterTodoStatus(status) {
    this.filterStatus = status;
  }

  completeAll() {
    this.todos.forEach(todo => {
      todo.done = true;
    });
    this.updateTodos();
  }

  deleteTodo(item: TodoItem) {
    this.todos.splice(this.todos.indexOf(item), 1);
    this.todos = [...this.todos];
    this.updateTodos();
  }

  enterEditItemMode(item: TodoItem) {
    this.editMode = {
      editId: item.id,
      editText: item.todoText
    };
  }

  updateTodoItem(todoItem: TodoItem) {
    todoItem.todoText = this.editMode.editText;
    this.updateTodos();
    this.resetEditMode();
  }

  saveTempEditingTodo() {
    localStorage.setItem('editMode', JSON.stringify(this.editMode));
  }

  cancelEditMode() {
    this.resetEditMode();
  }
}
