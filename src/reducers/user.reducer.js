import { userConstants } from "../constants"


const initialState={
    users:[],
    conversation: []
}

export const userReducer = (state=initialState, action) =>{

    switch(action.type){
        case `${userConstants.GET_REALTIME_USERS}_REQUEST`:
            break;
        case `${userConstants.GET_REALTIME_USERS}_SUCCESS`:
            state={
                ...state,
                users: action.payload.users
            }
            break;
        case userConstants.GET_REAL_TIME_MESSAGES:
            state={
                ...state,
                conversation: action.payload.conversation
            }
            break;
        case `${userConstants.GET_REAL_TIME_MESSAGES}_FAILURE`:
            state={
                ...state,
                conversation: []
            } 
            break;   
        default:
            return state;
    }

    return state;
}