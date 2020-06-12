import ApiService from "./ApiServices";

interface User {
  _id: string;
  name: string;
  bio?: string;
  email: string;
  password_hash: string;
  avatar_uri?: string;
  created_at?: Date;
  updated_at?: Date;
  __v: number;
}

class UserSerice {
  public async singUp(
    name: string,
    bio: string,
    email: string,
    password: string
  ): Promise<User> {
    const { data } = await ApiService.post<User>("/users", {
      name,
      bio,
      email,
      password,
    });

    return data;
  }
}

export default new UserSerice();
