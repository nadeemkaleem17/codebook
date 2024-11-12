function getSession() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const id = JSON.parse(sessionStorage.getItem("cbid"));
  return { id, token };
}
async function getUser() {
  const authData = getSession();
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authData.token}`,
    },
  };
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/600/users/${authData.id}`,
    requestOptions
  );
  if (!response.ok) {
    // eslint-disable-next-line no-throw-literal
    throw { message: response.statusText, status: response.status };
  }
  const data = await response.json();
  return data;
}
async function createOrder(cartList, total, user) {
  const authData = getSession();

  const order = {
    cartList: cartList,
    amount_paid: total,
    quantity: cartList.length,
    user: {
      name: user.name,
      email: user.email,
      id: user.id,
    },
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authData.token}`,
    },
    body: JSON.stringify(order),
  };
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/660/orders`,
    requestOptions
  );
  if (!response.ok) {
    // eslint-disable-next-line no-throw-literal
    throw { message: response.statusText, status: response.status };
  }
  const data = await response.json();
  return data;
}
async function getUserOrders() {
  const authData = getSession();
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authData.token}`,
    },
  };
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/660/orders?user.id=${authData.id}`,
    requestOptions
  );
  if (!response.ok) {
    // eslint-disable-next-line no-throw-literal
    throw { message: response.statusText, status: response.status };
  }
  const data = await response.json();
  return data;
}

export { getUser, getUserOrders, createOrder };
