import * as React from "react"
import {
    DataGrid,
    GridColDef,
    GridValueGetterParams,
} from "@material-ui/data-grid"
import { Grid } from "@material-ui/core"
import { H2 } from "../../common/styles/Headings.styled"
import moment from "moment"
import { useSelector } from "react-redux"

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

export default function TransactionTable({ transactions, earns }) {
    const categories = useSelector(
        ({ categoryReducer }) => categoryReducer.categories
    )

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
        ).name
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
            return earns.reduce((ac, cv) => ac + cv.total_earn, 0)
        }
    }

    const getTotalQuantity = () => {
        if (earns.length) {
            return earns.reduce((ac, cv) => ac + cv.total_quantity, 0)
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
            <H2>Listado de Ganancias</H2>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <small>📈 Ganancias totales: ${getTotalEarnings()}</small>
                <small>🛒 Total vendidos: {getTotalQuantity()}</small>
                <small>💻 Producto más vendido: {getMostSelledProduct()}</small>
            </div>

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
            <H2>Planilla</H2>
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
