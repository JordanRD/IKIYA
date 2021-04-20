import React, { useEffect, useState } from 'react'
import { getOrder, cancelOrder } from '../../actions'
import CanceledOrderModal from '../../components/canceledOrderModal'
import OrderAccordion from '../../components/orderAccordion'
import PaginationComp from '../../components/pagination'
const perPage = 10

export default function Pending() {
    const [pendingProduct, setPendingProduct] = useState([])
    const [canceledIdOrder, setCanceledIdOrder] = useState(null)
    const [show, setShow] = useState(false)
    const [page, setPage] = useState(0)
    const [orderBy, setOrderBy] = useState('latest')
    const [search, setSearch] = useState('')

    useEffect(() => {
        getOrder({ id_order_status: 2, search, page, perPage, orderBy}, data => setPendingProduct(data))
        
    }, [show, page, orderBy, search])


    const handleSubmit = message => {
        const allData = { message, id_order: canceledIdOrder }
        cancelOrder(allData, _ => {
            setShow(false)
            setCanceledIdOrder(null)
        })
    }

    return (
        <PaginationComp search={search} setSearch={setSearch} page={page} perPage={perPage} setPage={setPage} length={pendingProduct.length} setOrderBy={setOrderBy} orderBy={orderBy} >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '0 40px 40px 40px' }}>
            {pendingProduct.map(
                (item, index) =>
                    <OrderAccordion
                        handleCancel={id_order => {
                            setCanceledIdOrder(id_order)
                            setShow(true)
                        }}
                        item={item}
                        key={index}
                    />
            )}
            <CanceledOrderModal show={show} setShow={() => setShow(false)} handleSubmit={handleSubmit} />
            </div>
        </PaginationComp>
    )
}
