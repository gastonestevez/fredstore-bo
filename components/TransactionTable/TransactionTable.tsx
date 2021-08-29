import * as React from "react"
import {
    DataGrid,
    GridColDef,
    GridValueGetterParams,
} from "@material-ui/data-grid"
import { Grid } from "@material-ui/core"
import { H2 } from "../../common/styles/Headings.styled"
import moment from 'moment'

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
    }
]
const columns: GridColDef[] = [
    {
        field: "product",
        headerName: "Producto",
        width: 150,
        editable: true,
    },
    {
        field: "quantity",
        headerName: "Cantidad",
        width: 140,
        editable: true,
        type: "number",
    },
    {
        field: "totalEarn",
        headerName: "Ganancias",
        type: "number",
        width: 150,
        editable: true,
    },
    {
        field: "stock",
        headerName: "Stock",
        type: "number",
        width: 115,
        editable: true,
    },
    {
        field: "productType",
        headerName: "Tipo",
        width: 110,
        editable: true,
    },
]


const rows = [
    {
        id: 1,
        product: "Sertal Compuesto",
        quantity: 30,
        totalEarn: 1300,
        productType: "FARMACIA",
        stock: 20,
    },
    {
        id: 3,
        product: "Ibuprofeno",
        quantity: 5,
        totalEarn: 500,
        productType: "FARMACIA",
        stock: 20,
    },
    {
        id: 5,
        product: "Hueso",
        quantity: 23,
        totalEarn: 100,
        productType: "PET SHOP",
        stock: 20,
    },
    {
        id: 9,
        product: "Paracetamol",
        quantity: 89,
        totalEarn: 1830,
        productType: "FARMACIA",
        stock: 20,
    },
    {
        id: 11,
        product: "Test Product",
        quantity: 89,
        totalEarn: 1830,
        productType: "PET SHOP",
        stock: 20,
    },
    {
        id: 12,
        product: "Test Farm",
        quantity: 89,
        totalEarn: 1830,
        productType: "FARMACIA",
        stock: 20,
    },
    {
        id: 13,
        product: "Test item Shop",
        quantity: 89,
        totalEarn: 1830,
        productType: "PET SHOP",
        stock: 20,
    },
]

export default function TransactionTable({ transactions }) {
    const transactionRows = transactions.map((t: any) => {
        return {
            id: t._id,
            product: t.product_id?.name,
            date: moment(t.date).format('l hh:mm'),
            quantity: t.quantity,
            operation: t.operation_id?.name,
            payment: t.payment_id?.name,
            reason: t.reason,
        }
    })

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
                <small>📈 Ganancias totales: $ 8381</small>
                <small>🛒 Total vendidos: 1560</small>
                <small>💻 Producto más vendido: Sertal Compuesto</small>
            </div>

            <Grid
                item
                style={{
                    height: "50vh",
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </Grid>

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
        </Grid>
    )
}
