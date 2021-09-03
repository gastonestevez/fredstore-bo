import { IAction } from './../../../Interfaces/interfaces';
export const LIST_OPERATIONS = "[Operation] list"

export const listOperations = (payments: any) => {
    return { type: LIST_OPERATIONS, payload: payments }
}


const initialState = {
    operations: [],
}

const reducer = (state = initialState, { type, payload }: IAction) => {
    switch (type) {
        case LIST_OPERATIONS:
            return { ...state, operations: payload}
        default:
            return state
    }
}

export default reducer