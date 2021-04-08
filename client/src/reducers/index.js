import userReducer from './userReducer'
import { applyMiddleware, combineReducers, createStore,compose } from 'redux'
import thunk from 'redux-thunk'

const allReducers = combineReducers({
    user:userReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const globalState = createStore(allReducers, composeEnhancers(applyMiddleware(thunk)))

export default globalState