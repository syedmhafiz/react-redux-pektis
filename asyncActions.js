const redux = require('redux');
const axios = require('axios');
const thunkMiddleware = require('redux-thunk').default;
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const initialState = {
    loading: false,
    data: [],
    error: ''
}

const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

const fetchUsersRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
};

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
};

const fetchUsersFailure = error => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch(action?.type) {
        case FETCH_USER_REQUEST: 
            return {
                ...state,
                loading: true
            }

        case FETCH_USER_SUCCESS: 
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ''
            }

        case FETCH_USER_FAILURE:
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }

        default: return state
    }
}

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map(user => user.id);
                dispatch(fetchUsersSuccess(users));
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error));
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));

store.subscribe(() => { console.log(store.getState()) });
store.dispatch(fetchUsers());