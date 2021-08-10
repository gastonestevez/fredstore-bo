import { AppBar, Button, Toolbar, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useRouter } from "next/router"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}))

const AppNavbar = () => {
    const classes = useStyles()
    const router = useRouter()

    const transferToProducts = () => {
        router.push({
            pathname: "/products",
            // query: pushParams
        })
    }
    
    const transferToTransactions = () => {
        router.push({
            pathname: "/transactions",
        })
    }
    
    const transferToHome = () => {
        router.push({
            pathname: "/",
        })
    }
    
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Button onClick={() => transferToHome()} color="inherit">
                    <Typography
                        className={classes.menuButton}
                        variant="h6"
                        color="inherit"
                    >
                        Vet-Este - Store
                    </Typography>
                </Button>
                <Button onClick={() => transferToProducts()} color="inherit">
                    Productos
                </Button>
                <Button onClick={() => transferToTransactions()} color="inherit">
                    Historial
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default AppNavbar
