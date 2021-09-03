import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import SettingsIcon from "@material-ui/icons/FormatListBulleted"
import EditIcon from "@material-ui/icons/Edit"
import theme from "../../src/theme"
import { IconButton } from "@material-ui/core"
import {
    DataGrid,
    GridApi,
    GridCellParams,
    GridCellValue,
    GridColDef,
} from "@material-ui/data-grid"
import { IProduct } from "../../Interfaces/interfaces"

type ProductTableProps = {
    handleEditProduct: (id: string) => void,
    handleCartItemClick: (id: string) => void,
    products: IProduct[],
}

export default function ProductTable({
    handleCartItemClick,
    handleEditProduct,
    products,
}: ProductTableProps) {
    const manageStock = (id: string) => {
        handleCartItemClick(id)
    }

    const editProduct = (id: string) => {
        handleEditProduct(id)
    }

    const getCartComponent = (id: any) => (
        <>
            <IconButton
                aria-label="shopping-cart"
                onClick={() => manageStock(id)}
            >
                <SettingsIcon />
            </IconButton>
            <IconButton
                aria-label="shopping-cart"
                onClick={() => editProduct(id)}
            >
                <EditIcon />
            </IconButton>
        </>
    )

    const columns: GridColDef[] = [
        { field: "id", hide: true },
        { field: "code_bar", headerName: "Código", width: 150 },
        { field: "name", headerName: "Nombre", width: 150 },
        {
            field: "sell_price",
            headerName: "$ Público",
            width: 150,
            align: "right",
        },
        {
            field: "category",
            headerName: "Categoría",
            width: 150,
            align: "right",
        },
        {
            field: "stock",
            headerName: "Stock",
            width: 150,
            align: "right",
        },
        {
            field: "brand",
            headerName: "Marca",
            width: 150,
            align: "right",
        },
        {
            field: "buy_price",
            headerName: "$ Compra",
            width: 170,
            align: "right",
        },
        {
            field: "action",
            headerName: "Acciones",
            width: 150,
            align: "right",
            renderCell: (params: GridCellParams) => {
                const idValue = params.getValue(params.id, "id")
                return getCartComponent(idValue)
            },
        },
    ]
    const getRows = () => {
        return products.map((p: any) => {
            return {
                ...p,
                id: p._id,
                category: p.category_id?.name,
                action: () => getCartComponent(p._id),
            }
        })
    }

    const rows = getRows()
    const useStyles = makeStyles({
        root: {
            width: "100%",
            height: "70vh",
            "& .stock-paint--LOW": {
                backgroundColor: theme.palette.error.main,
                "&:hover": {
                    backgroundColor: theme.palette.error.light,
                }
            },
        },
        container: {
            maxHeight: 440,
        },

    })

    const classes = useStyles()
    return (
        <Paper className={classes.root}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                getRowClassName={(params) =>
                    `stock-paint--${
                        (params.getValue(params.id, "stock") || 0)<= 10
                            ? "LOW"
                            : "NORMAL"
                    }`
                }
            />
        </Paper>
    )
}
