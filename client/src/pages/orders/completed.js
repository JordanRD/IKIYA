import React, { useEffect, useState } from 'react'
import { getOrder } from '../../actions'
import OrderAccordion from '../../components/orderAccordion'
import PaginationComp from '../../components/pagination'
const perPage = 10

export default function Completed() {
    const [completedProduct, setCompletedProduct] = useState([])
    const [page, setPage] = useState(0)
    const [orderBy, setOrderBy] = useState('latest')
    const [search, setSearch] = useState('')

    useEffect(() => {
        getOrder({ id_order_status: 5, page, perPage, orderBy, search}, data => setCompletedProduct(data))
    }, [page, orderBy, search])
    

    return (
        <PaginationComp search={search} setSearch={setSearch} page={page} perPage={perPage} setPage={setPage} length={completedProduct.length} setOrderBy={setOrderBy} orderBy={orderBy} >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '0 40px 40px 40px' }}>
            {completedProduct.map((item, index) => <OrderAccordion item={item} key={index} />)}
            </div>
        </PaginationComp>
    )
}
