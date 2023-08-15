import axios from "axios";

export const signupAction = (formData) => async (dispatch) => {
  try {
    console.log("Task 3", formData);
    dispatch({ type: "signupRequest" });

    const { data } = await axios.post("/api/user/register", formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log("Task 4", data);

    dispatch({ type: "signupSuccess", payload: data });

    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: "signupFailed", payload: error.response.data.message });
    return error;
  }
};

export const loginAction = (formData) => async (dispatch) => {
  try {
    console.log("Task 3", formData);
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post("/api/user/login", formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log("Task 4", data);

    dispatch({ type: "loginSuccess", payload: data });

    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: "loginFailed", payload: error.response.data.message });
    return error;
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    const { data } = await axios.post("/api/user/logout", {
      withCredentials: true,
    });

    dispatch({ type: "logoutSuccess", payload: data });

    return data;
  } catch (error) {
    dispatch({ type: "logoutFailed", payload: error.response.data.message });
    return error;
  }
};
