import {createBrowserRouter} from "react-router-dom";
import RoutesPaths from "./routesPaths.ts";
import {Layout} from "../components/Layout.tsx";
import {NotFound} from "../pages/NotFound.tsx";

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
                element: <></>,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound/>,
    },
]);