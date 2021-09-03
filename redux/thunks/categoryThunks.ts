import { AppDispatch } from './../store';
import axios from "axios"
import { listCategories } from "../reducers/categoryReducer/categoryReducer"
import { setLoading } from "../reducers/loading/loadingReducer"

const endpoint = process.env.PRODUCTS_ENDPOINT

export const fetchCategories = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${endpoint}/categories`)
        dispatch(listCategories(response.data.categories))
        dispatch(setLoading(false))
    } catch (e) {
        dispatch(setLoading(false))
    }
}