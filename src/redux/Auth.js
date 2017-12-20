const Login = '登录';
const Logout = '退出';

export function auth(state={ isAuth:false,user:'admin' },action){
    console.log(state);
    switch(action.type){
        case Login:
            return { ...state, isAuth: true }
        case Logout:
            return { ...state, isAuth: false }
        default:
            return state
    }
}

// action creator
export function login() {
    return { type: Login }
}
export function logout() {
    return { type: Logout }
}