import { TodoMvcAngular2PracticePage } from './app.po';

describe('todo-mvc-angular2-practice App', function() {
  let page: TodoMvcAngular2PracticePage;

  beforeEach(() => {
    page = new TodoMvcAngular2PracticePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
