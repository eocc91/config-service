export abstract class PasswordHashService {
    abstract hashPassword(password: string): Promise<string>;
    abstract comparePasswords(hashedPassword: string, providedPassword: string): Promise<boolean>;
}