import { TodoItem } from './todo-item';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTodos'
})
export class FilterTodosPipe implements PipeTransform {

  transform(todos: TodoItem[], filterStatus?: string): any {
    const state = filterStatus || 'All';
    let result = todos;
    switch (filterStatus) {
      case 'Active':
        result = todos.filter(todo => !todo.done);
        break;
      case 'Completed':
        result = todos.filter(todo => todo.done);
        break;
    }
    return result;
  }

}
