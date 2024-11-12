async function login(userAuth) {
  const requestOptions = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(userAuth),
  };
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/login`,
    requestOptions
  );
  if (!response.ok) {
    // eslint-disable-next-line no-throw-literal
    throw { message: response.statusText, status: response.status };
  }
  const data = await response.json();
  // console.log(data);
  if (data.accessToken) {
    sessionStorage.setItem("token", JSON.stringify(data.accessToken));
    sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
  }
  return data;
}

async function register(userAuth) {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userAuth),
  };
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/register`,
    request
  );
  if (!response.ok) {
    // eslint-disable-next-line no-throw-literal
    throw { message: response.statusText, status: response.status };
  }
  const data = await response.json();
  // console.log(data);
  if (data.accessToken) {
    sessionStorage.setItem("token", JSON.stringify(data.accessToken));
    sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
  }
  return data;
}
function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("cbid");
}
export { login, register, logout };
