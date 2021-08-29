export const LIST_TRANSACTIONS = "[Transactions] list"
export const CREATE_TRANSACTION = "[Transactions] create"

export const listTransactions = (transactions: any) => {
    return { type: LIST_TRANSACTIONS, payload: transactions }
}

export const createTransaction = (transaction: any) => {
    return { type: LIST_TRANSACTIONS, payload: transaction }
}

const initialState = {
    transactions: [],
}

const reducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case LIST_TRANSACTIONS:
            return { ...state, transactions: payload}
        case CREATE_TRANSACTION:
            return { ...state }
        default:
            return state
    }
}

export default reducer
