import * as crypto from 'crypto';
import * as util from 'util';

const scryptAsync = util.promisify(crypto.scrypt);

export class Password {
  static async hash(password: string): Promise<string> {
    const salt = crypto.randomBytes(8).toString('hex');
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare(
    storedPassword: string,
    suppliedPassword: string,
  ): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split('.');
    if (!hashedPassword || !salt) return false;

    const buffer = crypto.scryptSync(suppliedPassword, salt, 64) as Buffer;
    return hashedPassword === buffer.toString('hex');
  }
}
