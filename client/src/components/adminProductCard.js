import React from 'react'
import { Badge, Button, } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const MyDiv = styled.div`
padding: 10px;
background-color:#1a242a;
box-shadow: -2px 2px 5px 0.1px black;
color: white;
display: flex;
flex-direction: column;
transition:transform 500ms, box-shadow 500ms;
    :hover{
        transform: scale(1.010);
        box-shadow:-2px 2px 10px 0.5px black;
    }
`

export default function AdminProductCard({ item = {}, handleDelete, handleRestore }) {
    const history = useHistory()
    const { id_product, image, name, category, price, id_product_status, sold, } = item

    return (
        <MyDiv >
            <img
                src={"http://localhost:2000/" + image}
                alt={name}
                style={{ objectFit: 'contain', height: '40%', display: 'grid', placeItems: 'center', width: '100%', backgroundColor: 'white' }}
            />
            <div style={{ display: 'grid', gridTemplateRows: '1fr 50px', height: '55%', margin: ' 10px 0 0 0' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '150px' }}>
                        <div>
                            <h3 style={{ color: 'white', fontWeight: '400' }}>{name}</h3>
                            <p>
                                Category : {category}<br />
                        Price : {price.toLocaleString()} IDR<br />
                                Sold : {sold || 0}pcs
                            </p>
                        </div>
                        {+id_product_status === 2 && <Badge variant="danger">Deleted</Badge>}
                    </div>
                </div>
                <div
                    style={{
                        borderTop: '1px solid gray',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '70px'
                    }}>
                    {+id_product_status === 1 ?
                        <Button onClick={() => handleDelete(id_product)} size='sm' variant='danger'>Delete</Button> :
                        <Button onClick={() => handleRestore(id_product)} size='sm' variant='success'>Restore</Button>
                    }
                    <Button onClick={() => history.push('/edit/' + id_product)} size='sm' variant='success'>Edit</Button>
                </div>
            </div>
        </MyDiv>
    )
}
