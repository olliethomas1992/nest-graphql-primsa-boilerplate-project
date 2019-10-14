import { CurrentUser, Permission, User } from '../types';
import { UsersService } from '../users/users.service';

const UserResolver = {
    password: {
        resolve(): null {
            return null;
        }
    },
    email: {
        resolve(
            parent,
            args,
            { req: { user } }: { req: { user: CurrentUser } },
            info
        ): string | null {
            // Return null if no user exists on the req obj.
            if (!user) {
                return null;
            }

            // If they are a logged in user, return email.
            if (user && user.id === parent.id) {
                return parent.email;
            }

            // If they have the correct permissions, return email.
            const isAdmin = UsersService.isAdmin(user);
            if (isAdmin) {
                return parent.email;
            }

            return null;
        }
    },
    permissions: {
        resolve(
            parent: User,
            args,
            { req: { user } }: { req: { user: CurrentUser } },
            info
        ): Permission[] | null {
            if (!user) {
                return null;
            }

            if (user && user.id === parent.id) {
                return parent.permissions;
            }

            // If they have the correct permissions, return email.
            const isAdmin = UsersService.isAdmin(user);
            if (isAdmin) {
                return parent.permissions;
            }

            return null;
        }
    }
};

export { UserResolver as User };
