import React, { useState ,useEffect} from 'react'
import { Modal, Button, Dropdown, Form } from 'react-bootstrap'

export function MoveStock({ show, handleSubmit, setShow, storages }) {
    const [stock, setStock] = useState(0)
    const [storageIndex, setStorageIndex] = useState(0)
    const handleStock = ({ target: { value } }) => {
        const limitTotal = storages[storageIndex].stock - storages[storageIndex].purchased_stock
        const stockValid = value <= 0 ? 0 : value > limitTotal ? +limitTotal : +value;
        setStock(stockValid)
    }
    const handleMove = () => {
        let newStock = storages.map((item, index) => {
            if (index === storageIndex) item.stock -= stock;
            else item.stock += stock
            return item
        })
        handleSubmit(newStock)
    }
    return (
        <Modal
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header onClick={setShow} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Move stock
        </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                <Form.Group style={{ display: 'flex', gap: '20px' }}>
                    <Dropdown>
                        <Dropdown.Toggle style={{ width: '80px' }} variant="success" id="dropdown-basic">
                            From
                    </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {storages.map((item, index) => (
                                <Dropdown.Item key={index+877} onClick={() => {
                                    setStorageIndex(index)
                                    setStock(0)
                                }} >{item.name}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    {storages?.[storageIndex]?.id_store === 2 ?
                        <Button disabled variant='success'>BDG</Button> :
                        <Button disabled variant='success'>JKT</Button>
                    }
                </Form.Group>
                <Form.Group>
                    <Form.Control value={stock} onChange={handleStock} type='number' placeholder='stock' />
                </Form.Group>
                <Form.Group>
                    {storages?.[storageIndex]?.id_store === 1 ?
                        <Button disabled variant='success'>BDG</Button> :
                        <Button disabled variant='success'>JKT</Button>
                    }
                </Form.Group>
            </Modal.Body>
            <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>{
                    storages.map((item, index) => (
                        index === storageIndex ?
                            <span key={index}>
                                {item.name} : {item.stock - stock} PCS<br />
                            </span> :
                            <span key={index}>
                                {item.name} : {item.stock + stock} PCS<br />
                            </span>
                    ))
                }</p>
                <Button onClick={handleMove} variant='success'>Move</Button>
            </Modal.Footer>
        </Modal>
    )
}
export function AddStock({ show, handleSubmit, setShow, storages }) {
    const [editStorage, setEditStorage] = useState([])
     useEffect(() => {
        if(show&&editStorage.length===0)setEditStorage(storages)
    },[show,storages,editStorage])
    // console.log(editStorage)
    return (
        <Modal
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header onClick={setShow} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Stock
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: 'flex', placeItems: 'center' }}>
                <Form >
                    {
                        editStorage.map((item, idx) => (
                            <Form.Group key={idx} style={{ display: 'flex', gap: '20px' }}>
                                <Button variant='success' style={{ width: '70px' }}>{item.name}</Button>
                                <Form.Control onChange={
                                    ({ target }) => {
                                        setEditStorage(p => {
                                            p[idx].stock = +Math.max(item.purchased_stock,target.value)
                                            return [...p]
                                        })
                                    }
                                } value={item.stock} style={{ width: '150px' }} type='number' placeholder='stock' />
                            </Form.Group>
                        ))
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>handleSubmit(editStorage)} variant='danger'>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}
