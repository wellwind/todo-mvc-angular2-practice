import { TodoItem } from './../todo-item';
import { Output, Input, Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() todos: TodoItem[];
  @Input() currentFilterStatus: string;
  @Output() clearCompletedTodo = new EventEmitter<any>();
  @Output() filterTodoStatus = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  clearCompletedTodoEvent() {
    this.clearCompletedTodo.emit();
  }

  filterStatus(status) {
    this.filterTodoStatus.emit(status);
  }
}
