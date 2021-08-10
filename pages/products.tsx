import { Container } from '@material-ui/core'
import React from 'react'
import { H1 } from '../common/styles/Headings.styled'
import ProductTable from '../components/ProductTable/ProductTable'

const products = () => {
    return (
        <Container>
            <H1>Listado de productos</H1>
            <ProductTable />
        </Container>
    )
}

export default products