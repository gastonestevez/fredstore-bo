import { IProduct } from "./IProduct"
export const LIST_PRODUCTS = "[Products] list"
export const CREATE_PRODUCT = "[Products] create"

export const listProducts = () => (dispatch: any, products: any) => {
    return dispatch({ type: LIST_PRODUCTS, products })
}

export const createProduct = () => (dispatch: any, product: any) => {
    return dispatch({ type: CREATE_PRODUCT, product })
}

const initialState: IProduct[] = []

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LIST_PRODUCTS:
            return { ...state, products: payload }
        case CREATE_PRODUCT:
            return { ...state }
        default:
            return state
    }
}

export default reducer
