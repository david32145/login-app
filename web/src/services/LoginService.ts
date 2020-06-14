import history from "utils/history";
import ApiService from "./ApiServices";

interface AuthResponse {
  type: string;
  token: string;
}

class LoginService {
  private static APP_NAME = "@form_app";

  public async singIn(email: string, password: string): Promise<void> {
    const response = await ApiService.post<AuthResponse>("/auth", {
      email,
      password,
    });

    localStorage.setItem(`${LoginService.APP_NAME}/token`, response.data.token);
    history.push("/forms");
  }

  public isLogged(): boolean {
    return localStorage.getItem(`${LoginService.APP_NAME}/token`) !== null;
  }

  public getToken(): string | null {
    return localStorage.getItem(`${LoginService.APP_NAME}/token`);
  }
}

export default new LoginService();
