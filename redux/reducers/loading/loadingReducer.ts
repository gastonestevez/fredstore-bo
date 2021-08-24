const initialState = {
    loading: false,
}

export const SET_LOADING = 'SET_LOADING'

export const setLoading = (status: any) => ({
    type: SET_LOADING,
    payload: status,
})

const loadingReducer = (state = initialState, { type, payload }) => {
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