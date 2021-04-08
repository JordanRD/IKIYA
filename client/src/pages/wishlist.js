import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { keepLogin, deleteWishlist } from '../actions'
import { Redirect, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import AlertModal from '../components/alertModal'
const MyDiv = styled.div`
display: flex;
gap: 10px;
background-color: #1a242a;
height: 150px;
width: 400px;
padding: 10px;
cursor:pointer;
transition:500ms;
${p => p.available ? `
&:hover{
    transform:scale(1.01);
}
`: 'opacity:0.8;'
    }
`
export default function WishList() {
    const { wishlist = [], id_user, id_status } = useSelector(state => state.user)
    const [search, setSearch] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [refresh,setRefresh]=useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(keepLogin())
    }, [dispatch, refresh])

    const handleDelete = ({ id_product }) => {
        deleteWishlist(
            { id_user, id_product },
            err => {
                if (err) return setAlertMessage(err)
                setRefresh(p=>!p)
            }
        )
    }

    if (id_status !== 2) return <Redirect to='/' />
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                <Form.Control placeholder='search' onChange={e => setSearch(e.target.value)} value={search} style={{ width: '200px' }} />
            </div>
            <div style={{ width: '100%', padding: '0 30px 20px 30px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {wishlist.map(
                    (item = {}, index) =>
                        new RegExp(search, 'gi').test(item.name) &&
                        <MyDiv available={Boolean(item.is_available)} key={index}>
                            <img alt='keokdo' onClick={() => item.is_available&&history.push('/detail/' + item.id_product)} style={{ height: '100%' }} src={'http://localhost:2000/' + item.image} />
                            <div onClick={() => item.is_available&&history.push('/detail/' + item.id_product)} style={{ color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                                <h4>
                                    {item.name}
                                </h4>
                                <p>
                                    {item.price?.toLocaleString()} IDR<br />
                                    <small style={{ color: 'red' }}>{item.is_available ? '' : 'Not Available'}</small>
                                </p>
                            </div>
                            <Button onClick={() => handleDelete(item)} variant='danger'>
                                <i className='fa fa-trash' />
                            </Button>
                        </MyDiv>
                )}
            </div>
            <AlertModal message={alertMessage} setShow={() => setAlertMessage('')} />
        </div>
    )
}
