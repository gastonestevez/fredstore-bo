import React from "react"
import { Fab, Grid } from "@material-ui/core"
import { H1 } from "../../common/styles/Headings.styled"
import AddIcon from "@material-ui/icons/Add"

const HeaderSection = ({ title, onClickAdd }) => {
    return (
        <>
            <Grid container alignItems='center'>
                <Grid item xs>
                    <H1>{title}</H1>
                </Grid>
                <Grid item xs={0}>
                    <Fab color="primary" aria-label="add" onClick={onClickAdd} size='small'>
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>
        </>
    )
}

export default HeaderSection
