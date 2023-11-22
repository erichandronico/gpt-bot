const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAIKEY });

const model = "gpt-3.5-turbo-1106"  //desde 11-Dic se hará el upgrade a este modelo a todas las aplicaciones que acceden al modelo nombre gpt-3.5-turbo



const startGptConversation = async ({ messages, tools, availableFunctions }) => {

    try {
        const response          = await openai.chat.completions.create({ model, messages, tools, tool_choice: "auto" });
        const responseMessage   = response.choices[0].message;
        
        const toolCalls = responseMessage.tool_calls;
        
        if (responseMessage.tool_calls) {

            messages.push(responseMessage);  // extend conversation with assistant's reply

            for (const toolCall of toolCalls) {
                const functionName      = toolCall.function.name;
                const functionToCall    = availableFunctions[functionName];
                const functionArgs      = JSON.parse(toolCall.function.arguments);
                const functionResponse  = await functionToCall(functionArgs);

                // Step 4: send the info on the function call and function response to GPT
                messages.push({ 
                    tool_call_id: toolCall.id,
                    role: "tool",
                    name: functionName, 
                    content: functionResponse 
                });  // extend conversation with function response
            };
    
            const secondResponse = await openai.chat.completions.create({ model, messages });  // get a new response from GPT where it can see the function response
            return secondResponse.choices[0].message;
        };
    
        return responseMessage

    } catch (error) {
        console.log('error startGptConversarion', error)
        return { content: 'Se produjo un error en la comunicación'}
    }

};



module.exports = {
    startGptConversation,
}