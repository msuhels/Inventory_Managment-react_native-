import {SET_USER_DATA, SET_DASHBOARD_DATA} from "../constants/redux_constants"


export  function userData(state=[],action){
    switch(action.type){
        case SET_USER_DATA:
                return action.payload;
        default:
            return state
    }   
}

export  function dashboardData(state=null,action){
    switch(action.type){
        case SET_DASHBOARD_DATA:
                return action.payload;
        default:
            return state
    }   
}



