import { IAction, IProduct } from "../../../Interfaces/interfaces"
export const LIST_PRODUCTS = "[Products] list"
export const CREATE_PRODUCT = "[Products] create"

export const listProducts = (products: IProduct[]) => {
    return { type: LIST_PRODUCTS, payload: products }
}

export const createProduct = (product: any) => {
    return { type: CREATE_PRODUCT, product }
}

const initialState = {
    products: [],
}

const reducer = (state = initialState, { type, payload }: IAction) => {
    switch (type) {
        case LIST_PRODUCTS:
            return {
                ...state,
                products: payload.products,
                current: payload.current,
                totalPages: payload.pages,
            }
        case CREATE_PRODUCT:
            return { ...state }
        default:
            return state
    }
}

export default reducer
