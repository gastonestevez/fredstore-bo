import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Grid,
} from "@material-ui/core"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { createProduct } from "../../redux/thunks/productThunks"
export default function ProductModal({
    open,
    handleClose,
    isEditing,
    handleSaveProduct,
    product,
}) {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: product.name,
            buyPrice: product.buyPrice,
            sellPrice: product.sellPrice,
            description: product.description,
            category: product.category,
            brand: product.brand,
            codeBar: product.barCode,
            stock: product.stock,
        },
        onSubmit: (values) => {
            dispatch(createProduct(values))
            handleClose()
        },
    })

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle id="form-dialog-title">
                        {isEditing ? "Editar producto" : "Agregar producto"}
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid container item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Nombre"
                                    type="text"
                                    fullWidth
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="buyPrice"
                                    name="buyPrice"
                                    label="Precio de Compra"
                                    type="number"
                                    fullWidth
                                    value={formik.values.buyPrice}
                                    onChange={formik.handleChange}
                                />
                            </Grid>

                            <Grid container item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="sellPrice"
                                    name="sellPrice"
                                    label="Precio de Venta"
                                    type="number"
                                    fullWidth
                                    value={formik.values.sellPrice}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="description"
                                    name="description"
                                    label="Descripción"
                                    type="text"
                                    fullWidth
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <FormControl
                                    fullWidth
                                    style={{ marginTop: "5px" }}
                                >
                                    <InputLabel id="category-label">
                                        Categoría
                                    </InputLabel>
                                    <Select
                                        labelId="category-label"
                                        id="category"
                                        name="category"
                                        value={formik.values.category}
                                        // onChange={handleCategoryChange}
                                        fullWidth
                                        defaultChecked
                                        defaultValue={"FARMACIA"}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value={"FARMACIA"}>
                                            Farmacia
                                        </MenuItem>
                                        <MenuItem value={"PETSHOP"}>
                                            Pet Shop
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="codeBar"
                                    name="codeBar"
                                    label="Código de barras"
                                    type="text"
                                    fullWidth
                                    value={formik.values.codeBar}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="stock"
                                    name="stock"
                                    label="Stock"
                                    type="number"
                                    fullWidth
                                    value={formik.values.stock}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="brand"
                                    name="brand"
                                    label="Marca"
                                    type="text"
                                    fullWidth
                                    value={formik.values.brand}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose}
                            color="secondary"
                            variant="contained"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            Guardar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}
