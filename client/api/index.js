import axios from "axios";

export async function loginUser(username, password) {
    try {
      const { data } = await axios.post("/api/users/login", {
        username,
        password,
      });
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  
