export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export interface IApplication {
    _id: string;
    tuitionId: string;
    tuitionTitle: string;
    subject: string;
    monthlyFee: number;

    tutorEmail: string;
    tutorName?: string;

    studentId?: string;
    studentName: string;
    studentEmail: string;
    studentPhone: string;

    qualification?: string;
    preferredSchedule?: string;
    studentNote?: string;

    status: ApplicationStatus;

    appliedAt?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IApplicationResponse {
    success: boolean;
    message: string;
    data: IApplication[];
}
