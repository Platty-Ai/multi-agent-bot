const { Tool } = require("@langchain/core/tools");

class CustomCalculatorTool extends Tool {
    name = "calculator";
    description = "A calculator for basic math operations. Input should be a valid mathematical expression like '2 + 2'";

    async _call(input) {
        try {
            // Sanitize input to only allow safe mathematical expressions
            if (!/^[\d\s+\-*/().]+$/.test(input)) {
                throw new Error("Invalid mathematical expression");
            }
            
            // Using Function with restricted context for safe evaluation
            const result = new Function(`return ${input}`)();
            
            return `The result is: ${result}`;
        } catch (error) {
            return `Error calculating result: ${error.message}`;
        }
    }
}

module.exports = { CustomCalculatorTool };