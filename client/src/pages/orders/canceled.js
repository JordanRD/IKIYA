import React, { useEffect, useState } from 'react'
import { getOrder } from '../../actions'
import OrderAccordion from '../../components/orderAccordion'
import HistoryModal from '../../components/historyModal'
import PaginationComp from '../../components/pagination'
const perPage = 10

export default function Canceled() {
    const [canceledProduct, setCanceledProduct] = useState([])
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const [page, setPage] = useState(0)
    const [orderBy, setOrderBy] = useState('latest')
    const [search,setSearch]=useState('')
    useEffect(() => {
        getOrder({ id_order_status: 6, page, perPage, orderBy, search} , data => setCanceledProduct(data))
    }, [page, orderBy, search])


    return (
        <PaginationComp page={page} search={search} setSearch={setSearch} perPage={perPage} setPage={setPage} length={canceledProduct.length} setOrderBy={setOrderBy} orderBy={orderBy} >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '0 40px 40px 40px' }}>
            {canceledProduct.map(
                (item, index) =>
                    <OrderAccordion
                        showModal={() => {
                            setMessage(item.message)
                            setShow(true)
                        }}
                        item={item}
                        key={index}
                    />
            )}
            <HistoryModal show={show} handleClose={()=>setShow(false)} title='Cancel Message' message={message}/>
            </div>
        </PaginationComp>
    )
}
