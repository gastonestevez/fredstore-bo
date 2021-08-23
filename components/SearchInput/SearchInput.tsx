import { Paper } from "@material-ui/core"
import { IconButton } from "@material-ui/core"
import { InputBase } from "@material-ui/core"
import {
    Button,
    createStyles,
    Grid,
    makeStyles,
    Theme,
} from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import React, { useState } from "react"
import SearchIcon from "@material-ui/icons/Search"

export default function SearchInput({ onClick }) {
    const [searchText, setSearchText] = useState("")
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                padding: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
            },
            input: {
                marginLeft: theme.spacing(1),
                flex: 1,
            },
            iconButton: {
                padding: 10,
            },
            divider: {
                height: 28,
                margin: 4,
            },
        })
    )

    const classes = useStyles()
    return (
        <>
            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Buscar productos"
                    inputProps={{ "aria-label": "buscar productos" }}
                    onChange={(e) => setSearchText(e.currentTarget.value)}
                />
                <IconButton
                    className={classes.iconButton}
                    aria-label="search"
                    onClick={onClick}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        </>
    )
}
