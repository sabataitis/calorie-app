export interface Recommendations{
  proteins: {
    from: number,
    to: number,
  },
  carbs: {
    from: number,
    to: number,
  },
  fats: {
    from: number,
    to: number,
  }
}

export interface UserDTO{
  username: string,
  gender: string,
  age: number,
  height: number,
  weight: number,
  activity: string,
  calories: number,
  recommendations: Recommendations
}
export interface AuthUserDTO extends UserDTO{
  _id: string,
  isAuthenticated: boolean,
}
