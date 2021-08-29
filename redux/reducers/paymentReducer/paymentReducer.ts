export const LIST_PAYMENTS = "[Payment] list"

export const listPayments = (payments: any) => {
    return { type: LIST_PAYMENTS, payload: payments }
}


const initialState = {
    payments: [],
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LIST_PAYMENTS:
            return { ...state, payments: payload}
        default:
            return state
    }
}

export default reducer