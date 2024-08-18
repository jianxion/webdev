export const addToCart = item => ({
    type: 'ADD_TO_CART',
    payload: item,
})

export const removeFromCart = itemID => ({
    type: 'REMOVE_FROM_CART',
    payload: itemID,
})

