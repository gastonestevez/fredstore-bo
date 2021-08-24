import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { Button, FormControl, Grid } from "@material-ui/core"
import { H2 } from "../../common/styles/Headings.styled"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flexDirection: "column",
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        title: {},
    })
)

export default function TransactionRange({
    handleUpdateTransactions,
    onChangeFromDate,
    onChangeToDate,
}) {
    const classes = useStyles()

    return (
        <Grid container className={classes.container} spacing={3}>
            <H2 className={classes.title}>Búsqueda</H2>
            <Grid item>
                <TextField
                    id="fromDate"
                    label="Desde:"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={onChangeFromDate}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="toDate"
                    label="Hasta:"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={onChangeToDate}
                />
            </Grid>
            <Grid item>
                <Button
                    onClick={handleUpdateTransactions}
                    color="primary"
                    variant="contained"
                    fullWidth
                >
                    Buscar
                </Button>
            </Grid>
        </Grid>
    )
}
