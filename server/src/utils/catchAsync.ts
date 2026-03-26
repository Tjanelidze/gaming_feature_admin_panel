import {NextFunction, Request, Response} from 'express';

type AsyncHandler<P = {}, ResB = {}, ReqB = {}, Q = {}> = (
    req: Request<P, ResB, ReqB, Q>,
    res: Response,
    next: NextFunction
) => Promise<Response | void>;

export default <P = {}, ResB = {}, ReqB = {}, Q = {}>(fn: AsyncHandler<P, ResB, ReqB, Q>) =>
    (req: Request<P, ResB, ReqB, Q>, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch((err: unknown) => next(err));
    };