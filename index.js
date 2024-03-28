const redux = require('redux');
const reduxLogger = require('redux-logger');


const createStore = redux.createStore;
const combinedReducer = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger()

const BUY_CAR = 'BUY_CAR';
const BUY_BIKES = 'BUY_BIKES';

function buyCar() {
    return {
        type: BUY_CAR,
        info: 'First redux action'
    }
}

function buyBike() {
    return {
        type: BUY_BIKES,
        info: 'few redux actions'
    }
}

const initialCarState = {
    numOfCars: 10
}

const initialBikeState = {
    numOfBikes: 19
}

const carReducer = (state = initialCarState, action) => {
    switch(action?.type) {
        case BUY_CAR: return {
            ...state,
            numOfCars: state.numOfCars - 1
        }

        default: return state
    }
}

const bikeReducer = (state = initialBikeState, action) => {
    switch(action?.type) {
        case BUY_BIKES: return {
            ...state,
            numOfBikes: state.numOfBikes - 1
        }

        default: return state
    }
}

const rootReducer = combinedReducer({
    car: carReducer,
    bike: bikeReducer
})
const store = createStore(rootReducer, applyMiddleware(logger));
console.log('Initial state', store.getState());

const unsubscribe = store.subscribe(() => {});

store.dispatch(buyCar());
store.dispatch(buyCar());
store.dispatch(buyCar());
store.dispatch(buyBike());
store.dispatch(buyBike());

unsubscribe();