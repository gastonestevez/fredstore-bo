import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { Button, FormControl, Grid } from "@material-ui/core"
import { H2 } from "../../common/styles/Headings.styled"
import { useFormik } from "formik"
import * as yup from "yup"
import moment from "moment"
import { filterTransactionsByDate } from "../../redux/thunks/transactionThunks"
import { useDispatch } from "react-redux"

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

export default function TransactionRange({ handleUpdateTransactions }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const validationSchema = yup.object({
        fromDate: yup.date(),
        toDate: yup.date(),
    })

    const formik = useFormik({
        validationSchema: validationSchema,
        enableReinitialize: true,
        initialValues: {
            fromDate: moment().format("YYYY[-]MM[-]DD"),
            toDate: moment().format("YYYY[-]MM[-]DD"),
        },
        onSubmit: async (values) => {
            const finalValues = {
                initial_date: values.fromDate,
                final_date: moment(values.toDate)
                    .add(23, "hour")
                    .add(59, "minutes")
                    .format(),
            }
            await dispatch(filterTransactionsByDate(finalValues))
        },
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container className={classes.container} spacing={3}>
                <H2 className={classes.title}>Búsqueda</H2>
                <Grid item>
                    <TextField
                        id="fromDate"
                        name="fromDate"
                        label="Desde:"
                        type="date"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formik.values.fromDate}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="toDate"
                        name="toDate"
                        label="Hasta:"
                        type="date"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formik.values.toDate}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item>
                    <Button
                        onClick={handleUpdateTransactions}
                        color="primary"
                        variant="contained"
                        type="submit"
                        fullWidth
                    >
                        Buscar
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
