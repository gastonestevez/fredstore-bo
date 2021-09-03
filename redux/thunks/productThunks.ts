import axios from "axios"
import { setLoading } from "../reducers/loading/loadingReducer"
import { listProducts } from "../reducers/products/productsReducer"

const endpoint = process.env.PRODUCTS_ENDPOINT

export const fetchProducts = (page: number = 1, showLoading: boolean = true) => async (dispatch: any) => {
    try {
        showLoading && dispatch(setLoading(true))
        const response = await axios.get(`${endpoint}/products/${page}`)
        dispatch(listProducts(response.data))
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

export const patchProduct = (product: any) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true))
        await axios.put(`${endpoint}/products/${product._id}`, product)
        dispatch(setLoading(false))

    } catch(e) {
        dispatch(setLoading(false))
        throw(e)
    }
}