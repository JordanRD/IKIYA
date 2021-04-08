const INITIAL = {
    id_user: null,
    username: '',
    id_status: null,
    id_role: null,
    profile_picture:'',
    address: [],
    cart: [],
    wishlist:[],
    email:''
}


export default function userReducer(state = INITIAL, { type, payload }) {
    switch (type) {
        case 'LOG_IN':
            return {
                ...state,
                ...payload
            }
        case 'LOG_OUT':
            localStorage.clear()
            sessionStorage.clear()
            return INITIAL
        default:
            return state
    }
}