const ADD_Num = '增加数量';
const REDUCE_Num = '减少数量';
//通过reducer建立
export function counter(state = 0, action) {
    switch (action.type) {
        case ADD_Num:
            return state + 1
        case REDUCE_Num:
            return state - 1
        default:
            return 10
    }
}

//action creator
export function add(){
    return { type: ADD_Num };
}
export function reduce() {
    return { type: REDUCE_Num };
}
