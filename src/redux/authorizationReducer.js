import ServerRequest from "../components/serverRequest/ServerRequest";

const SET_TOKEN = 'SET_TOKEN';
const ERROR_TOKEN = 'ERROR_TOKEN';
const SET_USER = 'SET_USER';
const LOGOUT_USER = 'LOGOUT_USER';

let token = JSON.parse(localStorage.getItem('token')) || {};

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
            return {...state, token: {...state.token, ...action.payload, error: null}};
        case SET_USER:
            return {...state, user: {...state.user, ...action.payload}};
        case LOGOUT_USER:
            return {
                ...state,
                user: {name: null, email: null},
                token: {tokenType: null, expiresAt: null, accessToken: null, refreshToken: null}
            };
        case ERROR_TOKEN:
            return {...state, token: {...state.token, error: action.payload}};
        default:
            return state
    }
};

export const setTokenAC = payload => ({
    type: SET_TOKEN,
    payload
});

export const errorTokenAC = error => ({
    type: ERROR_TOKEN,
    payload: error
});

export const setTokenThunk = data => async dispatch => {
    try {
        const result = await (new ServerRequest('https://tager.dev.ozitag.com/api/auth/user'))
            .addMethod('POST')
            .addBody(data)
            .request();
        if (result.data && result.data.accessToken) {
            dispatch(setTokenAC(result.data));
            localStorage.setItem('token', JSON.stringify(result.data));
        }

        if (result.errors) {
            result.errors.password && dispatch(errorTokenAC(result.errors.password.message));
            result.errors.email && dispatch(errorTokenAC(result.errors.email.message));
        }
    } catch (e) {
        console.log(e);
    }
};

export const setUserAC = user => ({
    type: SET_USER,
    payload: user
});

export const setUserThunk = (type, token) => async dispatch => {
    const result = await (new ServerRequest('https://tager.dev.ozitag.com/api/user/profile'))
        .addMethod('GET')
        .addAutorization(type, token)
        .request();
    if (result.data) {
        dispatch(setUserAC(result.data))
    }
};

export const logoutUserAC = () => ({
    type: LOGOUT_USER
});

export const logoutUserThunk = (tokenType, token) => async dispatch => {
    const result = await (new ServerRequest('https://tager.dev.ozitag.com/api/user/profile/logout'))
        .addMethod('POST')
        .addAutorization(tokenType, token)
        .request();
    if (result.success) {
        dispatch(logoutUserAC());
        localStorage.removeItem('token');
    }
};