const UPDATE_USER = "user/UPDATE_USER";

const update = (user) => ({
    type: UPDATE_USER,
    user,
});

export const updateUser =
  (data, userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (res.ok) {
      const user = await res.json();
      dispatch(update(user));
      return ["Created", user];
    }
  };

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      const newState = {
        ...state,
        [action.user.id]: action.user,
      };
      return newState;
    default:
      return state;
  }
};

export default userReducer;
