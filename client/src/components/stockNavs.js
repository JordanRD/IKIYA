import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function StockNavs() {
    return (
        <Nav fill variant="tabs" defaultActiveKey="/stock/add">
            <Nav.Item>
                <Nav.Link style={{ color: 'black' }} eventKey="link-1" as={Link} to='/stock/add'>Add Stock</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link style={{ color: 'black' }} eventKey="link-2" as={Link} to='/stock/move'>Move Stock</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link style={{ color: 'black' }} eventKey="link-3" as={Link} to='/stock/stores'>Manage Stores</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}
