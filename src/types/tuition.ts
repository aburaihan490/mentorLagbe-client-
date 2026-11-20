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
