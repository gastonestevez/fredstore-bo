import { Paper } from "@material-ui/core"
import { IconButton } from "@material-ui/core"
import { InputBase } from "@material-ui/core"
import {
    createStyles,
    makeStyles,
    Theme,
} from "@material-ui/core"
import React, { useState } from "react"
import SearchIcon from "@material-ui/icons/Search"

export default function SearchInput({ onClick }) {
    const [searchText, setSearchText] = useState("")
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                padding: "2px 4px",
                width: '500px',
            },
            input: {
                marginLeft: theme.spacing(1),
                flex: 1,
                width: '87%',
            },
            iconButton: {
                padding: 10,
            },
            divider: {
                height: 28,
                margin: 4,
            },
            base: {
                width: '100%',
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                justifyItems: "center",
            }
        })
    )

    const classes = useStyles()
    return (
        <div className={classes.base}>
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
        </div>
    )
}
