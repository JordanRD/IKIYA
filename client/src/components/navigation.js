import React from 'react'

import { NavDropdown, Navbar, Nav, Form, Badge } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions'
export default function Navigation() {
    const { username, cart } = useSelector(state => state.user)
    const dispatch = useDispatch()
    return (
        <Navbar sticky='top' style={{ backgroundColor: '#1a242a', boxShadow: ' 0 0 1px 1px white' }} expand="lg">
            <Navbar.Brand style={{ fontSize: '30px', fontStyle: 'italic',color:'white' }} as={Link} to='/' >IKIYA</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav  className="mr-auto">
                    {username && (
                        <>
                            <Nav.Link as={Link} to='/wishlist' style={{ color: 'white' }} >Wishlist</Nav.Link>
                            <Nav.Link as={Link} to='/history/confirmed' style={{ color: 'white' }} >History</Nav.Link>
                            <Nav.Link disabled={cart.length<1} as={Link} to='/cart' style={{ color: 'white' }} >Cart<Badge style={{ marginLeft: '3px', }} variant={cart.length?'success':'danger'}>{cart.length}</Badge></Nav.Link>
                        </>
                    )}
                </Nav>
                <Form inline style={{ marginRight: '80px' }}>
                    <NavDropdown  title={username || "guest"} id="basic-nav-dropdown">
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
                    </NavDropdown>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}
