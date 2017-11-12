declare namespace TodoApp {
    export interface Item {
        id?: string;
        text?: string;
        completed?: boolean;
    }

    export type Filter = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED';

    export interface State {
        filter: Filter;
        items: Item[];
    }
}
