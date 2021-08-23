import React from "react"
import { Fab } from "@material-ui/core"
import { H1 } from "../../common/styles/Headings.styled"
import AddIcon from "@material-ui/icons/Add"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        boxWrapper: {
            width: '100%',
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 0,
        },
    })
)

const HeaderSection = ({ title, onClickAdd }) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.boxWrapper}>
                <H1>{title}</H1>
                <Fab color="primary" aria-label="add" onClick={onClickAdd}>
                    <AddIcon />
                </Fab>
            </div>
        </>
    )
}

export default HeaderSection
