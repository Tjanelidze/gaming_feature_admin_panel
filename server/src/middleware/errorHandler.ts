import {NextFunction, Request, Response} from 'express';
import AppError from "@/utils/AppError";

function isAppError(err: unknown): err is AppError {
    return err instanceof AppError;
}

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const errorInstance = err ?? new Error(String(err));

    console.error('Global error handler caught: ', errorInstance);

    if (res.headersSent) {
        return next(errorInstance);
    }

    const statusCode = isAppError(errorInstance) ? errorInstance.statusCode : 500;
    const status = isAppError(errorInstance) ? errorInstance.status : 'error';

    res.status(statusCode).json({
        status,
        message: errorInstance.message,
        stack: errorInstance.stack,
    });
};

export default errorHandler;