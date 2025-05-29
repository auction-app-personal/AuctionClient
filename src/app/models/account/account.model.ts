export enum AccountRole {
    ADMIN = "ADMIN",
    USER = "USER",
    GUEST = "GUEST"
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

export interface AccountDto {
    id: number;
    username: string;
    email?: string;
    name?: string;
    surname?: string;
    dob?: Date;
    gender?: Gender;
    role: AccountRole;
}