import React, { useState } from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import { login, resetRequest } from '../actions';
import ResetPasswordModal from '../components/resetPasswordModal';

export default function Login() {
    const [visible, setVisible] = useState(false)
    const [userData, setUserData] = useState({ password: '', username: '' })
    const [errorMessage, setErrorMessage] = useState('')
    const [check,setCheck]=useState(false)
    const dispatch = useDispatch()
    const history=useHistory()
    const [show, setShow] = useState(false)
    const {username}=useSelector(state=>state.user)
    const handleChange = ({ target: { value, name } }) => setUserData({ ...userData, [name]: value })

    const handleSubmit = () => {
        if (!userData.password || !userData.username) return setErrorMessage('all input can not be empty')
        dispatch(login({check,userData},err=>setErrorMessage(err)))
    }
    const handleUserData = (data, cb) => {
        resetRequest(data, (err, res) => {
            if (err) return cb(err)
            setShow(false)
            history.push('/forgot/'+res)
        })
    }

    if(username)return <Redirect to='/'/>

    return (
        <div style={{ display: 'grid', placeItems: 'center', marginTop: '50px' }}>
            <div>
                <h1 style={{ marginBottom: '20px' }}>Login</h1>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control name='username' onChange={handleChange} value={userData.username} type="text" placeholder="Enter email or username" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <InputGroup className="mb-3">
                            <FormControl value={userData.password}
                                name='password'
                                placeholder="Password"
                                type={visible ? 'text' : 'password'} onChange={handleChange}
                            />
                            <InputGroup.Append>
                                <Button onClick={() => setVisible(p => !p)} variant="outline-secondary">
                                    {visible ?
                                        <i className="far fa-eye-slash"></i> :
                                        <i className="far fa-eye"></i>
                                    }
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" checked={check} onChange={e=>setCheck(e.target.checked)} />
                        <Form.Text style={{ color: 'red' }} >
                            {errorMessage}
                    </Form.Text>
                    </Form.Group>
                    <Button style={{ width: '100%' }} variant="primary" type="button" onClick={handleSubmit}>
                        Login
                    </Button>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        <span style={{ color:'#007bff',cursor: 'pointer'}} onClick={()=>setShow(true)}>Forgot Password</span>
                        <Link to='/register'>Register</Link>
                    </div>
                </Form>
            </div>
            <ResetPasswordModal handleClose={()=>setShow(false)} action={handleUserData} show={show} />
        </div>
    )
}
