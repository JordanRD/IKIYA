import React from 'react'
import { Dropdown, Pagination, Form } from 'react-bootstrap'

export default function PaginationComp({
    setPage,
    page,
    length,
    perPage,
    setOrderBy,
    orderBy,
    children,
    orderBySelection = ['latest', 'oldest'],
    search,
    setSearch,
    type = 'text'
}) {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>
                {setSearch&&<Form.Control style={{width:'200px'}} placeholder='search' type={type} value={search} onChange={e => setSearch(e.target.value)} />}
                <Pagination style={{ margin: '10px' }} >
                    <Pagination.Prev disabled={page <= 0} onClick={() => setPage(page - 1)} />
                    <Pagination.Item disabled>{page + 1}</Pagination.Item>
                    <Pagination.Next disabled={length < perPage} onClick={() => setPage(page + 1)} />
                </Pagination>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Order by : {orderBy}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {orderBySelection.map(i =>
                            <Dropdown.Item key={i} onClick={() => {
                                setPage(0)
                                setOrderBy(i)
                            }}>{i}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            {children}
        </div>
    )
}
