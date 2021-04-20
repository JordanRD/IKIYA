import api from '../httpService';



export const addWishlist = async (wishlistData, action) => {
    try {
        await api('/wishlist').post(`/add`, wishlistData)
        action()
    } catch (error) {
        console.log(error.response?.data || error)
        action('Failed to add product to wishlist')
    }
}
export const deleteWishlist = async (wishlistData, action) => {
    try {
        await api('/wishlist').delete(`/delete`, {params:wishlistData})
        action()
    } catch (error) {
        console.log(error.response?.data || error)
        action('Failed to delete product from wishlist')
    }
}
