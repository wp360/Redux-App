import { setTimeout } from "timers";

const ADD_Num = '增加数量';
const REDUCE_Num = '减少数量';
//通过reducer建立
export function counter(state = 10, action) {
    switch (action.type) {
        case ADD_Num:
            return state + 1
        case REDUCE_Num:
            return state - 1
        default:
            return state
    }
}

//action creator
export function add(){
    return { type: ADD_Num };
}
export function reduce() {
    return { type: REDUCE_Num };
}
export function addAsync(){
    return dispatch =>{
        setTimeout(()=>{
            dispatch(add());
        },2000);
    };
}