import axios from "axios"
import { setLoading } from "../reducers/loading/loadingReducer"
import { listProducts } from "../reducers/products/productsReducer"

const endpoint = process.env.PRODUCTS_ENDPOINT

export const fetchProducts = () => async (dispatch: any) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${endpoint}/products`)
        console.log({response})
        dispatch(listProducts(response.data.data))
        dispatch(setLoading(false))
    } catch (e) {
        dispatch(setLoading(false))
    }
}

export const createProduct = (product: any) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true))
        await axios.post(`${endpoint}/products`, product)
        dispatch(setLoading(false))

    } catch(e) {
        dispatch(setLoading(false))
    }
}