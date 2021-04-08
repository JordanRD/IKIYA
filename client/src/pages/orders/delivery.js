import React, { useEffect, useState } from 'react'
import { getOrder, completeOrder } from '../../actions'
import OrderAccordion from '../../components/orderAccordion'
import ConfirmationModal from '../../components/confirmationModal'
import PaginationComp from '../../components/pagination'
const perPage = 5

export default function Delivery() {
    const [deliveryProduct, setDeliveryProduct] = useState([])
    const [arrivedProduct,setArrivedProduct]=useState(null)
    const [refresh,setRefresh]=useState(false)
    const [show, setShow] = useState(false)
    const [page, setPage] = useState(0)
    const [orderBy, setOrderBy] = useState('latest')

    useEffect(() => {
        getOrder({ id_order_status: 4, page, perPage, orderBy }, data => setDeliveryProduct(data))
        
    }, [refresh, page, orderBy])

    const handleSubmit = () => {
    // alert(arrivedProduct)
        setShow(false)
        completeOrder(arrivedProduct,()=>setRefresh(p=>!p))
    }


    if (!deliveryProduct.length) return (
        <div style={{ display: 'grid', placeItems: 'center', height: '40vh' }}>
            <h2>Empty</h2>
        </div>
    )

    return (
        <PaginationComp page={page} perPage={perPage} setPage={setPage} length={deliveryProduct.length} setOrderBy={setOrderBy} orderBy={orderBy} >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '0 40px 40px 40px' }}>
            {deliveryProduct.map((item, index) => <OrderAccordion item={item} key={index} showModal={() => {
                setArrivedProduct(item.id_order)
                setShow(true)
            }} />)}

            <ConfirmationModal
                title='Confirmation'
                message={
                    <>
                        Are you sure you want to complete order with order number : <b>{arrivedProduct}</b>
                </>
            }
                show={show}
                setShow={() => setShow(false)}
                handleSubmit={handleSubmit}
            />
            </div>
        </PaginationComp>
    )
}
