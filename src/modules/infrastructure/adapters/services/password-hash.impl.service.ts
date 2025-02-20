import { PasswordHashService } from '@domain/ports/inbound/password-hash.service';
import bcrypt from 'bcrypt';

export class PasswordHashServiceImpl implements PasswordHashService {
  comparePasswords(hashedPassword: string, providedPassword: string): Promise<boolean> {
      throw new Error('Method not implemented.');
  }
  private readonly saltRounds = 10; // Número de rondas de hashing (puedes ajustar según el rendimiento deseado)

  /**
   * Genera un hash seguro para la contraseña
   * @param password La contraseña en texto plano
   * @returns El hash de la contraseña
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  /**
   * Compara una contraseña en texto plano con un hash
   * @param password La contraseña en texto plano
   * @param hash El hash almacenado
   * @returns `true` si coinciden, `false` en caso contrario
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
