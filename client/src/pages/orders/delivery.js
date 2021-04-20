import React, { useEffect, useState } from 'react'
import { getOrder, completeOrder } from '../../actions'
import OrderAccordion from '../../components/orderAccordion'
import ConfirmationModal from '../../components/confirmationModal'
import PaginationComp from '../../components/pagination'
const perPage = 10

export default function Delivery() {
    const [deliveryProduct, setDeliveryProduct] = useState([])
    const [arrivedProduct,setArrivedProduct]=useState(null)
    const [refresh,setRefresh]=useState(false)
    const [show, setShow] = useState(false)
    const [page, setPage] = useState(0)
    const [orderBy, setOrderBy] = useState('latest')
    const [search, setSearch] = useState('')

    useEffect(() => {
        getOrder({ id_order_status: 4, page, search, perPage, orderBy }, data => setDeliveryProduct(data))
        
    }, [refresh, page, search, orderBy])

    const handleSubmit = () => {
    // alert(arrivedProduct)
        setShow(false)
        completeOrder(arrivedProduct,()=>setRefresh(p=>!p))
    }



    return (
        <PaginationComp search={search} setSearch={setSearch} page={page} perPage={perPage} setPage={setPage} length={deliveryProduct.length} setOrderBy={setOrderBy} orderBy={orderBy} >
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
