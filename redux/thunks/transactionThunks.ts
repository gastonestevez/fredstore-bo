import axios from "axios"
import { setLoading } from "../reducers/loading/loadingReducer"
import { listTransactions, createTransaction, filterTransactions } from "../reducers/transactions/transactionsReducer"

const endpoint = process.env.PRODUCTS_ENDPOINT

export const fetchTransactions = () => async (dispatch: any) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${endpoint}/transactions`)
        dispatch(listTransactions(response.data.transactions))
        dispatch(setLoading(false))
    } catch (e) {
        dispatch(setLoading(false))
    }
}

export const createNewTransaction = (transaction: any) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true))
        await axios.post(`${endpoint}/transactions`, transaction)
        dispatch(setLoading(false))
    } catch(e) {
        dispatch(setLoading(false))
    }
}

export const filterTransactionsByDate = (dates: any) => async(dispatch: any) => {
    try {
        console.log(dates)
        dispatch(setLoading(true))
        const response = await axios.post(`${endpoint}/transactions/date`, dates)
        dispatch(filterTransactions(response.data))
        dispatch(setLoading(false))
    } catch(e) {
        dispatch(setLoading(false))
    }
}