import {NextFunction, Request, Response} from 'express';
import {readDbFile, writeDbFile} from "@/utils/jsonDb";
import {parsePagination, sortItems} from "@/utils/queryHelpers";
import {ILeaderboard, LeaderboardParams, LeaderboardQueryParams, LeaderboardStatus} from "@/types/leaderboard.types";
import AppError from "@/utils/AppError";
import {LeaderboardReqBody, LeaderboardUpdateBody} from "@/validators/leaderboard.validator";


export const getLeaderboards = async (
    req: Request<unknown, unknown, unknown, LeaderboardQueryParams>,
    res: Response
): Promise<Response> => {
    const leaderboards = readDbFile<ILeaderboard[]>('leaderboards.json');

    const {
        page: rawPage,
        limit: rawLimit,
        status,
        sortBy = 'createdAt',
        order = 'desc',
    } = req.query;

    const {page, limit, startIndex} = parsePagination(rawPage, rawLimit);

    const filtered = status ? leaderboards.filter((l) => l.status === status) : leaderboards;
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
            leaderboards: paginated
        },
    });
};

export const bulkUpdateStatus = async (
    req: Request<{}, {}, { ids: string[]; status: LeaderboardStatus }>,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const {ids, status} = req.body;

    if (!ids?.length) {
        return next(new AppError('No ids provided', 400));
    }

    const leaderboards = readDbFile<ILeaderboard[]>('leaderboards.json');
    const notFound = ids.filter((id) => !leaderboards.some((l) => l.id === id));

    if (notFound.length) {
        return next(new AppError(`Leaderboards not found: ${notFound.join(', ')}`, 404));
    }

    const updated = leaderboards.map((l) =>
        ids.includes(l.id)
            ? {...l, status, updatedAt: new Date().toISOString()}
            : l
    );
    writeDbFile('leaderboards.json', updated);

    return res.status(200).json({
        status: 'success',
        updated: ids.length,
        data: {
            leaderboards: updated.filter((l) => ids.includes(l.id)),
        },
    });
};

export const createLeaderboard = async (
    req: Request<{}, {}, LeaderboardReqBody>,
    res: Response
): Promise<Response> => {
    const {
        title,
        description,
        status,
        startDate,
        endDate,
        scoringType,
        maxParticipants,
        prizes,
    } = req.body;

    const leaderboards = readDbFile<ILeaderboard[]>('leaderboards.json');

    const newPrizes = prizes.map((p) => ({...p, id: crypto.randomUUID()}));

    const newLeaderboard: ILeaderboard = {
        id: crypto.randomUUID(),
        title,
        description,
        status,
        startDate,
        endDate,
        scoringType,
        maxParticipants,
        prizes: newPrizes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    leaderboards.push(newLeaderboard);
    writeDbFile('leaderboards.json', leaderboards);

    return res.status(201).json({
        status: 'success',
        data: {leaderboard: newLeaderboard},
    });
};

export const getLeaderboard = async (
    req: Request<LeaderboardParams, unknown, unknown, unknown>,
    res: Response, next: NextFunction
): Promise<Response | void> => {
    const {id} = req.params;
    const leaderboards = readDbFile<ILeaderboard[]>('leaderboards.json');
    const leaderboard = leaderboards.find(l => l.id === id);

    if (!leaderboard) {
        return next(new AppError('No leaderboard found with that ID', 404));
    }

    return res.status(200).json({
        status: 'success',
        data: {
            leaderboard
        }
    });
};

export const updateLeaderboard = async (
    req: Request<LeaderboardParams, {}, LeaderboardUpdateBody>,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const {id} = req.params;
    const leaderboards = readDbFile<ILeaderboard[]>('leaderboards.json');
    const leaderboardIndex = leaderboards.findIndex((l) => l.id === id);

    if (leaderboardIndex === -1) {
        return next(new AppError('No leaderboard found with that ID', 404));
    }

    const updatedLeaderboard: ILeaderboard = {
        ...leaderboards[leaderboardIndex],
        ...req.body,
        id,
        createdAt: leaderboards[leaderboardIndex].createdAt,
        prizes: req.body.prizes
            ? req.body.prizes.map((p) => ({...p, id: p.id ?? crypto.randomUUID()}))
            : leaderboards[leaderboardIndex].prizes,
        updatedAt: new Date().toISOString(),
    };

    leaderboards[leaderboardIndex] = updatedLeaderboard;
    writeDbFile('leaderboards.json', leaderboards);

    return res.status(200).json({
        status: 'success',
        data: {leaderboard: updatedLeaderboard},
    });
};

export const deleteLeaderboard = async (
    req: Request<LeaderboardParams>,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const {id} = req.params;
    const leaderboards = readDbFile<ILeaderboard[]>('leaderboards.json');
    const leaderboardIndex = leaderboards.findIndex((l) => l.id === id);

    if (leaderboardIndex === -1) {
        return next(new AppError('No leaderboard found with that ID', 404));
    }

    leaderboards.splice(leaderboardIndex, 1);
    writeDbFile('leaderboards.json', leaderboards);

    return res.status(204).send();
};