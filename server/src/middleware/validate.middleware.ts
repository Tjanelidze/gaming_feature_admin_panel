import {NextFunction, Request, Response} from 'express';
import {z} from 'zod';

export const validate = (schema: z.ZodType) =>
    (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                status: 'error',
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                })),
            });

            return;
        }

        req.body = result.data;
        next();
    };