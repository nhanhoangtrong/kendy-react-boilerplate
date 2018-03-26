import * as React from 'react';
import TodoItemContainer from '../../modules/TodoApp/TodoItem';
import * as styles from './style.styl';
import InputTodo from '../InputTodo';
import { TodoListProps } from '../../modules/TodoApp/TodoList';

export default class TodoList extends React.Component<TodoListProps> {
    constructor(props?: TodoListProps, context?: any) {
        super(props, context);
        this.handleAddTodo = this.handleAddTodo.bind(this);
    }

    public render() {
        return (
            <ul className={styles.todoList}>
                {this.props.todos.map((todo, i) => {
                    return <TodoItemContainer key={todo.id} todo={todo} />;
                })}
                <li>
                    <InputTodo
                        onSave={this.handleAddTodo}
                        placeholder="Input todo text"
                    />
                </li>
            </ul>
        );
    }

    private handleAddTodo(text: string) {
        this.props.addTodo({ text });
    }
}
