import axios from "axios"
import { setLoading } from "../reducers/loading/loadingReducer"
import { listPayments } from "../reducers/paymentReducer/paymentReducer"

const endpoint = process.env.PRODUCTS_ENDPOINT

export const fetchPayments = () => async (dispatch: any) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${endpoint}/payments`)
        dispatch(listPayments(response.data.payments))
        dispatch(setLoading(false))
    } catch (e) {
        dispatch(setLoading(false))
    }
}