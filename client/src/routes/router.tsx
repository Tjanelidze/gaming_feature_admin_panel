import {createBrowserRouter} from "react-router-dom";
import RoutesPaths from "./routesPaths.ts";
import {Layout} from "../components/Layout.tsx";
import {NotFound} from "../pages/NotFound.tsx";
import {WheelListPage} from "../pages/WheelListPage.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: RoutesPaths.LEADERBOARD,
                element: <></>,
            },
            {
                path: RoutesPaths.RAFFLE,
                element: <></>,
            },
            {
                path: RoutesPaths.WHEEL,
                element: <WheelListPage/>,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound/>,
    },
]);