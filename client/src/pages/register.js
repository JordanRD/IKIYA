import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { registerUser } from '../actions'
import AlertModal from '../components/alertModal'
export default function Register() {
    const [visible, setVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [userData, setUserData] = useState({ username: '', email: '', password: '', confirmPassword: '' })
    const [alertMessage, setAlertMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const { username } = useSelector(state => state.user)
    const history = useHistory()
    const handleChange = ({ target: { value, name } }) => {
        setErrorMessage('')
        setUserData(p => ({ ...p, [name]: value }))
    }
    const handleSubmit = () => {
        if (Object.values(userData).includes('')) return setErrorMessage('all input can not be empty')
        if (userData.confirmPassword !== userData.password) return setErrorMessage('password and confirmation does not match')
        registerUser(userData, err => {
            if (err) return setErrorMessage(err)
            setAlertMessage('Register success and we have sent a verification message to your email')
            setIsSuccess(true)
        })
    }
    const handleClose = () => {
        setAlertMessage('')
        if (isSuccess) return history.replace('/login')
    }
    
    if (username) return <Redirect to='/' />

    return (
        <div style={{ display: 'grid', placeItems: 'center', padding: '50px' }}>
            <Form style={{ width: '300px' }}>
                <h2>Register</h2>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={userData.email} onChange={handleChange} name="email" type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={handleChange} value={userData.username} name="username" type="text" placeholder="Username" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={handleChange}
                            value={userData.password}
                            placeholder="Password"
                            name="password"
                            aria-describedby="basic-addon2"
                            type={visible ? "text" : "password"}
                        />
                        <InputGroup.Append>
                            <Button onClick={() => setVisible(p => !p)} variant="outline-secondary">
                                {visible ?
                                    <i className='fa fa-eye-slash'></i> :
                                    <i className='fa fa-eye'></i>
                                }
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        value={userData.confirmPassword}
                        name="confirmPassword"
                        aria-describedby="basic-addon2"
                        type={visible ? "text" : "password"}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Text style={{ color: 'red' }}>
                        {errorMessage}
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
            <AlertModal message={alertMessage} setShow={handleClose} />
        </div>
    )
}

