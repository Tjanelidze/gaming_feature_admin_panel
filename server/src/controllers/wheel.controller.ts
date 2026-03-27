import {NextFunction, Request, Response} from 'express';
import {readDbFile, writeDbFile} from "@/utils/jsonDb";
import {IWheel, WheelParams, WheelQueryParams} from "@/types/wheel.types";
import AppError from "@/utils/AppError";
import {parsePagination, sortItems} from "@/utils/queryHelpers";
import {WheelReqBody, WheelUpdateBody} from "@/validators/wheel.validator";

export const getAllWheels = async (
    req: Request<unknown, unknown, unknown, WheelQueryParams>,
    res: Response
): Promise<Response> => {
    const wheels = readDbFile<IWheel[]>('wheels.json');

    const {
        page: rawPage,
        limit: rawLimit,
        status,
        sortBy = 'createdAt',
        order = 'desc',
    } = req.query;

    const {page, limit, startIndex} = parsePagination(rawPage, rawLimit);

    const filtered = status ? wheels.filter((r) => r.status === status) : wheels;
    const sorted = sortItems(filtered, sortBy, order);
    const paginated = sorted.slice(startIndex, startIndex + limit);

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
        status: 'success',
        total,
        totalPages,
        page,
        limit,
        data: {
            wheels: paginated
        },
    });
};

export const createWheel = async (
    req: Request<unknown, unknown, WheelReqBody, unknown>,
    res: Response
):
    Promise<Response> => {
    const {
        name,
        description,
        status,
        segments,
        maxSpinsPerUser,
        spinCost,
        backgroundColor,
        borderColor
    } = req.body;
    const wheels = readDbFile<IWheel[]>('wheels.json');
    const newSegments = segments.map((s) => ({...s, id: crypto.randomUUID(),}));

    const newWheel: IWheel = {
        id: crypto.randomUUID(),
        name,
        description,
        status,
        segments: newSegments,
        maxSpinsPerUser,
        spinCost,
        backgroundColor,
        borderColor,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    wheels.push(newWheel);
    writeDbFile('wheels.json', wheels);

    return res.status(201).json({
        status: 'success',
        data: {
            wheel: newWheel
        }
    });
};

export const getWheel = async (
    req: Request<WheelParams, unknown, unknown, unknown>,
    res: Response, next: NextFunction
): Promise<Response | void> => {
    const {id} = req.params;
    const wheels = readDbFile<IWheel[]>('wheels.json');
    const wheel = wheels.find(w => w.id === id);

    if (!wheel) {
        return next(new AppError('No wheel found with that ID', 404));
    }

    return res.status(200).json({
        status: 'success',
        data: {
            wheel
        }
    });
};


export const updateWheel = async (
    req: Request<WheelParams, unknown, WheelUpdateBody>,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const {id} = req.params;
    const wheels = readDbFile<IWheel[]>('wheels.json');
    const wheelIndex = wheels.findIndex((w) => w.id === id);

    if (wheelIndex === -1) {
        return next(new AppError('No wheel found with that ID', 404));
    }

    const updatedWheel: IWheel = {
        ...wheels[wheelIndex],
        ...req.body,
        id,
        segments: req.body.segments
            ? req.body.segments.map((s) => ({...s, id: s.id ?? crypto.randomUUID()}))
            : wheels[wheelIndex].segments,
        updatedAt: new Date().toISOString(),
    };

    wheels[wheelIndex] = updatedWheel;
    writeDbFile('wheels.json', wheels);

    return res.status(200).json({
        status: 'success',
        data: {wheel: updatedWheel},
    });
};

export const deleteWheel = async (
    req: Request<WheelParams>,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const {id} = req.params;
    const wheels = readDbFile<IWheel[]>('wheels.json');
    const wheelIndex = wheels.findIndex((w) => w.id === id);

    if (wheelIndex === -1) {
        return next(new AppError('No wheel found with that ID', 404));
    }

    wheels.splice(wheelIndex, 1);
    writeDbFile('wheels.json', wheels);

    return res.status(204).send();
};
