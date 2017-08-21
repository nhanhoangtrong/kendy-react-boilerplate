/* Declare TodoItem model */
declare interface TodoItemData {
    id?: TodoItemId;
    text?: string;
    completed?: boolean;
}

declare type TodoItemId = string;

declare type TodoFilterType = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED';
