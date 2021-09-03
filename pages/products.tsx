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
import { fetchOperations } from "../redux/thunks/operationThunks"
import { fetchPayments } from "../redux/thunks/paymentThunks"
import { AppDispatch, RootState } from "../redux/store"
import { IProduct } from "../Interfaces/interfaces"

const Products = () => {
    const [openCartModal, setOpenCartModal] = useState(false)
    const [cartItem, setCartItem] = useState<IProduct>({} as IProduct)
    const [openProductModal, setOpenProductModal] = useState(false)
    const [actualProduct, setActualProduct] = useState({})
    const [isEditingProduct, setIsEditingProduct] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    const productsSelector = useSelector(
        ({ productsReducer }: RootState) => productsReducer.products
    )
    const isLoading = useSelector(
        ({ loadingReducer }: RootState) => loadingReducer.loading
    )
    const [productsList, setProductsList] = useState<IProduct[] | null>([])

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories())
        dispatch(fetchOperations())
        dispatch(fetchPayments())
    }, [dispatch])

    useEffect(() => {
        if (productsSelector) {
            setProductsList(productsSelector)
        }
    }, [productsSelector])

    const handleCartItemClick = (id: string) => {
        const findProduct = productsSelector.find((p: IProduct) => p._id === id)
        setCartItem(findProduct)
        setOpenCartModal(true)
    }
    const handleAcceptCartChanges = () => {
        setOpenCartModal(false)
        dispatch(fetchProducts())
    }

    const handleEditProduct = (id: string) => {
        const findProduct = productsSelector.find((p: IProduct) => p._id === id)
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
        const filtro = productsSelector.filter((p: IProduct) => {
            return (
                p.name.toLowerCase().trim().includes(text.toLowerCase()) ||
                p.code_bar.toLowerCase().includes(text.toLowerCase().trim())
            )
        })
        setProductsList(filtro)
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
                        handleClose={() => {
                            setOpenCartModal(false)
                        }}
                        handleAccept={() => handleAcceptCartChanges()}
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
