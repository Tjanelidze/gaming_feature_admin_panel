import app from "@/app";
import connectToDb from "@/db/connection";

const port = process.env.PORT || 3000;

async function startServer(): Promise<void> {
    try {
        await connectToDb();

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.error('Failed to bootstrap server:', err);
        process.exit(1);
    }
}

void startServer();