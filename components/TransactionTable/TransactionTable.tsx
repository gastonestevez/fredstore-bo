import * as React from "react"
import { DataGrid, GridColDef } from "@material-ui/data-grid"
import { Grid } from "@material-ui/core"
import { H2 } from "../../common/styles/Headings.styled"
import moment from "moment"
import { useSelector } from "react-redux"
import { IEarn, IOperation, ITransaction } from "../../Interfaces/interfaces"
import { RootState } from "../../redux/store"

const transactionColumns: GridColDef[] = [
    {
        field: "product",
        headerName: "Producto",
        width: 150,
    },
    {
        field: "date",
        headerName: "Fecha",
        width: 150,
    },
    {
        field: "quantity",
        headerName: "Cantidad",
        width: 150,
    },
    {
        field: "operation",
        headerName: "Operación",
        width: 150,
    },
    {
        field: "payment",
        headerName: "Tipo de pago",
        width: 150,
    },
    {
        field: "reason",
        headerName: "Razón",
        width: 350,
    },
]
const columns: GridColDef[] = [
    {
        field: "product",
        headerName: "Producto",
        width: 150,
    },
    {
        field: "quantity",
        headerName: "Cantidad",
        width: 140,
        type: "number",
    },
    {
        field: "totalEarn",
        headerName: "Ganancias",
        type: "number",
        width: 150,
    },
    {
        field: "stock",
        headerName: "Stock",
        type: "number",
        width: 115,
    },
    {
        field: "productType",
        headerName: "Tipo",
        width: 110,
    },
]

type TransactionTableProps = {
    transactions: ITransaction[] | []
    earns: IEarn[] | []
}

export default function TransactionTable({
    transactions,
    earns,
}: TransactionTableProps) {

    const categories = useSelector(
        ({ categoryReducer }: RootState) => categoryReducer.categories
    )
    
    const operations = useSelector(
        ({ operationReducer }: RootState) => operationReducer.operations
    )

    const getBuyOperation = () => {
        return operations.find((o: IOperation) => {
            return o.name === "Venta"
        })
    }

    const transactionRows = transactions.map((t: any) => {
        return {
            id: t._id,
            product: t.product_id?.name,
            date: moment(t.date).format("l hh:mm"),
            quantity: t.quantity,
            operation: t.operation_id?.name,
            payment: t.payment_id?.name,
            reason: t.reason,
        }
    })

    const earnRows = earns.map((earn: any) => {
        const category = categories.find(
            (c: any) => c._id === earn.product.category_id
        )?.name || ''

        return {
            id: earn._id,
            product: earn.product.name,
            quantity: earn.total_quantity,
            totalEarn: earn.total_earn,
            productType: category,
            stock: earn.product.stock,
        }
    })

    const getTotalEarnings = () => {
        if (earns.length) {
            const earnArr = earns as Array<IEarn>
            
            return earnArr.filter((e: IEarn) => {
                e.operation_id === getBuyOperation()._id
            }).reduce(
                (ac: number, cv: IEarn) =>
                    ac +
                    (cv.product.sell_price - cv.product.buy_price) *
                        cv.total_quantity,
                0
            )
        }
    }
console.log(getTotalEarnings())
    const getTotalQuantity = () => {
        if (earns.length) {
            const earnArr = earns as Array<IEarn>
            console.log(earnArr)
            return earnArr.filter((e: IEarn) => {
                console.log(e.operation_id)
                e.operation_id === getBuyOperation()._id
            }).reduce(
                (ac: number, cv: IEarn) => ac + cv.total_quantity,
                0
            )
        }
    }

    const getMostSelledProduct = () => {
        if (earns.length) {
            return earns[0].product.name
        }
    }

    return (
        <Grid
            container
            spacing={3}
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <H2>Listado de Transacciones</H2>
            <Grid
                item
                style={{
                    height: "50vh",
                }}
            >
                <DataGrid
                    rows={transactionRows}
                    columns={transactionColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </Grid>
            <H2>Listado de Ganancias (no funciona)</H2>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <small>📈 Total vendido: ${getTotalEarnings()}</small>
                <small>🛒 Total unidades vendidas: {getTotalQuantity()}</small>
                <small>💻 Producto más vendido: {getMostSelledProduct()}</small>
            </div>
            <Grid
                item
                style={{
                    height: "50vh",
                }}
            >
                <DataGrid
                    rows={earnRows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </Grid>
        </Grid>
    )
}
