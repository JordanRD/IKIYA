import React, { useState, useEffect } from 'react'
import { Accordion, Button, ButtonGroup, Card, Dropdown, Form, Table } from "react-bootstrap";
import { useDispatch, } from 'react-redux';
import { getStores, keepLogin, editStockData, deleteStockData, addStockData } from '../actions';
import AlertModal from '../components/alertModal'
export default function StockAccordion({ item, index }) {
    const { name, image, storages = [],id_product } = item
    const [stores, setStores] = useState([])
    const [newStock, setNewStock] = useState(0)
    const [selectedStore, setSelectedStore] = useState({})
    const [alertMessage, setAlertMessage] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        getStores(stores => setStores(stores.filter(i => storages.every(i2 => i2.id_store !== i.id_store))))
    }, [storages])
    const handleAdd = () => {
        if (+newStock < 0) return
        addStockData({ id_store: selectedStore.id_store, id_product, stock: newStock }, () => {
            setSelectedStore({})
            setNewStock(0)
            dispatch(keepLogin())
        })
    }
    return (
        <Accordion  defaultActiveKey={index+''}>
            <Card>
                <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <img alt={name} src={'http://localhost:2000/' + image} style={{ height: '50px', border: '1px solid black', padding: '2px', width: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                        <h4>{name}</h4>
                    </div>
                    <Accordion.Toggle as={Button} variant="dark" eventKey={index+''}>
                        <i className='fa fa-caret-square-up'/>
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse  eventKey={index+''}>
                    <Card.Body >
                        <Table bordered striped hover>
                            <thead>
                                <tr>
                                    <th>Store</th>
                                    <th>Stock</th>
                                    <th>Purchased Stock</th>
                                    <th >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {storages.map((item, index) => <TableRow setAlertMessage={setAlertMessage}  key={index} index={index} storage={item} minStock={storages.reduce((a,b)=>a+(b.stock-b.purchased_stock),0)} />)}
                                {
                                    stores.length>0&&
                                    <tr>
                                        <td style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Dropdown id={`dropdown-button-drop-up`}  drop='up' >
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    {selectedStore.name || 'Select Store'}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu style={{maxHeight:'150px',overflowY:'scroll'}}>
                                                    {stores.map(
                                                        store => <Dropdown.Item key={store.name} onClick={() => setSelectedStore(store)} >{store.name}</Dropdown.Item>
                                                    )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                        <td>
                                            <Form.Control style={{ textAlign: 'center' }} onChange={e => setNewStock(Math.max(+e.target.value, 0))} value={newStock} type="number" placeholder="Stock" min='0' />
                                        </td>
                                        <td></td>
                                        <td style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button onClick={handleAdd} disabled={!selectedStore.id_store || newStock < 0} variant='success'>Add</Button>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <AlertModal message={alertMessage} setShow={() => setAlertMessage('')}/>
        </Accordion>
    )
}

function TableRow({ storage = {}, minStock,setAlertMessage }) {
    const [edit, setEdit] = useState(false)
    const [newStock, setNewStock] = useState(0)
    const { store_name, stock, id_store, id_product, purchased_stock } = storage
    const dispatch = useDispatch()
    const handleSave = () => {
        if (newStock === stock || newStock < 0) return setEdit(false)
        if ((minStock - stock) + newStock < 0) return setAlertMessage(`You can not set the stock on the selected store to ${newStock}pcs,total stock can not be under the total of all the purchased stock`)
        editStockData({ id_store, id_product, stock: newStock }, () => {
            setEdit(false)
            dispatch(keepLogin())
        })
    }
    const handleDelete = () => {
        if(purchased_stock>0) return setAlertMessage('You can not delete the stock on the selected store because there is an available purchased stock')
        if ((minStock - stock) + newStock < 0) return setAlertMessage(`You can not delete the stock on the selected store,total stock can not be under the total of all the purchased stock`)
        deleteStockData({id_store, id_product},()=> dispatch(keepLogin()))
    }

    return (
        <tr>
            <td style={{ display: 'flex', justifyContent: 'center' }}>
                <Button style={{ pointerEvents: 'none' }} variant='success' >{store_name}</Button>
            </td>
            <td >
                {
                    edit ?
                        <Form.Control style={{ textAlign: 'center' }} value={newStock} onChange={e => setNewStock(Math.max(+e.target.value, 0))} type="number" placeholder="Stock" min='0' /> :
                        <h5 style={{ textAlign: 'center' }}>{stock}</h5>
                }
            </td>
            <td>
                <h5 style={{ textAlign: 'center' }}>{purchased_stock}</h5>
            </td>
            <td style={{ display: 'flex', justifyContent: 'center' }}>
                {
                    edit ?
                        <ButtonGroup>
                            <Button onClick={() => setEdit(false)} variant='danger'>
                                <i className='fa fa-ban' />
                            </Button>
                            <Button onClick={handleSave} variant='success'>
                                <i className='fa fa-save' />
                            </Button>
                        </ButtonGroup> :
                        <ButtonGroup>
                            <Button onClick={handleDelete} variant='danger'>
                                <i className='fa fa-trash' />
                            </Button>
                            <Button onClick={() => {
                                setNewStock(stock)
                                setEdit(true)
                            }} variant='success'>
                                <i className='fa fa-pen' />
                            </Button>
                        </ButtonGroup>
                }
            </td>
        </tr>
    )
}