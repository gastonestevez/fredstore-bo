import axios from "axios"
import { setLoading } from "../reducers/loading/loadingReducer"
import { listProducts } from "../reducers/products/productsReducer"

export const fetchProducts = () => async (dispatch: any) => {
    try {
        setLoading(true)
        console.log("Fetching products ...")
        //axios
        //dispatch(listProducts)
        setLoading(false)
    } catch (e) {
        setLoading(false)
    }
}
