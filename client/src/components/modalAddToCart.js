import React, { useState} from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {useHistory}from 'react-router-dom'
export default function ModalAddToCart({ show, setShow, product = {},confirmAddToCart }) {
    const { stock, name, } = product
    const { username } = useSelector(state => state.user)
    const [userQty, setUserQty] = useState(0)
    const history = useHistory()

    const handleAddToCart = () => {
        if (!username) return history.replace('/login')
        if (userQty === 0||stock<=0) return setShow()
        confirmAddToCart(userQty)
        setUserQty(1)
        setShow()
    }

    return (
        <Modal
            show={show}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header onClick={() => {
                setShow()
                setUserQty(1)
            }} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: '300px', position: 'relative', display: 'grid', placeItems: 'center' }}>
                <h2 style={{ fontWeight: '400' }}>{name}</h2>
                <p style={{ fontStyle: 'italic' }}>
                    {stock <= 0 ? 'Out of stock' : `Available stock : ${stock}`}
                    <br />
                </p>
                <div style={{ display: 'flex' }}>
                    <Button size='sm' onClick={() => setUserQty(p => p <= 0 ? p : p - 1)} variant='danger' style={{ borderRadius: 0 }}>-</Button>
                    <Form.Control
                        size="sm"
                        type="number"
                        style={{ borderRadius: 0, width: '70px', textAlign: 'center' }}
                        value={userQty}
                        placeholder='qty'
                        onChange={i => {
                            let { value } = i.target
                            setUserQty(value <= 0 ? 1 : value > stock ? stock : value)
                        }}
                    />
                    <Button onClick={() => setUserQty(p => p >= stock ? p : p + 1)} size='sm' variant='success' style={{ borderRadius: 0 }}>+</Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button size='sm' disabled={stock<=0} variant='success' onClick={handleAddToCart}>Add to cart</Button>
            </Modal.Footer>
        </Modal>
    )
}


/**
korken 14
bdg 6 0
bgr 1 0
jkt 5 14
bsd 2 0
0

hauga 4
bdg 8 0 8
jkt 4 4 0
bsd 2 0 2

vattenkrase 16
bdg 9 0 3
bgr 2 0 0
jkt 8 16 0


fejka2 3
bdg 5 0 5
jkt 6 3 3

musken 1
bdg 8 0 8
jkt 4 1 3
 */