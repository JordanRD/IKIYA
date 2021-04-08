import React, { useState, useEffect } from 'react'
import { Modal, ListGroup, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { getStoreDetails, getStoreProductDetails, addNewStore } from '../../actions'
import MapsSelect from '../../components/mapsSelect'
import PaginationSearch from '../../components/paginationSearch'
import AlertModal from '../../components/alertModal'
const MyDiv = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items: center;
background-color:#1a242a;
height:150px;
width:150px;
border-radius:3px;
color:white;
cursor:pointer;
transition : all 500ms;
&:hover{
    transform : scale(1.02) ;
    box-shadow:0 0 1px 0.5px black
}
`

const perPage1 = 50
export default function ManageStore() {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(0)
    const [storeData, setStoreData] = useState([])
    const [selectedIdStore, setSelectedIdStore] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showAddStore, setShowAddStore] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    useEffect(() => {
        getStoreDetails({ page, perPage: perPage1, search }, data => setStoreData(data))
    }, [search, page])
    const handleAddStore = (newStoreData) => {
        if (!newStoreData.lng || !newStoreData.lat || !newStoreData.store_name) {
            setAlertMessage('Empty input')
            setShowAddStore(false)
            return
        }
        addNewStore(newStoreData, err => {
            setShowAddStore(false)
            if (err) return setAlertMessage(err)
            setAlertMessage('add store success');
            setSearch(newStoreData.store_name)
        })
    }
    return (
        <div style={{ display: 'grid', placeItems: 'center', padding: '0 50px 50px 50px' }}>
            <PaginationSearch setPage={setPage} page={page} length={storeData.length} perPage={perPage1} setSearch={setSearch} search={search} />
            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {storeData.map(
                    (item, index) =>
                        <MyDiv onClick={() => {
                            setShowModal(true)
                            setSelectedIdStore(item.id_store)
                        }} key={index}>
                            <h4>{item.store_name}</h4>
                            <span>{item.total_product} product</span>
                        </MyDiv>
                )}
                <MyDiv onClick={() => setShowAddStore(true)}>
                    <i className='fa fa-plus-square' style={{ fontSize: '25px' }} />
                </MyDiv>
            </div>
            <ProductModalDetail id_store={selectedIdStore} setShow={() => setShowModal(false)} show={showModal} />
            <AddStoreModal handleAddStore={handleAddStore} setShow={() => setShowAddStore(false)} show={showAddStore} />
            <AlertModal message={alertMessage} setShow={() => setAlertMessage('')} />
        </div>
    )
}

const perPage2 = 7
function ProductModalDetail({ show, setShow, id_store }) {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(0)
    const [productDetail, setProductDetail] = useState([])
    useEffect(() => {
        if (show) getStoreProductDetails({ search, page, id_store,perPage:perPage2 }, data => setProductDetail(data))
        else {
            setPage(0)
            setSearch('')
        }
    }, [show, search, id_store, page])
    return (
        <Modal
            show={show}
            size="lg"
            centered
        >
            <Modal.Header onClick={setShow} closeButton>
                <Modal.Title >
                    All products
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PaginationSearch setPage={setPage} page={page} length={productDetail.length} perPage={perPage2} setSearch={setSearch} search={search} />
                <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                    <ListGroup>
                        {productDetail.map((item, index) =>
                            <ListGroup.Item key={index + 44} style={{ display: 'flex', gap: '20px', alignItems: 'center' }} >
                                <img alt='wfew' style={{ height: '100px', width: '100px', padding: '5px', borderRight: '1px solid #dbdbdb', objectFit: 'cover' }} src={'http://localhost:2000/' + item.image} />
                                <div>
                                    {item.name}<br />
                                    {item.stock}pcs
                                </div>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </div>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}
function AddStoreModal({ show, setShow, handleAddStore }) {
    const [newStoreName, setNewStoreName] = useState('')
    const [storeCordinates, setStoreCordinates] = useState({})
    return (
        <Modal
            show={show}
            size="lg"
            centered
        >
            <Modal.Header onClick={setShow} closeButton>
                <Modal.Title >
                    Add new store
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control type='text' placeholder='Store name' value={newStoreName} onChange={e => setNewStoreName(e.target.value)} />
                <MapsSelect setStoreCordinates={setStoreCordinates} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    handleAddStore({ store_name: newStoreName.toUpperCase(), ...storeCordinates })
                }} variant='success'>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}