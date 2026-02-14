import { OpenAiclient } from "../utils/axioClient";


/* 
* generateAIText
* method to generate OPENAI chat compeletion based response
* based on user input
*/
export const generateAIText = async (prompt: string) => {
    const response = await OpenAiclient.post("/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return response.data.choices[0].message.content;
};
