import { useState, useEffect } from "react"
import { Container, Grid } from "@material-ui/core"
import React from "react"
import HeaderSection from "../components/HeaderSection/HeaderSection"
import TransactionRange from "../components/TransactionRange/TransactionRange"
import TransactionTable from "../components/TransactionTable/TransactionTable"
import { fetchTransactions } from "../redux/thunks/transactionThunks"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories } from "../redux/thunks/categoryThunks"
import { fetchOperations } from "../redux/thunks/operationThunks"
import { AppDispatch, RootState } from "../redux/store"

const Transactions = () => {
    const dispatch = useDispatch<AppDispatch>()

    const operations = useSelector(
        ({ operationReducer } : RootState) => operationReducer.operations
    )

    const getCorrection = () =>
    operations.find((o: any) => o.name === "Corrección")?._id

    const transactionsSelector = useSelector(
        ({ transactionsReducer } : RootState) => transactionsReducer.transactions
    )
    const earnsSelector = useSelector(
        ({ transactionsReducer } : RootState) => transactionsReducer.earns
    ).filter((earn: any) => {
        return earn.operation_id !== getCorrection()
    })


    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchTransactions())
        dispatch(fetchOperations())
    }, [dispatch])

    return (
        <Container>
            <HeaderSection
                title="Transacciones"
                onClickAdd={() => {}}
                disableAddButton
            />
            <Grid container spacing={7}>
                <Grid item xs={3}>
                    <TransactionRange />
                </Grid>
                <Grid item xs={9}>
                    <TransactionTable
                        transactions={transactionsSelector}
                        earns={earnsSelector}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Transactions
