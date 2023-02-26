import WebSocket from 'ws';
import Logger from 'log4js';
import { ensureEnvVar } from "../utils/util";
import * as dotenv from "dotenv";
import { analyzeInput } from "../analyzer/analyzer";
dotenv.config();

export const port = parseInt(ensureEnvVar("PORT"));
// const analyzerPort = ensureEnvVar("PORT_TWO")
export const dispatcher = new WebSocket.Server({ port });

export const logger = Logger.getLogger();

// TOD: Handle multiple clients and let the analyzer manage
// const analyzers = new Map<WebSocket, WebSocket>();

dispatcher.on('connection', function connection(client: WebSocket) {
    logger.level = "info";
    logger.info("New Client Connection On. PORT: ", port);

    client.on('message', (message: string) => {
        logger.info("New client connected");
        // Send the message to the analyzer for processing
        const suggestedText = analyzeInput(message);
        client.send(JSON.stringify({ suggestedText }));
    });

    client.on('close', () => {
        logger.level = "warn";
        logger.warn(`Client disconnected for client`);
    });

    client.on('error', (error: Error) => {
        logger.level = "error";
        logger.error(`Client error: ${error.message}`);
    });
});
