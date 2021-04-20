import api from '../httpService';


export const getAllProduct = async (allData,action) => {
    try {
        // console.log(allData)
        const { data } = await api('/product').post(`/get`,allData)
        action(data)
    } catch (error) {
        console.log(error.response?.data)
    }
}
export const getProductById = async ({id_product,id_user},action) => {
    try {
        // console.log(page,perPage)
        const { data=[] } = await api('/product').get(`/get/${id_product}?id_user=${id_user}`)
        action(data)
    } catch (error) {
        console.log(error.response?.data)
    }
}

export const getCategories = async (action) => {
    try {
        const { data=[] } = await api('/product').get(`/categories`)
        action(data)
    } catch (error) {
        console.log(error.response?.data)
    }
}

export const getCarousel = async (action) => {
    try {
        const { data = [] } = await api('/product').get(`/carousel`)
        action(data)
    } catch (error) {
        console.log(error.response?.data)
    }
}