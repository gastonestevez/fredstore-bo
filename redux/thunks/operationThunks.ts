import { AppDispatch } from './../store';
import axios from "axios"
import { setLoading } from "../reducers/loading/loadingReducer"
import { listOperations } from "../reducers/operationReducer/operationReducer"

const endpoint = process.env.PRODUCTS_ENDPOINT

export const fetchOperations = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${endpoint}/operations`)
        dispatch(listOperations(response.data.operations))
        dispatch(setLoading(false))
    } catch (e) {
        dispatch(setLoading(false))
    }
}