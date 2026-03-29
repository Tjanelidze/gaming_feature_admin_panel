import {NextFunction, Request, Response} from 'express';
import {readDbFile, writeDbFile} from "@/utils/jsonDb";
import {IRaffle, RaffleParams, RaffleQueryParams} from "@/types/raffle.types";
import {parsePagination, sortItems} from "@/utils/queryHelpers";
import {RaffleReqBody, RaffleUpdateBody} from "@/validators/raffle.validator";
import AppError from "@/utils/AppError";


export const getAllRaffles = async (
    req: Request<unknown, unknown, unknown, RaffleQueryParams>,
    res: Response
): Promise<Response> => {
    const raffles = readDbFile<IRaffle[]>('raffles.json');

    const {
        page: rawPage,
        limit: rawLimit,
        status,
        sortBy = 'createdAt',
        order = 'desc',
        startDateFrom,
        endDateTo,
    } = req.query;

    const {page, limit, startIndex} = parsePagination(rawPage, rawLimit);

    const filtered = raffles.filter((r: IRaffle) => {
        if (status && r.status !== status) return false;
        if (startDateFrom && r.startDate < startDateFrom) return false;

        return !(endDateTo && r.endDate > endDateTo);
    });
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
            raffles: paginated
        },
    });
};

export const createRaffle = async (
    req: Request<{}, {}, RaffleReqBody>,
    res: Response
): Promise<Response> => {
    const {
        name,
        description,
        status,
        startDate,
        endDate,
        drawDate,
        ticketPrice,
        maxTicketsPerUser,
        totalTicketLimit,
        prizes,
    } = req.body;

    const raffles = readDbFile<IRaffle[]>('raffles.json');

    const newPrizes = prizes.map((p) => ({...p, id: crypto.randomUUID()}));
    const newRaffle: IRaffle = {
        id: crypto.randomUUID(),
        name,
        description,
        status,
        startDate,
        endDate,
        drawDate,
        ticketPrice,
        maxTicketsPerUser,
        totalTicketLimit,
        prizes: newPrizes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    raffles.push(newRaffle);
    writeDbFile('raffles.json', raffles);

    return res.status(201).json({
        status: 'success',
        data: {raffle: newRaffle},
    });
};

export const getRaffle = async (
    req: Request<RaffleParams, unknown, unknown, unknown>,
    res: Response, next: NextFunction
): Promise<Response | void> => {
    const {id} = req.params;
    const raffles = readDbFile<IRaffle[]>('raffles.json');
    const raffle = raffles.find(r => r.id === id);

    if (!raffle) {
        return next(new AppError('No raffle found with that ID', 404));
    }

    return res.status(200).json({
        status: 'success',
        data: {
            raffle
        }
    });
};

export const updateRaffle = async (
    req: Request<RaffleParams, unknown, RaffleUpdateBody>,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const {id} = req.params;
    const raffles = readDbFile<IRaffle[]>('raffles.json');
    const raffleIndex = raffles.findIndex((w) => w.id === id);

    if (raffleIndex === -1) {
        return next(new AppError('No raffle found with that ID', 404));
    }

    if (raffles[raffleIndex].status === 'drawn') {
        return next(new AppError('Cannot edit a raffle that has already been drawn', 403));
    }

    const updatedRaffle: IRaffle = {
        ...raffles[raffleIndex],
        ...req.body,
        id,
        prizes: req.body.prizes
            ? req.body.prizes.map((p) => ({...p, id: p.id ?? crypto.randomUUID()}))
            : raffles[raffleIndex].prizes,
        updatedAt: new Date().toISOString(),
    };

    raffles[raffleIndex] = updatedRaffle;
    writeDbFile('raffles.json', raffles);

    return res.status(200).json({
        status: 'success',
        data: {raffle: updatedRaffle},
    });
};

export const deleteRaffle = async (
    req: Request<RaffleParams>,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const {id} = req.params;
    const raffles = readDbFile<IRaffle[]>('raffles.json');
    const raffleIndex = raffles.findIndex((r) => r.id === id);

    if (raffleIndex === -1) {
        return next(new AppError('No raffle found with that ID', 404));
    }

    raffles.splice(raffleIndex, 1);
    writeDbFile('raffles.json', raffles);

    return res.status(204).send();
};
