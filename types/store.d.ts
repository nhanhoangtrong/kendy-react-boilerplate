declare namespace ImmutableType {
    export interface Map<T> {
        get<K extends keyof T>(name: K): T[K];
        set<K extends keyof T>(name: K, value: T[K]): Map<T>;
    }
    
}

declare type TodoStoreState = TodoItemData[];

declare interface GlobalState {
    filter: TodoFilterType;
    isLoading: boolean;
}

declare type GlobalStoreState = ImmutableType.Map<GlobalState>;
