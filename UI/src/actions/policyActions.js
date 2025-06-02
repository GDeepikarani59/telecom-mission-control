import axios from "axios";
const URI = "http://localhost:5000/api/policies";
export const fetchPolicies = () => async (dispatch, getState) => {
  dispatch({ type: "FETCH_POLICIES_REQUEST" });

  try {
    const { auth } = getState();
    const token = auth.accessToken;
    const response = await axios.get(URI, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "FETCH_POLICIES_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_POLICIES_FAILURE",
      payload: error.response?.data?.message || "Failed to fetch policies",
    });
  }
};

export const updatePolicy = (policy) => async (dispatch, getState) => {
  const { auth } = getState();
  const token = auth.accessToken;

  try {
    const response = await axios.put(`${URI}/${policy._id}`, policy, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchPolicies());
  } catch (error) {
    console.error("Update policy failed", error);
  }
};

export const deletePolicy = (id) => async (dispatch, getState) => {
  const { auth } = getState();
  const token = auth.accessToken;

  try {
    await axios.delete(`${URI}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchPolicies());
  } catch (error) {
    console.error("Delete policy failed", error);
  }
};
