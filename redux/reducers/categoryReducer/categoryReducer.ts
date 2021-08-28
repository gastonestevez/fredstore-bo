export const LIST_CATEGORIES = "[Category] list"

export const listCategories = (categories: any) => {
    return { type: LIST_CATEGORIES, payload: categories }
}


const initialState = {
    categories: [],
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LIST_CATEGORIES:
            return { ...state, categories: payload}
        default:
            return state
    }
}

export default reducer