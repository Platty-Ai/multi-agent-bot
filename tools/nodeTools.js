const { FunctionMessage } = require("@langchain/core/messages");
const { getAgentActions } = require("./agentActions");
const { ToolExecutor } = require("@langchain/langgraph/prebuilt");

const toolsNode = (tools) => {
    const toolExecutor = new ToolExecutor({ tools });

    const toolsNodeFunc = async (state) => {
        const lastMessage = state[state.length - 1];
        const toolCalls = lastMessage.additional_kwargs.tool_calls ?? [];
        
        if (toolCalls.length === 0) {
            throw new Error("No tool calls found");
        }
        
        const actions = getAgentActions({ messages: state });

        const responses = await Promise.all(
            actions.map((action) => {
                return toolExecutor.invoke(action);
            })
        );

        const functionMessages = responses.map((response, index) => {
            return new FunctionMessage({
                content: response,
                name: actions[index].tool,
            });
        });

        return functionMessages;
    };

    return toolsNodeFunc;
};

module.exports = {
    toolsNode
};