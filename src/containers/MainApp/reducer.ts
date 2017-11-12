import { TOGGLE_LOADING } from './constants';

const initialState: MainApp.State = {
    isLoading: false,
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case TOGGLE_LOADING:
            return {
                ...state,
                isLoading: !state.isLoading,
            };
        default:
            return state;
    }
};
