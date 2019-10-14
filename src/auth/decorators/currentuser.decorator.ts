import { createParamDecorator } from '@nestjs/common';

export const CurrentUserDec = createParamDecorator(
    (data, [root, args, ctx, info]) => {
        return ctx.req.user;
    }
);