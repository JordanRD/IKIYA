import React from 'react'

import { NavDropdown, Navbar, Nav, Form, } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions'
export default function AdminNavigation() {
    const { username, } = useSelector(state => state.user)
    const dispatch = useDispatch()
    return (
        <Navbar sticky='top' style={{ backgroundColor: '#1a242a', boxShadow: ' 0 0 15px 1 black' }} expand="lg">
            <Navbar.Brand style={{ fontSize: '30px', fontStyle: 'italic',color:'white' }} as={Link} to='/' >IKIYA</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link style={{color:'white'}} as={Link} to='/orders/confirmed' >Orders</Nav.Link>
                    <Nav.Link style={{color:'white'}} as={Link} to='/stock/add' >Stock</Nav.Link>
                </Nav>
                <Form inline style={{ marginRight: '80px' }}>
                    <NavDropdown title={username || "guest"} id="basic-nav-dropdown">
                        {
                            username ?
                                <>
                                    <NavDropdown.Item onClick={() => dispatch(logout())} >Logout</NavDropdown.Item>
                                </> :
                                <>
                                    <NavDropdown.Item as={Link} to='/login' >Login</NavDropdown.Item>
                                    <NavDropdown.Item >Register</NavDropdown.Item>
                                </>
                        }
                    </NavDropdown>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}
