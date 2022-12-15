import React, { useState } from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globaltypes";

const StatusModal = () => {
  const { auth } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();

  return (
    <div className="status_modal">
      <form>
        <div className="status_header">
          <h5 className="m-0">
            Create Post
          </h5>
          <span
            onClick={() =>
              dispatch({
                type: GLOBALTYPES.STATUS,
                payload: false,
              })
            }
          >
            &times;
          </span>
        </div>
        <div className="status_body">
          <textarea
            name="content"
            placeholder={`${auth.user.username}, what are you thinking?`}
          />
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
