import React, { useState, useEffect } from 'react'
import { Dropdown, Pagination,Button,Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProductAdmin, getCategories,deleteProduct,restoreProduct } from '../actions';
import AdminProductCard from '../components/adminProductCard';
import EditCategoryModal from '../components/editCategoryModal';
const perPage = 8
export default function AdminHome() {
    const [product, setProduct] = useState([])
    const [page, setPage] = useState(0)
    const [orderBy, setOrderBy] = useState('default')
    const [selectedCategory, setSelectedCategory] = useState({})
    const [allCategory, setAllCategory] = useState([])
    const [refresh,setRefresh] = useState(false)
    const [show,setShow]=useState(false)
    const { username } = useSelector(state => state.user)
    const [search,setSearch]=useState('')

    useEffect(() => {
        let filtered = { perPage, page, orderBy, search }
        if (selectedCategory.category) filtered.id_category = selectedCategory.id_category
        getAllProductAdmin(filtered, data => setProduct(data))
        getCategories(data => setAllCategory(data))
    }, [page, username, selectedCategory, orderBy, refresh, search])

    const handleDelete = selectedProductIdToDelete => {
        deleteProduct(selectedProductIdToDelete,()=>setRefresh(p=>!p))
    }
    const handleRestore = selectedProductIdToRestore => {
        restoreProduct(selectedProductIdToRestore,()=>setRefresh(p=>!p))
    }

    return (
        <div >
            <div style={{ height: '50px', justifyContent: 'space-around', display: 'flex', alignItems: 'center', paddingTop: '15px' }}>
                <div style={{display:'flex',}}>
                    <Dropdown >
                        <Dropdown.Toggle style={{ borderRadius: '3px 0 0 3px' }} variant="success" id="dropdown-basic">
                            {selectedCategory.category || 'Select Category'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {allCategory.map(
                                (item, index) =>
                                    <Dropdown.Item key={index} onClick={() => {
                                        setPage(0)
                                        setSelectedCategory(item)
                                    }}>{item.category}</Dropdown.Item>
                            )
                            }
                            <Dropdown.Item onClick={() => {
                                setPage(0)
                                setSelectedCategory({})
                            }}>show all</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button onClick={()=>setShow(true)} style={{ borderRadius: '0 3px 3px 0' }} variant='success'>Edit</Button>
                </div>
                <Pagination style={{ margin: '10px' }} >
                    <Pagination.Prev disabled={page <= 0} onClick={() => setPage(page - 1)} />
                    <Pagination.Item disabled>{page + 1}</Pagination.Item>
                    <Pagination.Next disabled={product.length < perPage} onClick={() => setPage(page + 1)} />
                </Pagination>
                <Form.Control style={{width:'200px'}} type="text" placeholder="Search" onChange={e => setSearch(e.target.value)} />
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Order by : {orderBy}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {['nameAsc', 'nameDesc', 'priceAsc', 'priceDesc', 'latest', 'sold','available','notAvailable', 'default'].map(
                            (item, index) =>
                                <Dropdown.Item key={index} onClick={() => {
                                    setPage(0)
                                    setOrderBy(item)
                                }}>{item}</Dropdown.Item>
                        )
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div style={{ display: 'grid', padding: '20px 20px 100px 20px', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,300px)) ', gap: '20px' }}>
                {product?.[0] && product.map((item, index) => <AdminProductCard handleRestore={handleRestore} handleDelete={handleDelete} key={index+444} item={item} />)}
            </div>
            <EditCategoryModal allCategory={allCategory} setAllCategory={setAllCategory} show={show} setShow={() => setShow(false)} />
            <Button as={Link} to='/add' size='lg' variant='success' style={{ display:'grid',placeItems:'center',position: 'fixed', bottom: '30px', right: '30px', borderRadius: '100px', width: '100px', height: '100px' }}>
                <i style={{fontSize:'35px'}} className='fa fa-plus'></i>
            </Button>
        </div >
    )
}
