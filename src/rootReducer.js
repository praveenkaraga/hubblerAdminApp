const initialState = {
    users:[],
    loading:true
}


const rootReducer = (state = initialState,action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return {...state,loading:true};
        case "FETCH_SUCCESS":
            return {...state, users: action.users,loading:false};
        default:
            return state;
    }
}

export default rootReducer