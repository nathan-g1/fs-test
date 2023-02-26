import { logger } from "../dispatcher/dispatcher";
import { getDataSource } from "../db/db";

// Analyzes the input 
export const analyzeInput = (currentLineText: string) => {
    const suggestions = getDataSource();
    if (currentLineText.length === 0) return;
    // Here an algorithm like (popularity-based ranking) or a trained model can be used
    const remainingSuggestedText = suggestions.
        filter(suggestion => suggestion
            .startsWith(currentLineText))
        .map(suggestion => suggestion
            .substring(currentLineText.length));
    if (remainingSuggestedText) {
        logger.level = "debug";
        logger.debug("suggested text found", remainingSuggestedText)
    }
    logger.info("Remaining suggested", remainingSuggestedText)
    return remainingSuggestedText[0];
}
