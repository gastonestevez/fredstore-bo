import { Container } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import ProductTable from "../components/ProductTable/ProductTable"
import SearchInput from "../components/SearchInput/SearchInput"
import CartModal from "../components/CartModal"
import ProductModal from "../components/ProductModal/ProductModal"
import HeaderSection from "../components/HeaderSection/HeaderSection"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../redux/thunks/productThunks"

const Products = () => {
    const [openCartModal, setOpenCartModal] = useState(false)
    const [cartItem, setCartItem] = useState({})
    const handleOnSearchClick = (text: string) => {
        console.log("Input text: ", text)
    }
    const [openProductModal, setOpenProductModal] = useState(false)
    const [actualProduct, setActualProduct] = useState({})
    const [isEditingProduct, setIsEditingProduct] = useState(false)

    const dispatch = useDispatch()
    const productsList = useSelector(({ productsReducer }) => productsReducer.products)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

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
        console.log("*** Updating item => ", changedItem)
        setOpenCartModal(false)
    }

    const handleEditProduct = (id: number) => {
        const mockProduct = {
            id,
            name: "Sertal Compuesto",
            sellPrice: 250,
            buyPrice: 100,
            description: "Sirve para calmar el dolor de pancita.",
            category: "FARMACIA",
            codeBar: "20124821750128",
            stock: 300,
            brand: "P&G",
            visibility: true,
        }
        setActualProduct(mockProduct)
        setIsEditingProduct(true)
        setOpenProductModal(true)
    }

    const handleAddProduct = () => {
        setIsEditingProduct(false)
        setOpenProductModal(true)
    }

    const handleSaveProduct = (product: any) => {
        console.log("*** Saving product: ", product)
    }

    return (
        <Container>
            <SearchInput onClick={handleOnSearchClick} />
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
                handleClose={() => setOpenProductModal(false)}
                handleSaveProduct={(p) => handleSaveProduct(p)}
                isEditing={isEditingProduct}
                product={actualProduct}
            />
        </Container>
    )
}

export default Products
