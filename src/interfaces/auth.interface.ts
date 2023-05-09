export interface Auth extends Document {
  _id: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}
