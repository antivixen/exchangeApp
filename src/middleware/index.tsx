import { setCredentials } from "../actions";

export const getCredentials = (store: any) => (next: any) => (action: any) => {
  if (action.type === "GET_CREDENTIALS_REQUEST") {
    const login =
      window.sessionStorage && window.sessionStorage.getItem("login");
    const password =
      window.sessionStorage && window.sessionStorage.getItem("password");
    if (login && password) {
      store.dispatch(setCredentials({ login, password }));
    }
  }

  if (action.type === "SET_CREDENTIALS") {
    window.sessionStorage.setItem("login", action.payload.login);
    window.sessionStorage.setItem("password", action.payload.password);
  }
  next(action);
};
