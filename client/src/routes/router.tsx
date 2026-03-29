import {createBrowserRouter} from "react-router-dom";
import RoutesPaths from "./routesPaths.ts";
import {Layout} from "../components/Layout.tsx";
import {NotFound} from "../pages/NotFound.tsx";
import {WheelListPage} from "../features/wheel/pages/WheelListPage.tsx";
import {WheelCreatePage} from "@/features/wheel/pages/WheelCreatePage.tsx";
import {WheelEditPage} from "@/features/wheel/pages/WheelEditPage.tsx";
import {WheelDetailPage} from "@/features/wheel/pages/WheelDetailPage.tsx";
import {RaffleListPage} from "@/features/raffle/pages/RaffleListPage.tsx";
import {RaffleCreatePage} from "@/features/raffle/pages/RaffleCreatePage.tsx";
import {RaffleEditPage} from "@/features/raffle/pages/RaffleEditPage.tsx";
import {RaffleDetailPage} from "@/features/raffle/pages/RaffleDetailPage.tsx";
import {LeaderboardListPage} from "@/features/leaderboard/pages/LeaderboardListPage.tsx";
import {LeaderboardCreatePage} from "@/features/leaderboard/pages/LeaderboardCreatePage.tsx";
import {LeaderboardEditPage} from "@/features/leaderboard/pages/LeaderboardEditPage.tsx";
import {LeaderboardDetailPage} from "@/features/leaderboard/pages/LeaderboardDetailPage.tsx";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {path: RoutesPaths.LEADERBOARD, element: <LeaderboardListPage/>},
            {path: RoutesPaths.LEADERBOARD_CREATE, element: <LeaderboardCreatePage/>},
            {path: RoutesPaths.LEADERBOARD_EDIT, element: <LeaderboardEditPage/>},
            {path: RoutesPaths.LEADERBOARD_DETAIL, element: <LeaderboardDetailPage/>},
            {path: RoutesPaths.RAFFLE, element: <RaffleListPage/>},
            {path: RoutesPaths.RAFFLE_CREATE, element: <RaffleCreatePage/>},
            {path: RoutesPaths.RAFFLE_EDIT, element: <RaffleEditPage/>},
            {path: RoutesPaths.RAFFLE_DETAIL, element: <RaffleDetailPage/>},
            {path: RoutesPaths.WHEEL, element: <WheelListPage/>},
            {path: RoutesPaths.WHEEL_CREATE, element: <WheelCreatePage/>},
            {path: RoutesPaths.WHEEL_EDIT, element: <WheelEditPage/>},
            {path: RoutesPaths.WHEEL_DETAIL, element: <WheelDetailPage/>},
        ],
    },
    {
        path: '*',
        element: <NotFound/>,
    },
]);