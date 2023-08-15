import axios from "axios";

export const signupApi = async (formData) => {
  try {
    const { data } = await axios.post("/api/user/register", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("data in auth.js", data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
