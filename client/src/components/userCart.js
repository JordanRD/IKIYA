import React, { useState } from 'react'
import { Badge, Button, Dropdown } from 'react-bootstrap'
import noProfile from '../assets/no-profile.png'
//#1a242a

export default function UserCart({ item = {},handleSave }) {
    const [edit, setEdit] = useState(false)
    const [idRole, setIdRole] = useState(null)
    const [idActiveStatus, setIdActiveStatus] = useState(null)

    const { username, email, id_user, id_role, id_active_status, id_status, profile_picture } = item

    return (
        <div style={{ backgroundColor: '#1a242a', width: 'max(90%/3,350px)', height: '200px', display: 'flex', padding: '15px', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <img style={{ width: '100px', height: '100px' }} src={profile_picture ? `http://localhost:2000/${profile_picture}` : noProfile} alt="user" />
                {
                    (edit?idActiveStatus:id_active_status) === 1 ?
                        <Badge variant='success' size='sm'>Active</Badge> :
                        <Badge variant='danger' size='sm'>Not-Active</Badge>
                }
            </div>

            <div style={{ color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                <div>
                    <h4>{username?.substr(0, 15)}</h4>
                    <span>{email}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {
                        edit ?
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" size='sm' id="dropdown-basic">
                                        {idRole === 2 ? 'admin' : 'user'}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setIdRole(1)}>user</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setIdRole(2)}>admin</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {
                                    idActiveStatus === 1 ?
                                        <Button onClick={() => setIdActiveStatus(2)} size='sm' variant='danger'> Deactivate </Button> :
                                        <Button onClick={() => setIdActiveStatus(1)} size='sm' variant='success'> Activate </Button>
                                }
                            </div>
                            :
                            <p>
                                Role : {id_role === 1 ? 'user' : 'admin'}<br />
                                Status : {id_status === 2 ? 'verified' : 'not-verified'}<br />
                            </p>
                    }
                    {
                        edit ?
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <Button onClick={
                                    () => {
                                        setEdit(false)
                                        if(idRole !== id_role || id_active_status !== idActiveStatus) handleSave({ id_role: idRole, id_active_status: idActiveStatus, id_user })
                                    }
                                } variant='success' size='sm'>
                                    <i className='fa fa-save'></i>
                                </Button>
                                <Button onClick={() => setEdit(false)} variant='danger' size='sm'>
                                    <i className='fa fa-ban'></i>
                                </Button>
                            </div> :
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <Button onClick={() => {
                                    setIdRole(id_role)
                                    setIdActiveStatus(id_active_status)
                                    setEdit(true)
                                }} variant='success' size='sm'>
                                    <i className='fa fa-pen'></i>
                                </Button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
