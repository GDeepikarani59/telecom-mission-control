import axios from "axios";

export const FETCH_TOWERS_REQUEST = "FETCH_TOWERS_REQUEST";
export const FETCH_TOWERS_SUCCESS = "FETCH_TOWERS_SUCCESS";
export const FETCH_TOWERS_FAILURE = "FETCH_TOWERS_FAILURE";

export const fetchTowersRequest = () => ({
  type: FETCH_TOWERS_REQUEST,
});

export const fetchTowersSuccess = (towers) => ({
  type: FETCH_TOWERS_SUCCESS,
  payload: towers,
});

export const fetchTowersFailure = (error) => ({
  type: FETCH_TOWERS_FAILURE,
  payload: error,
});

export const fetchTowers = () => {
  return async (dispatch) => {
    dispatch(fetchTowersRequest());
    try {
      const response = await axios.get("/api/towers");
      dispatch(fetchTowersSuccess(response.data));
    } catch (error) {
      dispatch(fetchTowersFailure(error.message));
    }
  };
};
