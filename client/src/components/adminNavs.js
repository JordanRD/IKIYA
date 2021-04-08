import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function AdminNavs() {
    return (
        <Nav fill variant="tabs" defaultActiveKey="/orders/confirmed">
            <Nav.Item>
                <Nav.Link style={{ color: 'black' }} eventKey="link-1" as={Link} to='/orders/pending'>Pending</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link style={{ color: 'black' }} eventKey="link-2" as={Link} to='/orders/confirmed'>Confirmed</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link style={{ color: 'black' }} as={Link} eventKey="link-3" to='/orders/delivery'>Delivery</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link style={{ color: 'black' }} as={Link} eventKey="link-4" to='/orders/completed'>Completed</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link style={{ color: 'black' }} eventKey="link-5" as={Link} to='/orders/canceled'>Canceled</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}
