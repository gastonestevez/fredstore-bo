import Head from "next/head"
import { AppProps } from "next/app"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import { CacheProvider, EmotionCache } from "@emotion/react"
import theme from "../src/theme"
import createEmotionCache from "../src/createEmotionCache"
import AppNavbar from "../components/AppNavbar/AppNavbar"
import { Provider } from "react-redux"
import { useStore } from "../redux/store"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props
    const store = useStore(pageProps.initialReduxState)
    return (
        <Provider store={store}>
            <CacheProvider value={emotionCache}>
                <Head>
                    <title>FredStore</title>
                    <meta
                        name="viewport"
                        content="initial-scale=1, width=device-width"
                    />
                </Head>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <AppNavbar />
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </Provider>
    )
}
