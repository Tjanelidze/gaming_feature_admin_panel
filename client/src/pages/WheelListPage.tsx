import {useEffect, useState} from "react";

export const WheelListPage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/v1/wheels')
            .then(res => res.json())
            .then(setData);
    }, []);

    return <pre>{JSON.stringify(data, null, 2)}</pre>;
};