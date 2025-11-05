export interface User {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  avatar: string;
  coverPhoto: string;
  friends: string[];
  friendRequests: string[];
  slug: string;
  role: string;

}

export interface LoginData {
  email: string;
  password: string;
}