import { combineReducers } from "redux"

import productsReducer from "./products/productsReducer"
//import transactionsReducer from "./transactions/transactionsReducer"
import loadingReducer from './loading/loadingReducer'

export default combineReducers({
    productsReducer,
   // transactionsReducer,
    loadingReducer,
})
