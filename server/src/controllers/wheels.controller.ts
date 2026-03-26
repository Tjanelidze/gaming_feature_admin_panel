import {NextFunction, Request, Response} from 'express';
import {readDbFile, writeDbFile} from "@/utils/jsonDb";
import {IWheel, WheelParams, WheelQueryParams, WheelReqBody} from "@/types/wheels.types";
import {PAGINATION_DEFAULTS} from "@/constants/pagination.constants";
import AppError from "@/utils/AppError";

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

    const page = Math.max(1, parseInt(rawPage as string) || PAGINATION_DEFAULTS.DEFAULT_PAGE);
    const limit = Math.min(
        Math.max(1, parseInt(rawLimit as string) || PAGINATION_DEFAULTS.DEFAULT_LIMIT),
        PAGINATION_DEFAULTS.MAX_LIMIT
    );
    const startIndex = (page - 1) * limit;
    const filteredWheels = status
        ? wheels.filter((w: IWheel) => w.status === status)
        : wheels;
    const sortedWheels = [...filteredWheels].sort((a: IWheel, b: IWheel) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];

        if (aVal < bVal) return order === 'asc' ? -1 : 1;
        if (aVal > bVal) return order === 'asc' ? 1 : -1;

        return 0;
    });

    const paginatedWheels = sortedWheels.slice(startIndex, startIndex + limit);
    const total = filteredWheels.length;
    const totalPages = Math.ceil(filteredWheels.length / limit);

    return res.status(200).json({
        status: 'success',
        total,
        totalPages,
        page,
        limit,
        data: {
            wheels: paginatedWheels
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
    req: Request<WheelParams, unknown, Partial<WheelReqBody>>,
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
