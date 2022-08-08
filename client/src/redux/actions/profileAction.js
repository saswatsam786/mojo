import { GLOBALTYPES } from "./globaltypes";
import { getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
};

export const getProfileUsers =
  ({ users, id, auth }) =>
  async (dispatch) => {
    console.log(users);

    let check = false;
    users.forEach((user) => {
      if (user._id === id) {
        check = true;
      }
    });

    if (!check) {
      try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
        const res = await getDataAPI(`/user/${id}`, auth.token);
        console.log(res);
        dispatch({ type: PROFILE_TYPES.GET_USER, payload: res.data });
        dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };

export const updateProfileUser =
  ({ userData, avatar, auth }) =>
  async (dispatch) => {
    if (!userData.fullname) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Please add your full name" },
      });
    }

    if (userData.fullname.length > 25) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Your full name too long" },
      });
    }

    if (userData.story.length > 25) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Your story is too long" },
      });
    }

    try {
      let media;
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: true },
      });

      if (avatar) media = await imageUpload([avatar]);

      console.log(media);

      const res = await patchDataAPI(
        "user",
        {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
        auth.token
      );

      console.log(res);

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: false },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
