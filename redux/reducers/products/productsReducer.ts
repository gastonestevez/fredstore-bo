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

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LIST_PRODUCTS:
            return Object.assign({}, state, {
                id: action.id,
                name: action.name,
                sellPrice: action.sell_price,
                description: action.description,
                category: action.category,
                codeBar: action.code_bar,
                stock: action.stock,
                brand: action.brand,
                buyPrice: action.buy_price,
                visibility: action.visibility,
            })
        case CREATE_PRODUCT:
            return state
        default:
            return state
    }
}

export default reducer
