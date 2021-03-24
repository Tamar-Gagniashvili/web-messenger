import { authConstanst } from "../constants"

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    authenticating: false,
    authenticated: false,
    error: null
}


 const reducer = (state=initialState, action ) => {
    console.log(action);
    switch(action.type){
        case `${authConstanst.USER_LOGIN}_REQUEST`:
            state={
                ...state,
                authenticating: true
            }
            break;
        case `${authConstanst.USER_LOGIN}_SUCCESS`:
            state={
                ...state,
                ...action.payload.user,
                authenticated: true,
                authenticating: false
            }
            break;
        case `${authConstanst.USER_LOGIN}_FAILURE`:
            state={
                ...state,
                authenticated: false,
                authenticating: false,
                error: action.payload.error
            }
            break;
        default:
            return state;
    }

    return state;
}

export default reducer;