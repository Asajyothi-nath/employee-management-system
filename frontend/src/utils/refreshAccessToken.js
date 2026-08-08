import axios from "axios";

const refreshAccessToken = async() => {

  try {

    const refreshToken = localStorage.getItem("refreshToken");

    const response = await axios.post(

      "http://localhost:8000/api/auth/refresh-token",

      {
        refreshToken
      }
    );

    localStorage.setItem("token",response.data.accessToken);

    return response.data.accessToken;

  } catch(error){

    console.log(error);

    localStorage.removeItem("token");

    localStorage.removeItem("refreshToken");

    localStorage.removeItem("user");

    window.location.href = "/login";
  }
};

export default refreshAccessToken;