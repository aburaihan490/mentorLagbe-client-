export type UserRole = 'student' | 'tutor' | 'admin';

export type UserPlan = 'free' | 'pro';

export interface IUser {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    bio?: string;
    image?: string;
    role: UserRole;
    plan: UserPlan;
}
