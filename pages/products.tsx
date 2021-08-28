import { CircularProgress, Container } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import ProductTable from "../components/ProductTable/ProductTable"
import SearchInput from "../components/SearchInput/SearchInput"
import CartModal from "../components/CartModal"
import ProductModal from "../components/ProductModal/ProductModal"
import HeaderSection from "../components/HeaderSection/HeaderSection"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../redux/thunks/productThunks"
import { fetchCategories } from "../redux/thunks/categoryThunks"

const Products = () => {
    const [openCartModal, setOpenCartModal] = useState(false)
    const [cartItem, setCartItem] = useState({})
    const [openProductModal, setOpenProductModal] = useState(false)
    const [actualProduct, setActualProduct] = useState({})
    const [isEditingProduct, setIsEditingProduct] = useState(false)

    const dispatch = useDispatch()
    const productsSelector = useSelector(
        ({ productsReducer }) => productsReducer.products
    )
    const isLoading = useSelector(
        ({ loadingReducer }) => loadingReducer.loading
    )
    const [productsList, setProductsList] = useState([])

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories())
    }, [dispatch])

    useEffect(() => {
        if(productsSelector) {
            setProductsList(productsSelector)
        }
    }, [productsSelector])

    const handleCartItemClick = (id: number) => {
        //hardcoded item
        setCartItem({
            id,
            name: "Sertal Compuesto",
            sellPrice: 1300,
            stock: 100,
            brand: "Test Brand",
        })
        setOpenCartModal(true)
    }
    const handleAcceptCartChanges = (changedItem: any) => {
        setOpenCartModal(false)
    }

    const handleEditProduct = (id: number) => {
        const findProduct = productsSelector.find((p: any) => p.id === id)
        setActualProduct(findProduct)
        setIsEditingProduct(true)
        setOpenProductModal(true)
    }

    const handleAddProduct = () => {
        setIsEditingProduct(false)
        setOpenProductModal(true)
    }

    const handleCloseProductModal = (saved: boolean = false) => {
        if (saved) {
            dispatch(fetchProducts())
        }
        setActualProduct({})
        setOpenProductModal(false)
    }

    const handleOnSearchChange = (text: string) => {
        setProductsList(
            productsSelector.filter((p: any) => {
                return (
                    p.name
                        .toLowerCase()
                        .trim()
                        .includes(text.toLocaleLowerCase()) ||
                    p.codeBar.toLowerCase().includes(text.toLowerCase().trim())
                )
            })
        )
    }

    return (
        <Container>
            {!isLoading ? (
                <div>
                    <SearchInput onChange={handleOnSearchChange} />

                    <HeaderSection
                        title="Listado de Productos"
                        onClickAdd={handleAddProduct}
                        disableAddButton={false}
                    />
                    <ProductTable
                        handleCartItemClick={handleCartItemClick}
                        handleEditProduct={handleEditProduct}
                        products={productsList}
                    />
                    <CartModal
                        open={openCartModal}
                        handleClose={() => setOpenCartModal(false)}
                        handleAccept={(newCartItem: any) =>
                            handleAcceptCartChanges(newCartItem)
                        }
                        cartItem={cartItem}
                    />
                    <ProductModal
                        open={openProductModal}
                        handleClose={(saved: boolean) =>
                            handleCloseProductModal(saved)
                        }
                        isEditing={isEditingProduct}
                        product={actualProduct}
                    />
                </div>
            ) : (
                <CircularProgress
                    style={{ display: "flex", margin: "0 auto" }}
                />
            )}
        </Container>
    )
}

export default Products
