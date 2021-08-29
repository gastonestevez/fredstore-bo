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
    CircularProgress,
    FormHelperText,
} from "@material-ui/core"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { createProduct, patchProduct } from "../../redux/thunks/productThunks"
import * as yup from "yup"

export default function ProductModal({
    open,
    handleClose,
    isEditing,
    product,
}) {
    const dispatch = useDispatch()
    const isLoading = useSelector(
        ({ loadingReducer }) => loadingReducer.loading
    )
    const categories = useSelector(
        ({ categoryReducer }) => categoryReducer.categories
    )
    const validationSchema = yup.object({
        name: yup.string().trim().required("Campo requerido."),
        buyPrice: yup.number().min(0, 'Mínimo debe ser 0.').required("Campo requerido."),
        sellPrice: yup.number().min(0, 'Mínimo debe ser 0.').required("Campo requerido."),
        description: yup.string().nullable().default(''),
        category: yup.string().required("Campo requerido."),
        brand: yup.string().required("Campo requerido"),
        codebar: yup.string().nullable().default(''),
        stock: yup.number().integer().min(0, 'Mínimo debe ser 0.').default(0),
    })
    const formik = useFormik({
        validationSchema: validationSchema,
        enableReinitialize: true,
        initialValues: {
            name: product.name,
            buyPrice: product.buy_price,
            sellPrice: product.sell_price,
            description: product.description,
            category: product.category_id?.name,
            brand: product.brand,
            codeBar: product.code_bar,
            stock: product.stock,
        },
        onSubmit: async (values) => {
            if(!isEditing){
                await dispatch(createProduct(values))
            } else {
                const finalProduct = {
                    name: values.name,
                    sell_price: values.sellPrice,
                    description: values.description,
                    code_bar: values.codeBar,
                    stock: values.stock || 0,
                    buy_price: values.buyPrice,
                    brand: values.brand,
                    category_id: values.category,
                    visibility: true,
                }
                await dispatch(patchProduct({...finalProduct, _id: product._id}))
            }
            handleClose(true)
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
                                    error={formik.touched.name && !!formik.errors.name}
                                    helperText={formik.touched.name && formik.errors.name}
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
                                    error={formik.touched.buyPrice && !!formik.errors.buyPrice}
                                    helperText={formik.touched.buyPrice && formik.errors.buyPrice}
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
                                    error={formik.touched.sellPrice && !!formik.errors.sellPrice}
                                    helperText={formik.touched.sellPrice && formik.errors.sellPrice}
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
                                    error={formik.touched.description && !!formik.errors.description}
                                    helperText={formik.touched.description && formik.errors.description}
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
                                        fullWidth
                                        defaultChecked
                                        onChange={formik.handleChange}
                                        error={formik.touched.category && !!formik.errors.category}
                                    >
                                        {categories.map((c: any) => {
                                            return (
                                                <MenuItem
                                                    key={c._id}
                                                    value={c._id}
                                                >
                                                    {c.name}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                    {formik.touched.category && (
                                    <FormHelperText error={!!formik.touched.category}>
                                        {formik.errors.category}
                                    </FormHelperText>
                                    )}
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
                                    error={formik.touched.codeBar && !!formik.errors.codeBar}
                                    helperText={formik.touched.codeBar && formik.errors.codeBar}
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
                                    error={formik.touched.stock && !!formik.errors.stock}
                                    helperText={formik.touched.stock && formik.errors.stock}
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
                                    error={formik.touched.brand && !!formik.errors.brand}
                                    helperText={formik.touched.brand && formik.errors.brand}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() =>handleClose(false)}
                            color="secondary"
                            variant="contained"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <CircularProgress
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        color: "whitesmoke",
                                    }}
                                />
                            ) : (
                                "Guardar"
                            )}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}
