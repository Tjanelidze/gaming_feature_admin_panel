import axios from 'axios';
import toast from "react-hot-toast";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});


instance.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message ||
            error.response?.data?.errors?.[0]?.messages?.[0] ||
            'Something went wrong';

        toast.error(message);

        return Promise.reject(error);
    }
);

export default instance;