import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CartCard from '../components/cartCard'
import { keepLogin } from '../actions'
const c = {
    white: '#eceace',
    lightGreen: '#c8c6a7',
    green: '#92967d',
    blue: '#6e7c7c',
    blueDarker: '#1a242a',
}
export default function Cart() {
    const { cart, username } = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => { dispatch(keepLogin()) }, [dispatch])
    if (!username) return <Redirect to='/' />

    // if(cart.length<=0)return <div style={{display:'grid',placeItems: 'center'}}><h2>Empty</h2></div>

    return (
        <div style={{ display: 'grid', padding: '20px 20px 100px 20px', gridTemplateColumns: 'repeat(auto-fit,400px)', gap: '20px' }}>
            {cart.map((item, index) => <CartCard key={index} item={item} />)}
            <div
                style={{
                    position: 'fixed',
                    backgroundColor: c.blueDarker,
                    height: '80px',
                    left: 0, right: 0, bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 50px',
                    justifyContent: 'space-between',
                    boxShadow: '0 -1px 2px 1px black'
                }}
            >
                <h2 style={{ color: c.white }}>{cart.reduce((a, b) => a + (b.price * b.qty), 0).toLocaleString()} IDR</h2>
                {(cart.length > 0 && cart.every(itm => itm.qty <= itm.stock && +itm.id_product_status === 1)) && <Button as={Link} to='/checkout' variant='success'>Checkout</Button>}
            </div>
        </div>
    )
}

//cart.every(itm=>itm.qty<=item.stock)