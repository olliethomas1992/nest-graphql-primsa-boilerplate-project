import { Injectable } from '@nestjs/common';

import { CurrentUser, Permission, User } from '../types';

@Injectable()
export class UsersService {
    public static hasPermissions(
        user: User | CurrentUser,
        permissionsNeeded: [Permission]
    ): boolean {
        // Check for Permissions
        if (!user.permissions) {
            return false;
        }

        // Check for matched Permissions
        const matchedPermissions = user.permissions.filter(userPermission =>
            permissionsNeeded.includes(userPermission)
        );

        // If no match then Error.
        if (!matchedPermissions.length) {
            return false;
        }

        return true;
    }

    public static isAdmin(user): boolean {
        return this.hasPermissions(user, ['ADMIN']);
    }
}
