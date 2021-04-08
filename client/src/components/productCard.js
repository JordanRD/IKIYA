import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
const MyDiv = styled.div`
    background-color: #1a242a;
    height: 400px;
    padding: 10px;
    box-shadow: -2px 2px 5px 0.1px black;
    color: white;
    cursor: pointer;
    transition:500ms;
    :hover{
        transform: scale(1.010);
        box-shadow:-2px 2px 10px 0.5px black;
    }
`

export default function ProductCard({ item = {} }) {

    const { id_product, image, name, category, price } = item
    const history = useHistory()
    return (
        <MyDiv
            onClick={() => history.push(`/detail/${id_product}`)}
        >
            <img
                src={"http://localhost:2000/" + image}
                alt={name}
                style={{ objectFit: 'contain', height: '50%', display: 'grid', placeItems: 'center', width: '100%', backgroundColor: 'white' }}
            />
            <div style={{ display: 'grid', gridTemplateRows: '1fr 50px', height: '50%', margin: ' 10px 0 0 0' }}>
                <div>
                    <h3 style={{ color: 'white', fontWeight: '400' }}>{name}</h3>
                    <p>Category : {category}</p>
                </div>
                <div
                    style={{
                        borderTop: '1px solid gray',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '100%'
                    }}>
                    <p style={{ fontSize: '20px' }}>{price.toLocaleString()} IDR</p>
                </div>
            </div>
        </MyDiv>
    )
}
