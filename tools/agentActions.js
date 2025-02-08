const getAgentActions = (response) => {
  if (!response || !response.additional_kwargs) {
      return [];
  }

  const toolCalls = response.additional_kwargs.tool_calls || [];
  
  return toolCalls.map((toolCall) => {
      return {
          tool: toolCall.function?.name || 'unknown',
          toolInput: toolCall.function?.arguments ? 
              JSON.parse(toolCall.function.arguments) : {},
          log: "",
      };
  });
};

module.exports = {
  getAgentActions
};