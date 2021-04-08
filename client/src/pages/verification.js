import React,{useState,useEffect} from 'react'
import { useHistory, useParams,Redirect } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Spinner } from 'react-bootstrap'
import AlertModal from '../components/alertModal'
import { verifyUser,keepLogin } from '../actions'
export default function Verification() {
    const { token } = useParams()
    const {id_status,username} = useSelector(state => state.user)
    const history = useHistory()
    const [modalMessage, setModalMessage] = useState('')
    const [loading,setLoading] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
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
    },[token])

    const handleClose = () => {
        setModalMessage('')
        if (isSuccess) {
            if (username) {
                dispatch(keepLogin())
                history.replace('/')
            } else {
                history.replace('/login')
            }
        }
    }

    if (+id_status === 2) return <Redirect to='/' />
    
    return (
        <div style={{ display: 'grid',placeItems:'center',height:'70vh'}}>
            {loading ?
                <Spinner animation="border" role="status" /> :
                isSuccess ?
                    <h2>Verification Success</h2> :
                    <h2>Verification Failed</h2>
            }
            <AlertModal setShow={handleClose} message={modalMessage}/>
        </div>
    )
}
