import { PROFILE_TYPES } from "../actions/profileAction";
import { EditData } from '../actions/globaltypes'

const initialState = {
  loading: false,
  ids: [],
  users: [],
  posts: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case PROFILE_TYPES.GET_USER:
      return {
        ...state,
        users: [...state.users, action.payload.user],
      };

    case PROFILE_TYPES.FOLLOW:
      console.log(action.payload);
      return {
        ...state,
        users: EditData(state.users, action.payload._id, action.payload)
      };

    case PROFILE_TYPES.UNFOLLOW:
      console.log(action.payload);
      return {
        ...state,
        users: EditData(state.users, action.payload._id, action.payload)
      };

    default:
      return state;
  }
};

export default profileReducer;
