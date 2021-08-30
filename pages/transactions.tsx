import { useState, useEffect } from "react"
import { Container, Grid } from "@material-ui/core"
import React from "react"
import HeaderSection from "../components/HeaderSection/HeaderSection"
import TransactionRange from "../components/TransactionRange/TransactionRange"
import TransactionTable from "../components/TransactionTable/TransactionTable"
import { fetchTransactions } from "../redux/thunks/transactionThunks"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories } from "../redux/thunks/categoryThunks"

const Transactions = () => {
    const dispatch = useDispatch()
    const transactionsSelector = useSelector(
        ({ transactionsReducer }) => transactionsReducer.transactions
    )
    const earnsSelector = useSelector(
        ({ transactionsReducer }) => transactionsReducer.earns
    )
    
    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchTransactions())
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
                    <TransactionTable transactions={transactionsSelector} earns={earnsSelector} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Transactions
