export interface UserDTO{
  username: string,
  gender: string,
  age: number,
  height: number,
  weight: number,
  activity: string,
  calories: number,
}
export interface AuthUserDTO extends UserDTO{
  _id: string,
  isAuthenticated: boolean,
}
