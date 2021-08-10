import { useRouter } from "next/router"

const ProductDetail = () => {
    const router = useRouter()
    return (
        <>
            <h2>Este es el detalle del producto: {router.query.id}</h2>
        </>
    )
}

export default ProductDetail