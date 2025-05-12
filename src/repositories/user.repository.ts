import { User } from '@prisma/client';
import { JWTUserPayload } from '../middlewares/auth.middleware';
import { prisma } from '../services/prisma.service';

/**
 * Repository handling User entity database operations
 */
export class UserRepository {
  /**
   * Find a user by their authentication token
   */
  public static async findByToken(token: string): Promise<JWTUserPayload | null> {
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
      },
      where: { token },
    });

    return user;
  }

  /**
   * Find a user by ID
   */
  public static async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}
