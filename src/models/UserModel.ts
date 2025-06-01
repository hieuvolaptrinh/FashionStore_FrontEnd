export interface UserModel {
  userId?: number;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  password: string;
  userName: string;
  avatarBase64: string | null;
  roles?: string[];
  active?: boolean;
}
