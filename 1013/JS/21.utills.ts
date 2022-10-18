{
  type ToDo = {
    title: string;
    context: string;
    label: string;
    priority: 'high' | 'low';
  };
  // 수정 불가하다 
  function display(todo: Readonly<ToDo>) {
    // todo.title = '할일 수정 ';
  }

  function updateTodo(todo: ToDo, fieldsToUpdate: Partial<ToDo>): ToDo {
    return { ...todo, ...fieldsToUpdate };
  }
  const todo: ToDo = {
    title: '타입스크립트 복습',
    context: '어렵다 ',
    label: '공부',
    priority: 'high',
  };
  const updated = updateTodo(todo, { priority: 'low' });
  console.log(updated);


  type ToDoSimple = Pick<ToDo, 'title' | 'priority'>;

  function getTodo(title: string): ToDo {
    return {
      title: title,
      context: '내용...',
      label: '공부',
      priority: 'high',
    };
  }
  function getSimpleTodo(title: string): ToDoSimple {
    return {
      title: title,
      priority: 'high',
    };
  }

  type ToDoSimple2 = Omit<ToDo, 'context' | 'label'>;

  function getSimpleTodo2(title: string): ToDoSimple {
    return {
      title: title,
      priority: 'high',
    };
  }

  type PageInfo = {
    title: string;
  };
  type Page = 'home' | 'about' | 'contact';


  const nav: Record<Page, PageInfo> = {
    home: { title: 'Home' },
    about: { title: 'About' },
    contact: { title: 'Contact' },
  };


}
