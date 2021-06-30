import { User } from "./User";

export class Session {
    public access_token!: string;
    public expire_at!: string;
    public token_type!: string;
    public user!: User;

  }