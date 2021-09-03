export const LIST_TRANSACTIONS = "[Transactions] list"
export const CREATE_TRANSACTION = "[Transactions] create"
export const FILTER_TRANSACTION = "[Transactions] filter"

export const listTransactions = (transactions: any) => {
    return { type: LIST_TRANSACTIONS, payload: transactions }
}

export const filterTransactions = (transactions: any) => {
    return { type: FILTER_TRANSACTION, payload: transactions }
}

export const createTransaction = (transaction: any) => {
    return { type: LIST_TRANSACTIONS, payload: transaction }
}

const initialState = {
    transactions: [],
    earns: [],
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LIST_TRANSACTIONS:
            return { ...state, transactions: payload }
        case CREATE_TRANSACTION:
            return { ...state }
        case FILTER_TRANSACTION:
            return {
                ...state,
                transactions: payload.transactions,
                earns: payload.finalEarns,
            }
        default:
            return state
    }
}

export default reducer
