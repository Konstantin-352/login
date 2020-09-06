import ServerRequest from "../components/serverRequest/ServerRequest";

export const SET_TOKEN = 'SET_TOKEN';
export const ERROR_TOKEN = 'ERROR_TOKEN';
export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

let token = JSON.parse(localStorage.getItem('token') || {}) || {};

const initialState = {
    token: {
        tokenType: token?.tokenType,
        expiresAt: token?.expiresAt,
        accessToken: token?.accessToken,
        refreshToken: token?.refreshToken,
        error: null
    },
    user: {
        name: localStorage.getItem('userName') ? localStorage.getItem('userName') : null,
        email: localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') : null
    }
};

export const authoriztionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {...state, token: {...state.token, ...action.token, error: null}};
        case SET_USER:
            return {...state, user: {...state.user, ...action.user}};
        case LOGOUT_USER:
            return {
                ...state,
                user: {name: null, email: null},
                token: {tokenType: null, expiresAt: null, accessToken: null, refreshToken: null}
            };
        case ERROR_TOKEN:
            return {...state, token: {...state.token, error: action.error}};
        default:
            return state
    }
};

export const setTokenAC = (data) => {
    return async dispatch => {
        try {
            const result = await (new ServerRequest('https://tager.dev.ozitag.com/api/auth/user'))
                .addMethod('POST')
                .addBody(data)
                .request();
            if (result.data && result.data.accessToken) {
                dispatch({type: SET_TOKEN, token: result.data});
                localStorage.setItem('token', JSON.stringify(result.data));
            }

            if (result.errors) {
                result.errors.password && dispatch({type: ERROR_TOKEN, error: result.errors.password.message});
                result.errors.email && dispatch({type: ERROR_TOKEN, error: result.errors.email.message})
            }
        } catch (e) {
            console.log(e);
        }


    }
};

export const setUserAC = (type, token) => {
    return async dispatch => {
        const result = await (new ServerRequest('https://tager.dev.ozitag.com/api/user/profile'))
            .addMethod('GET')
            .addAutorization(type, token)
            .request();
        if (result.data) {
            dispatch({type: SET_USER, user: result.data})
        }
    }
};

export const logoutUserAC = (tokenType, token) => {
    return async dispatch => {
        const result = await (new ServerRequest('https://tager.dev.ozitag.com/api/user/profile/logout'))
            .addMethod('POST')
            .addAutorization(tokenType, token)
            .request();
        if (result.success) {
            dispatch({type: LOGOUT_USER, token});
            localStorage.removeItem('token');
        }
    }
}