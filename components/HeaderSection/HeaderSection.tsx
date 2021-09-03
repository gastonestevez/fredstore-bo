import React from "react"
import { Fab, Grid } from "@material-ui/core"
import { H1 } from "../../common/styles/Headings.styled"
import AddIcon from "@material-ui/icons/Add"

type HeaderProps = {
    title: string,
    onClickAdd: () => void,
    disableAddButton: boolean,
}

const HeaderSection = ({ title, onClickAdd, disableAddButton }: HeaderProps) => {
    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs>
                    <H1>{title}</H1>
                </Grid>
                {!disableAddButton && (
                    <Grid item>
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={onClickAdd}
                            size="small"
                        >
                            <AddIcon />
                        </Fab>
                    </Grid>
                )}
            </Grid>
        </>
    )
}

export default HeaderSection
