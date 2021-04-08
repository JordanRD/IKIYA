import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:2000/wishlist' })


export const addWishlist = async (wishlistData, action) => {
    try {
        await api.post(`/add`, wishlistData)
        action()
    } catch (error) {
        console.log(error.response?.data || error)
        action('Failed to add product to wishlist')
    }
}
export const deleteWishlist = async (wishlistData, action) => {
    try {
        await api.delete(`/delete`, {params:wishlistData})
        action()
    } catch (error) {
        console.log(error.response?.data || error)
        action('Failed to delete product from wishlist')
    }
}
