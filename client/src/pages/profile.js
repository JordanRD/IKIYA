import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Badge, Button, ButtonGroup, Form, OverlayTrigger, Popover, } from 'react-bootstrap'
import {
    postAddress,
    changeEmail,
    deactivateUser,
    keepLogin,
    logout,
    deleteAddress,
    sendVerificationEmail,
    changePassword,
    editAddress,
    uploadProfilePicture,
    deleteProfilePicture
} from "../actions";
import AlertModal from '../components/alertModal'
import Maps from '../components/maps'
import { Redirect } from 'react-router';
import noProfile from '../assets/no-profile.png'
import AddressCard from '../components/addressCard';
import ConfirmationModal from '../components/confirmationModal';
import ChangePasswordModal from '../components/changePasswordModal';
const INITIAL = { oldPassword: '', password: '', confirmPassword: '' }
export default function Profile() {
    const { username, address, email, id_user, id_status, profile_picture } = useSelector(state => state.user)
    const [errorMessage, setErrorMessage] = useState('')
    const [newAddress, setNewAddress] = useState({ address_detail: '', label: '' })
    const [show, setShow] = useState(false)
    const [add, setAdd] = useState(false)
    const [cordinates, setCordinates] = useState({ city: '', postal_code: null })
    const [newAddressDetail, setNewAddressDetail] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [showConfirm, setShowConfirm] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [editPassword, setEditPassword] = useState(false)
    const [passwordData, setPasswordData] = useState(INITIAL)
    const [passwordMessage, setPasswordMessage] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const fileRef = useRef()
    const dispatch = useDispatch()
    const handleChange = ({ target: { name, value } }) => {
        setNewAddress(p => ({ ...p, [name]: value.slice(0, 200) }))
        setErrorMessage('')
    }

    const handleCancel = () => {
        setCordinates({ city: '', postal_code: null })
        setNewAddress({ address_detail: '', label: '' })
        setErrorMessage('')
        setAdd(false)
    }
    const handleDelete = (id_address) => {
        deleteAddress(id_address, err => {
            if (err) return alert(err)
            handleCancel()


        })
    }

    const handleVerify = () => {
        sendVerificationEmail(username, msg => setAlertMessage(msg))
    }

    const handleAddAddress = () => {
        const allAddressData = { ...newAddress, ...cordinates, id_user }

        if (Object.values(allAddressData).some(i => !i)) return setErrorMessage('all input can not be empty')
        postAddress(allAddressData, err => {
            if (err) return setErrorMessage(err)
            handleCancel()
            dispatch(keepLogin())
        })
    }

    const handleProfPict = e => {
        const formData = new FormData()
        formData.append('IMG', e.target.files[0])
        formData.append('id_user', id_user)
        uploadProfilePicture(formData, () => dispatch(keepLogin()))
    }

    const handleDeleteProfPict = () => {
        deleteProfilePicture(id_user, () => dispatch(keepLogin()))
    }

    const handleSave = id_address => {
        console.log(id_address)
        if (!newAddressDetail) return setAlertMessage('input can not be empty')
        editAddress({ id_address, address_detail: newAddressDetail, id_user }, err => {
            if (err) return setAlertMessage(err)
            dispatch(keepLogin())
        })
    }

    const handleDeactivateAccount = () => {
        deactivateUser(err => {
            if (err) return setAlertMessage('Failed to deactivate please try again later')
            dispatch(logout())
        })
    }

    const handleSaveEmail = () => {
        if (!newEmail) return setAlertMessage('input can not be empty')
        if (newEmail === email) return setEditEmail(false)
        changeEmail(newEmail, err => {
            if (err) return setAlertMessage(err)
            setEditEmail(false)
            dispatch(keepLogin())
        })
    }

    const handleSavePassword = () => {
        const { password, oldPassword, confirmPassword } = passwordData;
        if (!password || !oldPassword || !confirmPassword) return setPasswordMessage('Input can not be empty')
        if (confirmPassword !== password) return setPasswordMessage('Password and Confirm password do not match')
        changePassword({ password, oldPassword }, err => {
            if (err) return setPasswordMessage(err)
            setEditPassword(false)
            setAlertMessage('Edit password success')
            setPasswordData(INITIAL)
        })
    }

    const popover = (
        <Popover style={{ zIndex: 20 }} id="popover-basic">
            <Popover.Title as="h3">You are not verified</Popover.Title>
            <Popover.Content>
                <p>Verify your email address to access all the features</p>
                <Button size='sm' onClick={handleVerify} variant='success'>Verify !</Button>
            </Popover.Content>
        </Popover>
    );


    if (!username) return <Redirect to='/' />

    return (
        <div style={{ display: 'grid', placeItems: 'center', minHeight: '40vh', width: '80vw', margin: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', columnGap: '100px', padding: '50px 0' }}>
                <div style={{ display: 'grid', rowGap: '20px', height: '200px' }}>
                    <h2>Profile</h2>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }} >
                        <img src={profile_picture ? 'http://localhost:2000/' + profile_picture : noProfile} style={{ width: '100px', borderRadius: '5px', border: '1px solid #1a242a', height: '100px', objectFit: 'cover', }} alt="" />
                        <ButtonGroup>
                            <Button onClick={() => fileRef.current.click()} variant='success'>Change Profile</Button>
                            <Button onClick={handleDeleteProfPict} variant='danger'>
                                <i className='fa fa-trash' ></i>
                            </Button>
                        </ButtonGroup>
                        <input ref={fileRef} type='file' accept='image/*' onChange={handleProfPict} style={{ display: 'none', pointerEvents: 'none' }} />
                    </div>
                    <div style={{ height: '90px', border: '1px solid #1a242a', boxShadow: '0 0 2px 1px black', borderRadius: '3px', padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {
                            editEmail ?
                                <>
                                    <Form.Control value={newEmail} onChange={e => setNewEmail(e.target.value)} style={{ marginRight: '20px' }} placeholder='enter email' />
                                    <ButtonGroup vertical>
                                        <Button onClick={() => setEditEmail(false)} variant='danger' size='sm'>cancel</Button>
                                        <Button variant='success' onClick={handleSaveEmail} size='sm'>Save</Button>
                                    </ButtonGroup>
                                </> :
                                <>
                                    <div style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                        <h4 style={{ fontWeight: '400' }}>email</h4>
                                        <p>{email}</p>
                                    </div>
                                    {id_status === 2 ?
                                        <Badge variant='success'>verified</Badge>
                                        :
                                        <OverlayTrigger trigger={["hover", "focus"]} delay={{ hide: 3000 }} placement="right" overlay={popover}>
                                            <Badge style={{ cursor: 'pointer' }} variant='danger'> not-verified</Badge>
                                        </OverlayTrigger>
                                    }
                                    <Button variant='success' size='sm' onClick={() => {
                                        setNewEmail(email)
                                        setEditEmail(true)
                                    }}>Edit</Button>
                                </>
                        }
                    </div>
                    <div style={{ height: '90px', border: '1px solid #1a242a', boxShadow: '0 0 2px 1px black', borderRadius: '3px', padding: '0 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h4 style={{ fontWeight: '400' }}>username</h4>
                        <p>{username}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={() => setEditPassword(true)} variant='secondary'>Change Password</Button>
                        <Button onClick={() => setShowConfirm(true)} variant='danger'>Deactivate Account</Button>
                    </div>
                </div>
                <div style={{ display: 'grid', rowGap: '20px' }}>
                    <h2>Address</h2>
                    <div style={{ height: '350px', border: '1px solid #1a242a', boxShadow: '0 0 2px 1px black', borderRadius: '3px', padding: '10px', display: 'flex', flexDirection: 'column', overflowY: 'scroll', }}>
                        {
                            address.map((item, index) => {
                                return (
                                    <AddressCard
                                        key={index}
                                        item={item}
                                        handleSave={handleSave}
                                        handleDelete={handleDelete}
                                        newAddressDetail={newAddressDetail}
                                        setNewAddressDetail={setNewAddressDetail}
                                    />
                                )
                            })
                        }
                        {address.length <= 3 &&
                            add ? (
                            <Form style={{ width: '400px', padding: '20px 20px 10px 20px', }}>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Label</Form.Label>
                                    <Form.Control onChange={handleChange} value={newAddress.label} name='label' size='sm' type="text" placeholder="Home/Apartment..." />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Address Detail</Form.Label>
                                    <Form.Control style={{ minHeight: '100px', maxHeight: '200px' }} onChange={handleChange} value={newAddress.address_detail} name='address_detail' size='sm' as="textarea" placeholder='Address detail' />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput133">
                                    <Form.Label>City & Postal Code</Form.Label>
                                    <div onClick={() => setShow(true)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        <Form.Control size='sm' type="email" placeholder={cordinates.city || 'City'} readOnly />
                                        <Form.Control size='sm' type="email" placeholder={cordinates.postal_code || 'Postal Code'} readOnly />
                                    </div>
                                </Form.Group>
                                <Form.Text style={{ color: 'red' }}>
                                    {errorMessage}
                                </Form.Text>
                                <Form.Group style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                                    <Button onClick={() => setShow(true)} size='sm'>Select Postal code</Button>
                                    <div>
                                        <Button style={{ borderRadius: '3px 0 0 3px' }} onClick={handleCancel} variant='danger' size='sm'>Cancel</Button>
                                        <Button onClick={handleAddAddress} style={{ borderRadius: '0 3px 3px 0' }} variant='success' size='sm'>Add</Button>
                                    </div>
                                </Form.Group>
                            </Form>
                        ) :
                            <Button size='sm' style={{ marginTop: '15px' }} onClick={() => setAdd(true)} variant='success'>Add New Address</Button>
                        }
                    </div>
                </div>
            </div>
            <AlertModal message={alertMessage} setShow={() => setAlertMessage('')} />
            <Maps show={show} setShow={() => setShow(false)} setUserCordinates={setCordinates} />
            <ConfirmationModal show={showConfirm} setShow={() => setShowConfirm(false)} handleSubmit={() => {
                setShowConfirm(false)
                handleDeactivateAccount()
            }} message='Are you sure you want to deactivate this account?' />
            <ChangePasswordModal show={editPassword} setShow={() => {
                setEditPassword(false)
                setPasswordData(INITIAL)
            }} handleChange={setPasswordData} value={passwordData} handleSave={handleSavePassword} message={passwordMessage} />
        </div>
    )
}


