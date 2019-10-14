
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum Permission {
    ADMIN = "ADMIN",
    USER = "USER"
}

export class AuthInput {
    email: string;
    password: string;
}

export class CreateUserInput {
    name: string;
    email: string;
    password: string;
}

export class AuthPayload {
    token: string;
    user: User;
}

export class CurrentUser {
    email: string;
    id: string;
    permissions?: Permission[];
}

export class Message {
    message?: string;
}

export abstract class IMutation {
    abstract login(data: AuthInput): AuthPayload | Promise<AuthPayload>;

    abstract logout(): Message | Promise<Message>;

    abstract createUser(data: CreateUserInput): User | Promise<User>;
}

export abstract class IQuery {
    abstract currentUser(): User | Promise<User>;

    abstract users(): User[] | Promise<User[]>;

    abstract hello(name: string): string | Promise<string>;
}

export class User {
    id: string;
    name: string;
    email?: string;
    password?: string;
    permissions?: Permission[];
    createdAt: DateTime;
    updatedAt: DateTime;
}

export type DateTime = any;
