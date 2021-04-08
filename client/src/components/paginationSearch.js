import React from 'react'
import { Form, Pagination } from 'react-bootstrap'

export default function PaginationSearch({ setPage, page, length, perPage, setSearch,search}) {
    return (
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%',padding:'10px' }}>
                <Pagination style={{ margin: '10px' }} >
                    <Pagination.Prev disabled={page <= 0} onClick={() => setPage(page - 1)} />
                    <Pagination.Item disabled>{page + 1}</Pagination.Item>
                    <Pagination.Next disabled={length < perPage} onClick={() => setPage(page + 1)} />
            </Pagination>
            <Form.Control style={{width:'150px'}} placeholder='Search' type='text' value={search} onChange={e => setSearch(e.target.value)}/>
            </div>
    )
}
