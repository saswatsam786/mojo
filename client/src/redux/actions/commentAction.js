import { postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globaltypes";
import { POST_TYPES } from "./postAction";


export const createComment = (post, newComment, auth) => async (dispatch) => {
    console.log({ post, newComment, auth })

    const newPost = { ...post, comments: [...post.comments, newComment] }

    try {
        const data = { ...newComment, postId: post._id }
        const res = await postDataAPI('comment', data, auth.token)
        console.log(res)
    }
    catch (err) {
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: { error: err.response.data.msg } })

    }
}