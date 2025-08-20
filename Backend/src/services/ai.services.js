const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function genrateCaption(base64File) {
    const contents = [
        {
            inlineData: {
                mimeType: "image/webp",
                data: base64File,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: `You are an expert Instagram caption writer.  
Write aesthetic, professional captions for any type of image.  
- Length: 2–3 lines (not shorter than 2 full lines).  
- Style: elegant, modern, Instagram-friendly.  
- Use rich but simple words, avoid slang.  
- 1–2 relevant emojis can be added naturally.  
- The caption should feel complete, inspiring, and visually appealing. ` 


        }
    });
    return response.text;
}

module.exports = genrateCaption;