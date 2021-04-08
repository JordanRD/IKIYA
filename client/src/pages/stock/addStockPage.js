import React,{useState,useEffect} from 'react'
import { getStockData } from '../../actions'
import StockAccordion from '../../components/stockAccordion'
import {useSelector} from 'react-redux'
import PaginationSearch from '../../components/paginationSearch'
const perPage=10
export default function AddStockPage() {
    const [products, setProducts] = useState([])
    const { user } = useSelector(state => state)
    const [page,setPage]=useState(0)
    const [search,setSearch]=useState('')
    useEffect(() => {
        getStockData({page,perPage,search},data=>setProducts(data))
    }, [user, page, search])
    return (
        <div>
            <PaginationSearch length={products.length} page={page} perPage={perPage} setPage={setPage} search={search} setSearch={setSearch}/>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '0 40px 40px 40px' }}>
                {products.map((item, index) => <StockAccordion item={item} index={index} key={index} />)}
            </div>
        </div>
    )
}
