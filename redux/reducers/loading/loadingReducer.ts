import { IAction, ILoading } from './../../../Interfaces/interfaces';
const initialState = {
    loading: false,
} as ILoading

export const SET_LOADING = 'SET_LOADING'

export const setLoading = (status: boolean) => ({
    type: SET_LOADING,
    payload: status,
})

const loadingReducer = (state = initialState, { type, payload }: IAction) => {
    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: payload,
            }
        default:
            return state
    }
}

export default loadingReducer