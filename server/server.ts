import app from "@/app";

const port = process.env.PORT || 3000;

async function startServer(): Promise<void> {
    try {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.error('Failed to bootstrap server:', err);
        process.exit(1);
    }
}

void startServer();