import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inputHint = "What needs to be done?";

  todoText;
  todos: any[];

  ngOnInit() {
    this.todos = [];
  }

  addTodo(){
    this.todos.push(this.todoText);
    console.log(this.todos);
  }
}
