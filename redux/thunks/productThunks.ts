import axios from "axios"
import { setLoading } from "../reducers/loading/loadingReducer"
import { listProducts } from "../reducers/products/productsReducer"

export const fetchProducts = () => async (dispatch: any) => {
    try {
        dispatch(setLoading(true))
        //axios
        //dispatch(listProducts)
        dispatch(setLoading(false))
    } catch (e) {
        dispatch(setLoading(false))
    }
}
