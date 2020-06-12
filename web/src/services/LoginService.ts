import ApiService from "./ApiServices";

interface AuthResponse {
  type: string;
  token: string;
}

class LoginService {
  public async singIn(email: string, password: string): Promise<void> {
    const response = await ApiService.post<AuthResponse>("/auth", {
      email,
      password,
    });
  }
}

export default new LoginService();
