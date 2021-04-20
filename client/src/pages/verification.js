import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import AlertModal from '../components/alertModal'
import { verifyUser, keepLogin } from '../actions'
export default function Verification() {
    const { token } = useParams()
    const { id_status, username } = useSelector(state => state.user)
    const history = useHistory()
    const [modalMessage, setModalMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (id_status) {
            if (+id_status === 2) return history.replace('/')
            verifyUser(token, err => {
                setLoading(false)
                if (err) {
                    setModalMessage('Verification failed please try again later.')
                    setIsSuccess(false)
                    return
                }
                setModalMessage('You are now verified')
                setIsSuccess(true)
            })
        }
    }, [history, token, id_status])

    const handleClose = () => {
        setModalMessage('')
        if (!isSuccess) return history.replace('/login')
        if (username) {
            dispatch(keepLogin())
            history.replace('/')
        } else {
            history.replace('/login')
        }
    }


    return (
        <div style={{ display: 'grid', placeItems: 'center', height: '70vh' }}>
            {loading ?
                <Spinner animation="border" role="status" /> :
                isSuccess ?
                    <h2>Verification Success</h2> :
                    <h2>Verification Failed</h2>
            }
            <AlertModal setShow={handleClose} message={modalMessage} />
        </div>
    )
}
