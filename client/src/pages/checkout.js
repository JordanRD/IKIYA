import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dropdown, Button } from "react-bootstrap";
import { Link, Redirect, useHistory } from "react-router-dom";
import { checkoutCart, keepLogin } from '../actions'
import AlertModal from '../components/alertModal'
const SHIPMENT = [
    {
        price: 100000,
        type: 'Express',
        estimation: '1-2 bussiness days',
    },
    {
        price: 50000,
        type: 'Standard',
        estimation: '3-6 bussiness days',
    },
]

const PAYMENT = [
    {
        payment_method: 'TRANSFER',
        description: 'Transfer using BCA'
    },
    {
        payment_method: 'COD',
        description: 'Cash on delivery'
    }
]

export default function Checkout() {
    const { address, cart, username } = useSelector(state => state.user)
    const [selectedAddress, setSelectedAddress] = useState(0)
    const [selectedShipment, setSelectedShipment] = useState(SHIPMENT[0])
    const [selectedPayment, setSelectedPayment] = useState(PAYMENT[0])
    const [alertMessage, setAlertMessage] = useState('')
    const [backToCart, setBackToCart] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()

    const handleBuy = () => {
        if (!address[selectedAddress]) return setAlertMessage('Please select an address or add new')
        const allData = {
            ...address[selectedAddress],
            shipment_fee: selectedShipment.price,
            id_order: cart[0].id_order,
            payment_method: selectedPayment.payment_method
        }
        checkoutCart(allData, finishedOrderId => {
            dispatch(keepLogin())
            history.replace('/payment/' + finishedOrderId)
        }, err => {
            setAlertMessage(err)
            setBackToCart(true)
        })
    }
    if (!username || cart.length <= 0 || cart.some(itm => +itm.id_product_status !== 1)) return <Redirect to='/' />
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr ',
                minHeight: '70vh',
                placeItems: 'center',
                margin: '50px'
            }}>
            <div>
                <h3 style={{ fontWeight: '400', marginBottom: '20px' }}>Cart</h3>
                <div style={{ height: '100%', minHeight: '50vh', maxHeight: '70vh', minWidth: '300px', padding: '30px', overflowY: 'scroll', borderBottom: '2px solid #1a242a', borderTop: '2px solid #1a242a', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {cart.map((item, index) => <CartCardColumn item={item} key={index} />)}
                </div>
            </div>
            <div style={{ height: '100%', width: '350px' }}>
                <h3 style={{ fontWeight: '400', marginBottom: '20px' }}>Address</h3>
                <div style={{ height: '150px', width: '350px', padding: '0 20px', overflowY: 'scroll', borderBottom: '2px solid #1a242a', borderTop: '2px solid #1a242a' }}>
                    {address.map((item, index) => <AddressCard selected={selectedAddress} key={index + 3} setSelected={setSelectedAddress} index={index} item={item} />)}
                    <Button as={Link} to='/profile' style={{ margin: '10px 0' }} size='sm' variant='outline-success'>Add another address</Button>
                </div>
                <h3 style={{ fontWeight: '400', margin: '20px 0 10px 0' }}>Shipment</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Dropdown >
                        <Dropdown.Toggle size='sm' variant="outline-dark" >
                            {selectedShipment.type}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {SHIPMENT.map(
                                (item) => <Dropdown.Item onClick={() => setSelectedShipment(item)} key={item.type}>{item.type}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <p >
                        {selectedShipment.price.toLocaleString()} IDR <br />
                        {selectedShipment.estimation}
                    </p>
                </div>
                <h3 style={{ fontWeight: '400', margin: '20px 0 10px 0' }}>Payment</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Dropdown >
                        <Dropdown.Toggle size='sm' variant="outline-dark" >
                            {selectedPayment.payment_method}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {PAYMENT.map(
                                (item, index) => <Dropdown.Item onClick={() => setSelectedPayment(item)} key={index}>{item.payment_method}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <p >
                        {selectedPayment.description}
                    </p>
                </div>
                <div style={{ padding: '20px 0', borderTop: '2px solid #1a242a', margin: '10px 0' }}>
                    <h4 style={{ fontWeight: '400' }}>
                        Grand Total : {(cart.reduce((a, b) => a + (b.price * b.qty), 0) + selectedShipment.price).toLocaleString()} IDR
                    </h4>
                </div>
                <div>
                    <Button onClick={handleBuy} style={{ width: '100%' }} variant='dark'>Continue to payment</Button>
                </div>
            </div>
            <div>
                <AlertModal message={alertMessage} setShow={() => {
                    setAlertMessage('')
                    if (backToCart) history.replace('/cart')
                }} />
            </div>
        </div>
    )
}


function AddressCard({ item = {}, selected, setSelected, index }) {
    const { label, address_detail, city, postal_code } = item
    return (
        <div onClick={() => setSelected(index)} style={{ margin: '15px 0', width: '300px', boxShadow: `0 0 5px 1px ${selected === index ? 'green' : 'gray'}`, padding: '10px', cursor: 'pointer' }}>
            <p>
                <h4 style={{ fontWeight: '400' }}>{label}</h4>
                {city},{postal_code} <br />
                {address_detail}
            </p>
        </div>
    )
}


function CartCardColumn({ item: { name, qty, price, image } }) {
    return (
        <div style={{ height: '100px', width: '250px', display: 'flex', padding: '10px', border: '1px solid #1a242a', justifyContent: 'space-between' }}>
            <div style={{ borderRight: '0.5px solid #1a242a', width: '100%' }}>
                <p >
                    <h4 style={{ margin: '0', fontWeight: '400' }}>{name}</h4>
                    {qty}pcs<br />
                    {(price * qty).toLocaleString()} IDR
                        </p>
            </div>
            <img style={{ height: '100%', objectFit: 'cover', padding: '5px' }} src={"http://localhost:2000/" + image} alt={name} />
        </div>
    )
}