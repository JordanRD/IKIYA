import axios from 'axios';

const api = axios.create({ baseURL:'http://localhost:2000/product'})

export const getAllProduct = async (allData,action) => {
    try {
        // console.log(allData)
        const { data } = await api.post(`/get`,allData)
        action(data)
    } catch (error) {
        console.log(error.response?.data)
    }
}
export const getProductById = async ({id_product,id_user},action) => {
    try {
        // console.log(page,perPage)
        const { data=[] } = await api.get(`/get/${id_product}?id_user=${id_user}`)
        action(data)
    } catch (error) {
        console.log(error.response?.data)
    }
}

export const getCategories = async (action) => {
    try {
        const { data=[] } = await api.get(`/categories`)
        action(data)
    } catch (error) {
        console.log(error.response?.data)
    }
}

export const getCarousel = async (action) => {
    try {
        const { data = [] } = await api.get(`/carousel`)
        action(data)
    } catch (error) {
        console.log(error.response?.data)
    }
}