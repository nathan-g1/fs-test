import fs from "fs";
import path from "path";

// Reads from a data source
export const getDataSource = (): string[] => {
    const fileName = "data-source.json";
    const filePath = path.join(__dirname, "..", "config", fileName);
    const buff = fs.readFileSync(filePath);
    return JSON.parse(buff.toString() || "{ data: [] }").data;
}
