import React, { useState, useEffect } from 'react'
import { Carousel, Dropdown, Form, Pagination,Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProduct, getCategories,getCarousel } from '../actions';
import ProductCard from '../components/productCard';
const perPage = 8
export default function Home() {
    const [product, setProduct] = useState([])
    const [page, setPage] = useState(0)
    const [orderBy, setOrderBy] = useState('default')
    const [selectedCategory, setSelectedCategory] = useState({})
    const [allCategory, setAllCategory] = useState([])
    const [carousel,setCarousel] = useState([])
    const { username } = useSelector(state => state.user)
    const [search,setSearch] = useState('')
    useEffect(() => {
        let filtered = { perPage, page, orderBy, search }
        if (selectedCategory.category) filtered.id_category = selectedCategory.id_category
        // console.log(filtered)
        getAllProduct(filtered, data => setProduct(data))
        getCategories(data => setAllCategory(data))
        if(!carousel.length)getCarousel(data=>setCarousel(data))
    }, [page,carousel, username, selectedCategory, orderBy, search])

    return (
        <div  >
            <Carousel >
                {carousel.map((item, index) => (
                    <Carousel.Item key={index + 454} style={{ backgroundColor: '#1a242a', padding: '50px', color: 'white', }}>
                        <div style={{ display: 'flex', alignItems: 'center', margin: 'auto', gap: '50px', width: '70%' }}>
                            <div style={{ height: '300px', width: '300px' }}>
                                <img
                                    style={{ height: '300px', width: '300px', objectFit: 'cover' }}
                                    className="d-block w-100"
                                    src={'http://localhost:2000/' + item.image}
                                    alt="First slide"
                                />
                            </div>
                            <div>
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <Button as={Link} to={'/detail/'+item.id_product} variant='outline-light'>Details</Button>
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div style={{ height: '50px', justifyContent: 'space-around', display: 'flex', alignItems: 'center',padding:'30px 0' }}>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
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
                <Pagination style={{ margin: '10px' }} >
                    <Pagination.Prev disabled={page <= 0} onClick={() => setPage(page - 1)} />
                    <Pagination.Item disabled>{page + 1}</Pagination.Item>
                    <Pagination.Next disabled={product.length < perPage} onClick={() => setPage(page + 1)} />
                </Pagination>
                <Form.Control type='text' onChange={e => setSearch(e.target.value)} value={search} style={{width:'200px'}} placeholder='Search'/>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Order by : {orderBy}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {['nameAsc','nameDesc','priceAsc','priceDesc','default'].map(
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
            <div style={{ display: 'grid', padding: '0px 20px 100px 20px', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,300px)) ', gap: '20px' }}>
                {product?.[0] && product.map((item, index) => <ProductCard key={index} item={item} />)}
            </div>
        </div >
    )
}
