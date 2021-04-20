import React from 'react'

import { NavDropdown, Navbar, Nav, Form, Badge } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions'
import noProfile from '../assets/no-profile.png'
import styled from 'styled-components'

const MyDropdown = styled(NavDropdown)`
.dropdown-toggle{
    color:#1a242a;
}
`

export default function Navigation() {
    const { username, cart, profile_picture, id_status } = useSelector(state => state.user)
    const dispatch = useDispatch()
    return (
        <Navbar sticky='top' style={{ backgroundColor: '#1a242a', boxShadow: ' 0 0 1px 1px white' }} expand="lg">
            <Navbar.Brand style={{ fontSize: '30px', fontStyle: 'italic', color: 'white' }} as={Link} to='/' >IKIYA</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {+id_status===2 && (
                        <>
                            <Nav.Link as={Link} to='/wishlist' style={{ color: 'white' }} >Wishlist</Nav.Link>
                            <Nav.Link as={Link} to='/history/confirmed' style={{ color: 'white' }} >History</Nav.Link>
                            <Nav.Link disabled={cart.length < 1} as={Link} to='/cart' style={{ color: cart.length < 1?'gray':'white', }} >Cart<Badge style={{ marginLeft: '3px', }} variant={cart.length ? 'success' : 'secondary'}>{cart.length}</Badge></Nav.Link>
                        </>
                    )}
                </Nav>
                <Form inline style={{ display: 'flex', justifyContent: 'space-between', minWidth: '150px', backgroundColor: 'white', borderRadius: '5px', alignItems: 'center' }}>
                    <MyDropdown title={username || "guest"} id="basic-nav-dropdown">
                        {
                            username ?
                                <>
                                    <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => dispatch(logout())} >Logout</NavDropdown.Item>
                                </> :
                                <>
                                    <NavDropdown.Item as={Link} to='/login' >Login</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/register'>Register</NavDropdown.Item>
                                </>
                        }
                    </MyDropdown>
                    <Link to='/profile'>
                        <img style={{ height: '45px', width: '45px', objectFit: 'cover', borderRadius: '0 5px 5px 0', borderLeft: '2px solid #1a242a' }} src={profile_picture ? 'http://localhost:2000/' + profile_picture : noProfile} alt="profile" />
                    </Link>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}
