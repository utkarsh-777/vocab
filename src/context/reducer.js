import {WORD,REMOVE} from "./action.types";

export const initialState = null;

export const reducer = (state,action) => {
    switch(action.type){
        case WORD:
            return action.payload
        case REMOVE:
            return initialState
        default:
            return state
    }
}