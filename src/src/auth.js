import axios from "axios";

export async function loginBharatship(email, password) {
  const url = "https://app.bharatship.com/api/v1/user/login";

  const body = {
    email,
    password,
  };

  const result = await axios.post(url, body);
  return result.data;
}

export async function loginNimbus(email, password) {
  const url = "https://api.nimbuspost.com/v1/users/login";

  const body = {
    email,
    password,
  };

  const result = await axios.post(url, body);
  return result.data;
}
