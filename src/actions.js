import apiCall from './apiCall'
import randomcolor from 'randomcolor'
import map from 'lodash/map'

export function fetchPostsWithRedux() {
    return (dispatch) => {
        dispatch(fetchPostsRequest());
        return fetchPosts().then((resp)=>{
            if(resp.length){
                let data = map(resp,item => {
                    item.pic_color = randomcolor({luminosity: 'dark'})
                    return item
                })
                dispatch(fetchPostsSuccess(data))
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
