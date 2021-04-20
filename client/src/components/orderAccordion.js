import React from 'react'
import { Card, Accordion, Button } from 'react-bootstrap'
export default function OrderAccordion({ item, index, showModal, handleCancel, handleDelivery }) {
    return (
        <div>
            <Accordion >
                <Card>
                    <Card.Header style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{display: 'flex',gap:'10px',alignItems:'center'}}>
                            <Accordion.Toggle as={Button} variant="outline-dark" eventKey={index + ''}>
                                <i className="far fa-caret-square-down"></i>
                            </Accordion.Toggle>
                            <span style={{ fontWeight: '500' }}>ORDER NO : {item.id_order}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexDirection: 'row-reverse' }}>
                            {
                                (item.id_order_status === 2 || item.id_order_status === 3) &&
                                <Button variant='danger' onClick={() => handleCancel(item.id_order)} style={{ width: '50px', height: '80px', display: 'grid', placeItems: 'center', margin: 0 }}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            }
                            {
                                item.id_order_status === 3 &&
                                <Button onClick={() => handleDelivery(item.id_order)} variant='success' style={{ width: '50px', height: '80px', display: 'grid', placeItems: 'center' }}>
                                    <i className="fas fa-truck-loading"></i>
                                </Button>
                            }
                            {
                                item.id_order_status === 4 &&
                                <Button variant='success' onClick={showModal} style={{ height: '80px' }}>
                                    <i className="fas fa-check"></i>
                                </Button>
                            }
                            {
                                item.id_order_status === 6 &&
                                <Button variant='dark' onClick={showModal} style={{ height: '80px' }}>
                                    <i className="fas fa-envelope"></i>
                                </Button>
                            }
                            {
                                (item.id_order_status === 3 && item.payment_method === 'TRANSFER') &&
                                <Button onClick={() => showModal(item.payment_image)} variant='dark' style={{ width: '50px', height: '80px', display: 'grid', placeItems: 'center' }}>
                                    <i className="fas fa-receipt"></i>
                                </Button>
                            }
                        </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey={index + ''}>
                        <Card.Body style={{ padding: '10px 20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px' }}>
                                <div>
                                    <h4>Detail </h4>
                                    <p style={{ textJustify: 'center' }}>
                                        Order Number : <b>{item.id_order}</b><br />
                                        Username : {item.username}<br />
                                        {new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString()}<br />
                                        Payment : {item.payment_method}<br />
                                        Email : {item.email}
                                    </p>
                                    <h4>Address </h4>
                                    <p >
                                        {item.city},{item.postal_code}<br />
                                        {item.address_detail}
                                    </p>
                                </div>
                            </div>
                            {item.order_details.map((item, index) => <AccordColumn item={item} key={index} />)}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px' }}>
                                <h4>Total </h4>
                                <p style={{ textAlign: 'end' }}>
                                    {item.total.toLocaleString()}  <br />
                                    ( Shipment fee ) +{item.shipment_fee.toLocaleString()} <br />
                                    <span style={{ fontWeight: '500' }}>{item.total.toLocaleString()} IDR</span>
                                </p>
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}
function AccordColumn({ item: { name, qty, price, image } }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', padding: '20px 10px', alignItems: 'center', borderBottom: '1px solid #d8d8d8', borderTop: '1px solid #d8d8d8' }}>
            <img style={{ height: '120px', border: '1px solid #1a242a' }} src={"http://localhost:2000/" + image} alt="ffr" />
            <p style={{ flex: 1 }}>
                {name}<br />
                {price.toLocaleString()} IDR<br />
                {qty}pcs
            </p>
            <h5>
                {(price * qty).toLocaleString()} IDR
            </h5>
        </div>
    )
}