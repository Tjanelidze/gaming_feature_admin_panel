import * as fs from "node:fs";
import {fileURLToPath,} from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const readDbFile = <T>(filename: string): T => {
    const filePath = path.join(__dirname, "../data", filename);
    const data = fs.readFileSync(filePath, {encoding: "utf8"});

    return JSON.parse(data) as T;
};

export const writeDbFile = <T>(filename: string, data: T): void => {
    const filePath = path.join(__dirname, "../data", filename);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), {encoding: "utf8"});
};