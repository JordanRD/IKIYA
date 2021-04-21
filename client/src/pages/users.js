import React, { useState, useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import { getAllUser, editUser, keepLogin } from '../actions'
import {useDispatch}from 'react-redux'
import PaginationSearch from '../components/paginationSearch'
import UserCart from '../components/userCart'
const perPage = 20
export default function Users() {
    const [page, setPage] = useState(0)
    const [orderBy, setOrderBy] = useState('active')
    const [search, setSearch] = useState('')
    const [userData, setUserData] = useState([])
    const [refresh,setRefresh] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        getAllUser({ page, search, orderBy }, data => setUserData(data))
    }, [search, page, orderBy, refresh])
    // console.log(userData)

    const handleSave = (newData) => {
        editUser(newData, () => {
            setRefresh(p => !p)
            dispatch(keepLogin())
        })
    }

    return (
        <div style={{ minHeight: '80vh' }}>
            <PaginationSearch page={page} setPage={setPage} perPage={perPage} search={search} length={userData.length} setSearch={setSearch}>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {orderBy}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                            setOrderBy('active')
                        }}>active</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setOrderBy('notActive')
                        }}>notActive</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </PaginationSearch>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '10px 20px', width: '100%' }}>
                {userData.map((item, index) => <UserCart handleSave={handleSave} key={index} item={item} />)}
            </div>
        </div>
    )
}
