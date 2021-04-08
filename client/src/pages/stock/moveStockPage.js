import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form, Button, NavDropdown } from 'react-bootstrap'
import { getAllProductAdmin, getMoveStore ,moveStock} from '../../actions'
import AlertModal from '../../components/alertModal'
const MyImg = styled.img`
    height:120px;
    width:120px;
    object-fit:cover;
    background-color: #1a242a;
    padding:3px;
    transition:200ms ease-in-out;
    ${props => props.selected ? 'transform:scale(1.1);' : 'filter:grayscale(80%)'}
    
`
const perPage = 5
export default function MoveStockPage() {
    const [productData, setProductData] = useState([])
    const [selectedProduct, setSelectedProduct] = useState({})
    const [origin, setOrigin] = useState({})
    const [destination, setDestination] = useState({})
    const [storageData, setStorageData] = useState([])
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const [newStock, setNewStock] = useState(0)
    const [alertMessage,setAlertMessage]=useState('')
    useEffect(() => {
        getAllProductAdmin({ search, page, perPage }, data => setProductData(data))
        setSelectedProduct({})
    }, [page, search])

    const handleSelect = item => {
        getMoveStore(item.id_product, data => {
            if(data.length<2)return setAlertMessage('You can not move stock from this product because the product have less than 2 storage')
            setSelectedProduct(item)
            setStorageData(data)
            setDestination({})
            setOrigin({})
        })
    }

    const resetAll = () => {
        setDestination({})
        setOrigin({})
        setNewStock(0)
        setSelectedProduct({})
        setStorageData([])
        setPage(0)
        setSearch('')
    }

    const handleSave = () => {
        if (!destination.id_product || !origin.id_product || !selectedProduct.id_product) {
            setAlertMessage('unexpected error please try again later')
            return resetAll()
        }
        if (newStock === 0) {
            setAlertMessage(`${newStock}pcs product from ${origin.store_name} has been moved to ${destination.store_name}`)
            return resetAll()
        }
        let editedOrigin={...origin,stock:origin.stock-newStock}
        let editedDestination = { ...destination, stock: destination.stock + newStock }
        moveStock({
            destination: editedDestination,
            origin: editedOrigin,
            id_product: selectedProduct.id_product
        }, err => {
            if (err) setAlertMessage(err)
            else setAlertMessage(`${newStock}pcs product from ${origin.store_name} has been moved to ${destination.store_name}`)
            resetAll()
        })
    }

    return (
        <div style={{ display: 'grid', placeItems: 'center', minHeight: '60vh', padding: '30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', alignItems: 'center' }}>
                <Form.Control
                    value={search}
                    placeholder='Search'
                    type='text'
                    style={{ width: '200px' }}
                    onChange={e => {
                        setSearch(e.target.value)
                        setPage(0)
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '800px' }}>
                    <Button onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page <= 0} variant='outline-dark'><i className='fa fa-arrow-left' /></Button>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-around' }}>
                        {productData.map(
                            (item, index) =>
                                <div key={index} onClick={() => {
                                    setNewStock(0)
                                    if (selectedProduct.id_product === item.id_product) return setSelectedProduct({})
                                    handleSelect(item)
                                }} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '5px', cursor: 'pointer' }}>
                                    <MyImg selected={selectedProduct.id_product === item.id_product} src={"http://localhost:2000/" + item.image} alt="fref" />
                                    <p >{item.name}</p>
                                </div>
                        )}
                    </div>
                    <Button onClick={() => setPage(p => Math.min(p + 1, perPage))} disabled={productData.length < perPage} variant='outline-dark'><i className='fa fa-arrow-right' /></Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '30px', alignItems: 'center', minHeight: '110px' }}>
                    {selectedProduct.id_product ?
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                                <span>Origin</span>
                                <NavDropdown title={origin.store_name || 'select'} id="basic-nav-dropdown">
                                    {storageData.map((item, index) => (
                                        <NavDropdown.Item onClick={() => {
                                            if (item.id_store === destination.id_store) {
                                                setDestination(origin)
                                            }
                                            setNewStock(0)
                                            setOrigin(item)
                                        }} key={index} >{item.store_name}</NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                                <span>Stock :  {origin.stock ? origin.stock -newStock : 0}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                                <i>{ selectedProduct.name}</i>
                                <Form.Control value={newStock} disabled={!destination.id_store||!origin.id_store} onChange={e => {
                                    const value = Math.max(e.target.value, 0)
                                    setNewStock(p=>value>origin.stock?origin.stock:value)
                                }} size='sm' placeholder='Stock' min='0' type='number' />
                                <Button onClick={handleSave} disabled={!(destination.store_name && origin.store_name)} variant='success' size='sm'>Save</Button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                                <span>Destination</span>
                                <NavDropdown title={destination.store_name || 'select'} id="basic-nav-dropdown">
                                    {storageData.map((item, index) => (
                                        item.id_store === origin.id_store||
                                        <NavDropdown.Item onClick={() => {
                                            if (item.id_store === origin.id_store) {
                                                setOrigin(destination)
                                            }
                                            setDestination(item)
                                            setNewStock(0)
                                        }} key={index} >{item.store_name}</NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                                <span>Stock : {destination.stock ?destination.stock+newStock:0}</span>
                            </div>
                        </> :
                        null
                    }
                </div>
            </div>
            <AlertModal message={alertMessage} setShow={() => setAlertMessage('')}/>
        </div>
    )
}
