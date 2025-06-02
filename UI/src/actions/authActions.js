import axios from "axios";

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });

  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      credentials
    );

    const { accessToken, refreshToken } = response.data.tokens;
    const { username, role } = response.data;
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        accessToken,
        refreshToken,
        username,
        role,
      },
    });
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", username);
    localStorage.setItem("role", role);
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.response?.data?.message || "Login failed",
    });
  }
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  return { type: "LOGOUT" };
};
