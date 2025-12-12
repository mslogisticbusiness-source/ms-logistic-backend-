import axios from "axios";

export async function createOrder(data) {
  const { courier, token, orderData } = data;

  if (courier === "bharatship") {
    const url = "https://app.bharatship.com/api/v1/order/create";

    const result = await axios.post(url, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result.data;
  }

  if (courier === "nimbus") {
    const url = "https://api.nimbuspost.com/v1/shipments/create";

    const result = await axios.post(url, orderData, {
      headers: {
        Authorization: token,
      },
    });

    return result.data;
  }

  return { error: "Invalid courier type" };
}
