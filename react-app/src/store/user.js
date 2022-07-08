const UPDATE_USER = "USER/UPDATE_USER";
const LOAD_USER = "USER/LOAD_USER";

const update = (user) => ({
    type: UPDATE_USER,
    user,
});

const load = (user) => ({
  type: LOAD_USER,
  user,
});

export const getUsers = () => async (dispatch) => {
  const response = await fetch(`/api/users`);

  if (response.ok) {
    const user = await response.json();
    dispatch(load(user));
  }
};

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
    case LOAD_USER:
      const allUsersState = action.user;
      return {
        ...allUsersState,
      };
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
