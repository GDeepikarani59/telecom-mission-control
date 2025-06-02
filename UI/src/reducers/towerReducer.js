import {
  FETCH_TOWERS_REQUEST,
  FETCH_TOWERS_SUCCESS,
  FETCH_TOWERS_FAILURE,
} from "../actions/towerActions";

const initialState = {
  towers: [],
  loading: false,
  error: null,
};

const towerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOWERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TOWERS_SUCCESS:
      return {
        ...state,
        loading: false,
        towers: action.payload,
      };
    case FETCH_TOWERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default towerReducer;
