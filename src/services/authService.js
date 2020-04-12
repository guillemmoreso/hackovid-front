import axios from "axios";

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  signup(user) {
    const { username, password, name, surname, contactInfo, description } = user;
    return this.auth
      .post("/signup", { username, password, name, surname, contactInfo, description })
      .then(({ data }) => {
        return data;
      });
  }

  login(user) {
    const { username, password } = user;
    return this.auth
      .post("/login", { username, password })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.get("/logout", {}).then((response) => response.data);
  }

  userDelete() {
    return this.auth
      .post("/deleteAccount", {})
      .then((response) => response.data);
  }

  me(user) {
    return this.auth.get("/me").then((response) => response.data);
  }

  profileUpdate(user) {
    return this.auth
      .put("/me", user)
      .then(({ data }) => {
        return data;
      });
  }
}

const authService = new AuthService();

export default authService;
