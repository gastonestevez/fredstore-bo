import { IProduct } from "./IProduct"
export const LIST_PRODUCTS = "[Products] list"
export const CREATE_PRODUCT = "[Products] create"

export const listProducts = (products: any) => {
    return { type: LIST_PRODUCTS, payload: products }
}

export const createProduct = (product: any) => {
    return { type: CREATE_PRODUCT, product }
}

const initialState = {
    products: [],
}

// const mapProducts = (products: any) => {
//     return products.map((p: any) => {
//         return {
//             id: p._id,
//             name: p.name,
//             sellPrice: p.sell_price,
//             description: p.description,
//             category: p.category_id?.name || '',
//             codeBar: p.code_bar,
//             stock: p.stock,
//             brand: p.brand,
//             buyPrice: p.buy_price,
//             visibility: p.visibility,
//         }
//     })
// }
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
