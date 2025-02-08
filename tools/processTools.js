const shouldProcessTools = async (state) => {
    const lastMessage = state[state.length - 1];
    const toolCalls = lastMessage.additional_kwargs.tool_calls ?? [];
    return toolCalls.length > 0 ? "processTools" : "end";
};

module.exports = {
    shouldProcessTools
};