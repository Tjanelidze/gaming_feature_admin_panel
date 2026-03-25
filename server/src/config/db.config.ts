const {MONGODB_USERNAME, MONGODB_PASSWORD} = process.env;

export const DB_URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.ffha3vv.mongodb.net/?appName=Cluster0`;
