export interface ITuition {
    _id: string;
    title: string;
    subject: string;
    classLevel: string;
    mode: 'Online' | 'Offline';
    location: string;
    monthlyFee: number;
    daysPerWeek: number;
    bannerImage: string;
    description: string;
    tutorName: string;
    tutorEmail: string;
    approvalStatus: 'approved' | 'pending' | 'rejected';
    isActive: boolean;
}
export interface IPagination {
    currentPage: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface ITuitionResponse {
    success: boolean;
    message: string;
    data: ITuition[];
    pagination: IPagination;
}
