import { Roles } from './roles.model';
export interface User{
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    role: Roles;
}