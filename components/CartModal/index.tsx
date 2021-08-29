import React, { useState, useEffect, BaseSyntheticEvent } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid,
    InputLabel,
    Select,
    FormHelperText,
    MenuItem,
    CircularProgress,
} from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import * as yup from "yup"
import { createNewTransaction } from "../../redux/thunks/transactionThunks"
import { patchProduct } from "../../redux/thunks/productThunks"

export default function CartModal({
    open,
    handleClose,
    cartItem,
    handleAccept,
}) {
    const [newCartItem, setNewCartItem] = useState({})
    const [stockType, setStockType] = useState("Vender")
    const [inputStock, setInputStock] = useState(0)
    const dispatch = useDispatch()
    const paymentMethods = useSelector(
        ({ paymentReducer }) => paymentReducer.payments
    )
    const operationMethods = useSelector(
        ({ operationReducer }) => operationReducer.operations
    )
    const isLoading = useSelector(
        ({ loadingReducer }) => loadingReducer.isLoading
    )

    const validationSchema = yup.object({
        operation: yup.string().required("Campo requerido."),
        stock: yup
            .number()
            .min(1, "Mínimo 1.")
            .integer()
            .required("Campo requerido."),
        payment: yup.string().required("Campo requerido."),
        reason: yup.string(),
    })

    useEffect(() => {
        setNewCartItem(cartItem)
    }, [cartItem])

    const formik = useFormik({
        validationSchema,
        initialValues: {
            operation: "",
            stock: 1,
            payment: "",
            reason: "",
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const operationValue = operationMethods.find(
                    (o: any) => o._id === values.operation
                )?.name
                const operationsTypes = {
                    ["Venta"]: cartItem.stock - values.stock,
                    ["Compra"]: cartItem.stock + values.stock,
                }
                console.log({ operationValue })
                const stockValue = operationsTypes[operationValue] || values.stock
                await dispatch(patchProduct({ ...cartItem, stock: stockValue }))
            } catch(e) {
                console.log({e})
            }
            // await dispatch(
            //     createNewTransaction({ ...values, productId: cartItem.id })
            // )
            // const operationType = operationMethods.find((o:any) => o._id === values.operation)
            // if(operationType.name === 'Venta'){
            //     const finalStock = cartItem.stock - values.stock
            //     await dispatch(
            //         patchProduct({...cartItem, stock: finalStock})
            //     )

            // } else if(operationType.name === 'Compra') {
            //     const finalStock = cartItem.stock + values.stock
            //     await dispatch(
            //         patchProduct({...cartItem, stock: finalStock})
            //     )
            // } else {
            //     await dispatch(
            //         patchProduct({...cartItem, stock: values.stock})
            //     )
            // }
            handleAccept()
        },
    })

    const getStockPostVenta = () => {
        if (stockType === "Vender") {
            return parseInt(cartItem.stock) - inputStock
        } else {
            return parseInt(cartItem.stock) + inputStock
        }
    }

    const getPrecioFinal = () => {
        return parseInt(cartItem.sellPrice) * inputStock
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle id="form-dialog-title">
                        Reponer / Vender {cartItem.name}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Elija una opción. Tenga en cuenta que si vende
                            demás, el stock pasará a ser negativo.
                        </DialogContentText>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl
                                    fullWidth
                                    style={{ marginTop: "5px" }}
                                >
                                    <InputLabel id="operation-label">
                                        Tipo de operación
                                    </InputLabel>
                                    <Select
                                        labelId="operation-label"
                                        id="operation"
                                        name="operation"
                                        value={formik.values.operation}
                                        fullWidth
                                        defaultChecked
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.operation &&
                                            !!formik.errors.operation
                                        }
                                    >
                                        {operationMethods.map((c: any) => {
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
                                    {formik.touched.operation && (
                                        <FormHelperText
                                            error={!!formik.touched.operation}
                                        >
                                            {formik.errors.operation}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    autoFocus
                                    autoComplete="off"
                                    margin="dense"
                                    id="stock"
                                    name="stock"
                                    label="Cantidad"
                                    type="number"
                                    fullWidth
                                    defaultValue={1}
                                    onChange={formik.handleChange}
                                    value={formik.values.stock}
                                    error={
                                        formik.touched.stock &&
                                        !!formik.errors.stock
                                    }
                                    helperText={
                                        formik.touched.stock &&
                                        formik.errors.stock
                                    }
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl
                                    fullWidth
                                    style={{ marginTop: "5px" }}
                                >
                                    <InputLabel id="operation-label">
                                        Método de pago
                                    </InputLabel>
                                    <Select
                                        labelId="payment-label"
                                        id="payment"
                                        name="payment"
                                        value={formik.values.payment}
                                        fullWidth
                                        defaultChecked
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.payment &&
                                            !!formik.errors.payment
                                        }
                                    >
                                        {paymentMethods.map((c: any) => {
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
                                    {formik.touched.payment && (
                                        <FormHelperText
                                            error={!!formik.touched.payment}
                                        >
                                            {formik.errors.payment}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="reason"
                                    name="reason"
                                    label="Razón (opcional)"
                                    type="text"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    value={formik.values.reason}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <small>
                                    Precio por unidad: $ {cartItem.sellPrice}
                                </small>
                            </Grid>
                            <Grid item xs={12}>
                                <small>
                                    Stock disponible: {getStockPostVenta()}{" "}
                                    unidades
                                </small>
                            </Grid>
                            {stockType === "Vender" && (
                                <>
                                    <Grid item xs={12}>
                                        <small>
                                            Precio final: $ {getPrecioFinal()}
                                        </small>
                                    </Grid>
                                </>
                            )}
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
