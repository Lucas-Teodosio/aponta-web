import { Role } from "./enum";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
}
