import { combineReducers } from "redux"

import productsReducer from "./products/productsReducer"
import transactionsReducer from "./transactions/transactionsReducer"
import loadingReducer from './loading/loadingReducer'
import categoryReducer from './categoryReducer/categoryReducer'
import operationReducer from './operationReducer/operationReducer'
import paymentReducer from './paymentReducer/paymentReducer'

export default combineReducers({
    productsReducer,
    transactionsReducer,
    loadingReducer,
    categoryReducer,
    operationReducer,
    paymentReducer

})
