import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import SettingsIcon from "@material-ui/icons/FormatListBulleted"
import EditIcon from "@material-ui/icons/Edit"

import { IconButton } from "@material-ui/core"
import { IProduct } from "../../redux/reducers/products/IProduct"

export default function StickyHeadTable({
    handleCartItemClick,
    handleEditProduct,
    products,
}) {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const columns = [
        { id: "code", label: "Código", minWidth: 50 },
        { id: "name", label: "Nombre", minWidth: 20 },
        {
            id: "sellPrice",
            label: "Precio al Público",
            minWidth: 50,
            align: "right",
        },
        {
            id: "category",
            label: "Categoría",
            minWidth: 50,
            align: "right",
        },
        {
            id: "stock",
            label: "Stock",
            minWidth: 50,
            align: "right",
        },
        {
            id: "brand",
            label: "Marca",
            minWidth: 50,
            align: "right",
        },
        {
            id: "buyPrice",
            label: "Precio de compra",
            minWidth: 50,
            align: "right",
        },
        {
            id: "action",
            label: "Acciones",
            minWidth: 50,
            align: "right",
        },
    ]

    function createData(
        code,
        name,
        category,
        sellPrice,
        stock,
        brand,
        buyPrice,
        action
    ) {
        return {
            code,
            name,
            category,
            sellPrice,
            stock,
            brand,
            buyPrice,
            action,
        }
    }

    const manageStock = (id: number) => {
        handleCartItemClick(id)
    }

    const editProduct = (id: number) => {
        handleEditProduct(id)
    }

    const getCartComponent = (id: number) => (
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
    const getRows = () => {
        return products.map((p: any) => {
            return createData(
                p.code_bar,
                p.name,
                p.category_id?.name,
                p.sell_price,
                p.stock,
                p.brand,
                p.buy_price,
                getCartComponent(p._id)
            )
        })
    }
    
    const rows = getRows()
    const useStyles = makeStyles({
        root: {
            width: "100%",
        },
        container: {
            maxHeight: 440,
        },
    })

    const classes = useStyles()

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.code}
                                        style={
                                            row["stock"] <= 10
                                                ? {
                                                      backgroundColor:
                                                          "rgba(255,0,0,0.7)",
                                                  }
                                                : null
                                        }
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id]
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.format &&
                                                    typeof value === "number"
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
