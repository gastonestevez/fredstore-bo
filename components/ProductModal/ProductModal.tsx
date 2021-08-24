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

export default function ProductModal({
    open,
    handleClose,
    isEditing,
    handleSaveProduct,
    product,
}) {
    const [category, setCategory] = useState("")
    const handleCategoryChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setCategory(event.target.value as string)
    }
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {isEditing ? "Editar producto" : "Agregar producto"}
                </DialogTitle>
                <DialogContent>
                    <div>
                        <Grid container spacing={3}>
                            <Grid container item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Nombre"
                                    type="text"
                                    fullWidth
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="buyPrice"
                                    label="Precio de Compra"
                                    type="number"
                                    fullWidth
                                />
                            </Grid>

                            <Grid container item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="sellPrice"
                                    label="Precio de Venta"
                                    type="number"
                                    fullWidth
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="description"
                                    label="Descripción"
                                    type="text"
                                    fullWidth
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <FormControl fullWidth style={{marginTop: '5px'}}>
                                    <InputLabel id="category-label">
                                        Categoría
                                    </InputLabel>
                                    <Select
                                        labelId="category-label"
                                        id="category"
                                        value={category}
                                        onChange={handleCategoryChange}
                                        fullWidth
                                        defaultChecked
                                        defaultValue={"FARMACIA"}
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
                                    label="Código de barras"
                                    type="text"
                                    fullWidth
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="stock"
                                    label="Stock"
                                    type="number"
                                    fullWidth
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="brand"
                                    label="Marca"
                                    type="text"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="contained">
                        Cancelar
                    </Button>
                    <Button onClick={handleSaveProduct} color="primary" variant="contained">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
