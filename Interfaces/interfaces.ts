export interface ICategory {
    _id?: string
    name: string
    __v?: number
}

export interface IOperation {
    _id?: string
    name: string
    __v?: number
}

export interface IPayment {
    _id?: string
    name: string
    __v?: number
}

export interface IProduct {
    _id?: string
    code_bar: string
    name: string
    sell_price: number
    category_id?: ICategory | string | undefined
    stock: number
    brand: string
    buy_price: number
    visibility: boolean
    description: string | undefined
    __v?: number
}

export interface ITransaction {
    _id?: string
    date?: string
    operation_id: IOperation | string | undefined
    payment_id: IPayment | string | undefined
    product_id: IProduct | string | undefined
    quantity: number
    reason: string
    __v?: number
}

export interface IEarn {
    _id?: string,
    total_quantity: number,
    operation_id: string,
    product: IProduct | string,
    total_earn: number,
}

export interface IAction {
    type: string,
    payload: any,
}

export interface ILoading {
    loading: boolean
}