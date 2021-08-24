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
} from "@material-ui/core"

export default function CartModal({
    open,
    handleClose,
    cartItem,
    handleAccept,
}) {
    const [newCartItem, setNewCartItem] = useState({})
    const [stockType, setStockType] = useState("Vender")
    const [inputStock, setInputStock] = useState(0)
    useEffect(() => {
        setNewCartItem(cartItem)
    }, [cartItem])

    const handleUpdateStock = (e: BaseSyntheticEvent) => {
        const { value } = e.currentTarget
        if (value) {
            setInputStock(parseInt(value))
            setNewCartItem({
                ...newCartItem,
                stock: parseInt(newCartItem.stock) + parseInt(value),
            })
        }
    }

    const handleStockType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStockType((event.target as HTMLInputElement).value)
    }

    const getStockPostVenta = () => {
        if (stockType === "Vender") {
            return parseInt(cartItem.stock) - parseInt(inputStock)
        } else {
            return parseInt(cartItem.stock) + parseInt(inputStock)
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
                <DialogTitle id="form-dialog-title">
                    Reponer / Vender {cartItem.name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Elija una opción. Tenga en cuenta que si vende demás, el
                        stock pasará a ser negativo.
                    </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="stockType"
                                    name="stockType1"
                                    value={stockType}
                                    onChange={handleStockType}
                                >
                                    <FormControlLabel
                                        value="Vender"
                                        control={<Radio />}
                                        label="Vender"
                                    />
                                    <FormControlLabel
                                        value="Reponer"
                                        control={<Radio />}
                                        label="Reponer stock"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                autoComplete="off"
                                margin="dense"
                                id="name"
                                label="Cantidad"
                                type="number"
                                onChange={(e) => handleUpdateStock(e)}
                                fullWidth
                                defaultValue={0}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="paymentMethod"
                                label="Método de pago"
                                type="text"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="reason"
                                label="Razón (opcional)"
                                type="text"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <small>
                                Precio por unidad: $ {cartItem.sellPrice}
                            </small>
                        </Grid>
                        <Grid item xs={12}>
                            <small>
                                Stock disponible: {getStockPostVenta()} unidades
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
                        onClick={() => handleAccept(newCartItem)}
                        color="primary"
                        variant="contained"
                    >
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
