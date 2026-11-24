import type { UserRole } from './user';

export interface IPayment {
    _id: string;
    userName: string;
    email: string;
    role: UserRole;
    planName: string;
    amount: number;
    currency: string;
    transactionId: string;
    paymentDate: string;
    status: string;
}

export interface IPaymentResponse {
    success: boolean;
    message: string;
    data: IPayment[];
}
