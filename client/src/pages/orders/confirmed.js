import React, { useEffect, useState } from 'react'
import { getOrder, cancelOrder, confirmOrder } from '../../actions'
import CanceledOrderModal from '../../components/canceledOrderModal'
import OrderAccordion from '../../components/orderAccordion'
import OrderModal from '../../components/orderModal'
import PaginationComp from '../../components/pagination'
const perPage = 10

export default function Confirmed() {
    const [confirmedProduct, setConfirmedProduct] = useState([])
    const [paymentImage, setPaymentImage] = useState('')
    const [canceledIdOrder, setCanceledIdOrder] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [show, setShow] = useState(false)
    const [page, setPage] = useState(0)
    const [orderBy, setOrderBy] = useState('latest')
    const [search, setSearch] = useState('')

    useEffect(() => {
        getOrder({ id_order_status: 3, page, search, perPage, orderBy }, data => setConfirmedProduct(data))

    }, [refresh, page, orderBy, search])

    const handleCancel = message => {
        const allData = { message, id_order: canceledIdOrder }
        cancelOrder(allData, _ => {
            setShow(false)
            setCanceledIdOrder(null)
            setRefresh(p=>!p)
        })
    }

    const handleDelivery = id_order => {
        // alert(id_order)
        confirmOrder(id_order, () => setRefresh(p => !p))
    }



    return (
        <PaginationComp search={search} setSearch={setSearch} page={page} perPage={perPage} setPage={setPage} length={confirmedProduct.length} setOrderBy={setOrderBy} orderBy={orderBy} >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '0 40px 40px 40px' }}>
                {confirmedProduct.map(
                    (item, index) =>
                        <OrderAccordion
                            handleCancel={id_order => {
                                setCanceledIdOrder(id_order)
                                setShow(true)
                            }}
                            handleDelivery={handleDelivery}
                            showModal={setPaymentImage}
                            item={item}
                            key={index}
                        />)}
                <OrderModal show={Boolean(paymentImage)} title='Payment approvals' payment_image={paymentImage} handleClose={() => setPaymentImage('')} />
                <CanceledOrderModal show={show} setShow={() => setShow(false)} handleSubmit={handleCancel} />
            </div>
        </PaginationComp>
    )
}
