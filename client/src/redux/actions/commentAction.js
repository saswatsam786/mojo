import { postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globaltypes";
import { POST_TYPES } from "./postAction";


export const createComment = (post, newComment, auth) => async (dispatch) => {
    console.log({ post, newComment, auth })

    const newPost = { ...post, comments: [...post.comments, newComment] }

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    try {
        const data = { ...newComment, postId: post._id }
        const res = await postDataAPI('comment', data, auth.token)

        const newData = { ...res.data.newComment, user: auth.user }
        const newPost = { ...post, comments: [...post.comments, newData] }

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    }
    catch (err) {
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: { error: err.response.data.msg } })

    }
}