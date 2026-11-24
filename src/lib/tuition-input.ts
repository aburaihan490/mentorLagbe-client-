export interface TuitionInput {
    title: string;
    subject: string;
    classLevel: string;
    mode: 'Online' | 'Offline';
    location: string;
    monthlyFee: number;
    daysPerWeek: number;
    bannerImage: string;
    description: string;
}

export interface ParsedTuitionInput {
    value: TuitionInput | null;
    errors: string[];
}

const str = (value: unknown) => String(value ?? '').trim();

/** Validates the tuition payload shared by the create and edit endpoints. */
export function parseTuitionInput(body: Record<string, unknown>): ParsedTuitionInput {
    const title = str(body.title);
    const subject = str(body.subject);
    const classLevel = str(body.classLevel);
    const mode = str(body.mode);
    const location = str(body.location);
    const monthlyFee = Number(body.monthlyFee);
    const daysPerWeek = Number(body.daysPerWeek);
    const bannerImage = str(body.bannerImage);
    const description = str(body.description);

    const errors: string[] = [];

    if (!title || title.length < 5) {
        errors.push('Title must be at least 5 characters long.');
    }
    if (!subject) errors.push('Subject is required.');
    if (!classLevel) errors.push('Class level is required.');
    if (mode !== 'Online' && mode !== 'Offline') {
        errors.push('Mode must be Online or Offline.');
    }
    if (!location) errors.push('Location is required.');
    if (!Number.isFinite(monthlyFee) || monthlyFee <= 0) {
        errors.push('Monthly fee must be a positive number.');
    }
    if (
        !Number.isInteger(daysPerWeek) ||
        daysPerWeek < 1 ||
        daysPerWeek > 7
    ) {
        errors.push('Days per week must be between 1 and 7.');
    }
    if (!bannerImage.startsWith('http')) {
        errors.push('Please upload a banner image.');
    }
    if (description.length < 10) {
        errors.push('Description must be at least 10 characters long.');
    }

    if (errors.length > 0) return { value: null, errors };

    return {
        value: {
            title,
            subject,
            classLevel,
            mode: mode as 'Online' | 'Offline',
            location,
            monthlyFee,
            daysPerWeek,
            bannerImage,
            description,
        },
        errors: [],
    };
}
