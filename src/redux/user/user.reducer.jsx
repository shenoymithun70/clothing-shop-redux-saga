import UserActionTypes from './user.types.js'

const INITIAL_STATE = {
    currentUser: null,
    error: null,
} 


const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            };
        case UserActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        
        default:
            return state;
    }
}

export default userReducer;

