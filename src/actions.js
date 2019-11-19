import apiCall from './apiCall'


export function fetchPostsWithRedux() {
    return (dispatch) => {
        dispatch(fetchPostsRequest());
        return fetchPosts().then((resp)=>{
            if(resp.result.length){
                dispatch(fetchPostsSuccess(resp.result))
            }
        })
    }
}

function fetchPosts() {
    return apiCall('getUsers')
}


function fetchPostsRequest(){
    return {
        type: "FETCH_REQUEST"
    }
}

function fetchPostsSuccess(payload) {
    return {
        type: "FETCH_SUCCESS",
        users:payload
    }
}
