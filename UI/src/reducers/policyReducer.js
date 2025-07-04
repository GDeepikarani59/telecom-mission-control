const initialState = {
  loading: false,
  data: [],
  error: null,
};

const policyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_POLICIES_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_POLICIES_SUCCESS":
      return { ...state, loading: false, data: action.payload };

    case "FETCH_POLICIES_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default policyReducer;
