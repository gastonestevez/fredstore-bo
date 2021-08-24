import { Container, Grid } from "@material-ui/core"
import React from "react"
import HeaderSection from "../components/HeaderSection/HeaderSection"
import TransactionRange from "../components/TransactionRange/TransactionRange"
import TransactionTable from "../components/TransactionTable/TransactionTable"

const Transactions = () => {
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
                    <TransactionTable />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Transactions
