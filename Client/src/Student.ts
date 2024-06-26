import { isRecord } from "./record";

export type basicStudent = {
    id: number;
    name: string;
};

export type Student = {
    name: string;
    email: string;
    phone: string;
    passType: string;
    startDate: string | null;
    endDate: string | null;
    numClasses: number | null;
};

export function isStudent(data: unknown): data is Student {
    return isRecord(data) &&
        typeof data.name === 'string' &&
        typeof data.email === 'string' &&
        typeof data.phone === 'string' &&
        typeof data.passType === 'string' &&
        (typeof data.startDate === 'string' || data.startDate === null) &&
        (typeof data.endDate === 'string' || data.endDate === null) &&
        (typeof data.numClasses === 'number' || data.numClasses === null);
}