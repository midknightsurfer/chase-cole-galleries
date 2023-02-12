const ADD_FAVORITE = 'favorites/ADD_FAVORITE'
const GET_FAVORITES = 'favorites/GET_FAVORITES'
const REMOVE_FAVORITE = 'favorites/REMOVE_FAVORITE'

const getAll = (favorites) => ({
    type: GET_FAVORITES,
    favorites
});

const addOne = (favorite) => ({
    type: ADD_FAVORITE,
    favorite
})

const removeOne = (productId) => ({
    type: REMOVE_FAVORITE,
    productId
})

export const unfavorite = (favoriteId) => async (dispatch) => {
    const response = await fetch(`/api/favorites/${favoriteId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = await response.json()
        if(data.errors) {
          return;
        }
        dispatch(removeOne(data))
    }
}

export const favorite = (payload) => async (dispatch) => {
    const response = await fetch('/api/favorites', {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
        dispatch(addOne(data));
        return data
      }
}

export const getFavorites = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/favorites`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }

        dispatch(getAll(data));
      }
}

const initialState = {};

const favoritesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_FAVORITES:
            return { ...state, ...action.favorites }
        case ADD_FAVORITE:
            return {...state, [action.favorite.product_id] : action.favorite}
        case REMOVE_FAVORITE:
            const newState = {...state}
            delete newState[action.productId.product_id]
            return newState
        default:
            return state;
    }
}

export default favoritesReducer;