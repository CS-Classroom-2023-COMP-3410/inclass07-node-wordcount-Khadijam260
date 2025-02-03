// TODO: Import required modules
// Hint: You will need the 'fs' module for reading the file and the 'chalk' library for coloring the words.
const fs = require('fs'); // File system module (built-in)
const chalk = require('chalk'); // External package (requires installation)

/**
 * Synchronously reads the content of 'declaration.txt'.
 * @returns {string} The content of the file.
 */
function readFileContent() {
    // TODO: Use the 'fs' module to synchronously read the content of 'declaration.txt' and return it.
    try {
        return fs.readFileSync('declaration.txt', 'utf8'); // Ensure the file exists in the same directory
    } catch (error) {
        console.error('Error reading the file:', error.message);
        return ''; // Return an empty string to prevent undefined errors
    }
}

/**
 * Gets the word count from the content.
 * @param {string} content The file content.
 * @returns {Object} An object with words as keys and their occurrences as values.
 */
function getWordCounts(content) {
    const wordCount = {};
    const words = content.toLowerCase().split(/\W+/).filter(Boolean); // Normalize to lowercase for case insensitivity

    for (const word of words) {
        wordCount[word] = (wordCount[word] || 0) + 1;
    }

    return wordCount;
}


/**
 * Colors a word based on its frequency.
 * @param {string} word The word to be colored.
 * @param {number} count The frequency of the word.
 * @returns {string} The colored word.
 */
function colorWord(word, count) {
    if (count === 1) {
        return chalk.blue(word); // Blue for words that occur once
    } else if (count >= 2 && count <= 5) {
        return chalk.green(word); // Green for words occurring 2-5 times
    } else {
        return chalk.red(word); // Red for words occurring more than 5 times
    }
}


/**
 * Prints the first 15 lines of the content with colored words.
 * @param {string} content The file content.
 * @param {Object} wordCount The word occurrences.
 */
function printColoredLines(content, wordCount) {
    const lines = content.split('\n').slice(0, 15); // Get the first 15 lines

    for (const line of lines) {
        const coloredLine = line.split(/\W+/).map(word => {
            if (!word) return ''; // Handle empty words caused by split
            return colorWord(word, wordCount[word.toLowerCase()] || 0); // Color the word based on frequency
        }).join(' ');

        console.log(coloredLine);
    }
}


/**
 * Main function to read the file, count the word occurrences and print the colored lines.
 */
function processFile() {
    const content = readFileContent();
    const wordCount = getWordCounts(content);
    printColoredLines(content, wordCount);
}

if (require.main === module) {
    // This will execute only if the file is run directly.
    processFile();
}

// Export functions for testing
module.exports = {
    readFileContent,
    getWordCounts,
    colorWord,
    printColoredLines,
    processFile
};
