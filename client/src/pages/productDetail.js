import React, { useState, useEffect } from 'react'
import { Button, Carousel, Toast } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { getProductById, addToCart, keepLogin,addWishlist,deleteWishlist } from '../actions'
import ModalAddToCart from '../components/modalAddToCart'
import AlertModal from '../components/alertModal'
import { Link } from 'react-router-dom'
export default function ProductDetail() {
    const { id_product: selectedProduct } = useParams()
    const [product, setProduct] = useState({ images: [], category: '', stock: 0, name: '', description: '', price: 0 })
    const [show, setShow] = useState(false)
    const { cart, id_user, id_status, username,wishlist } = useSelector(state => state.user)
    const [alertMessage, setAlertMessage] = useState('')
    const [toast, setToast] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        getProductById({ id_user, id_product: selectedProduct }, data => {
            if (+data.id_product_status !== 1) return history.goBack()
            setProduct(data)
        })
    }, [cart, id_user, selectedProduct, history])

    const { images, category, stock, name, description, price, onCart } = product

    const confirmAddToCart = userQty => {
        addToCart({ id_user, qty: userQty, id_product: selectedProduct }, () => {
            setToast(true)
            dispatch(keepLogin())
        })
    }

    const handleAddWishlist = () => {
        addWishlist({ id_product: selectedProduct, id_user }, () => {
            setAlertMessage(name+' just added to wishlist')
            dispatch(keepLogin())
        })
    }
    const handleDeleteWishlist = () => {
        deleteWishlist({ id_product: selectedProduct, id_user }, () => {
            setAlertMessage(name+' has been deleted from wishlist')
            dispatch(keepLogin())
        })
    }

    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: '4fr 6fr', height: '90vh', alignItems: 'center', gap: '20px', padding: '20px' }}>
                <div style={{ backgroundColor: 'gray' }} >
                    <Carousel fade>
                        {images.map((item, index) => (
                            <Carousel.Item key={index} style={{ display: 'grid', placeItems: 'center' }} >
                                <img
                                    alt='rerere'
                                    style={{ objectFit: 'contain', height: '90%', display: 'grid', width: '90%', placeItems: 'center' }}
                                    src={'http://localhost:2000/' + item}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%' }}>
                    <div>
                        <h1 style={{ fontWeight: '400' }}>{name}</h1>
                        <p>Category : {category}</p>
                        <p>
                            {description}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: '20px', fontStyle: 'italic' }}>
                            {price.toLocaleString()} IDR <br />
                            {stock <= 0 ? 'Not Available' : `${stock}pcs Available`}<br />
                            {onCart > 0 && onCart + 'pcs in your cart'}
                        </p>
                        {
                            username ?
                                <div
                                    style={{ marginTop: '10px' ,display: 'flex',gap:'10px'}}>
                                    <Button
                                        disabled={stock <= 0}
                                        onClick={() =>
                                            +id_status === 2 ?
                                                setShow(true) :
                                                setAlertMessage('to add to cart you need to be verified')
                                        }
                                        variant='outline-dark'>Add to Cart</Button>
                                    {wishlist.some(i => +i.id_product === +selectedProduct) ?
                                        <Button onClick={handleDeleteWishlist} variant='danger'><i className='fa fa-heart' /></Button>:
                                        <Button onClick={handleAddWishlist} variant='outline-danger'><i className='fa fa-heart' /></Button>
                                    }
                                </div> :
                                <Button as={Link} to='/login' variant='outline-secondary'>Login</Button>
                        }
                    </div>
                </div>
            </div>
            <AlertModal message={alertMessage} setShow={() => setAlertMessage('')} />
            <ModalAddToCart confirmAddToCart={confirmAddToCart} show={show} product={product} setShow={() => setShow(false)} />
            <Toast show={toast} onClose={() => setToast(false)} delay={4000} autohide style={{ position: 'absolute', right: '20px', bottom: '20px', width: '250px' }}>
                <Toast.Header>
                    <img src={'http://localhost:2000/' + images[0]} className="rounded mr-2" alt="product" style={{ height: '30px' }} />
                    <strong className="mr-auto">{name}</strong>
                    <small>Just now</small>
                </Toast.Header>
                <Toast.Body>Add to cart success.</Toast.Body>
            </Toast>
        </>
    )
}
