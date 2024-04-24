const axios = require("axios");
const { getSubtitles } = require("youtube-captions-scraper");

exports.summarize_yt = async (req, res) => {
  const openAiAuthToken = process.env.OPEN_AI_KEY;
  const videoId = req.body.video_id;
  const llmModel = req.body.llm_model || "gpt-3.5-turbo-0125";
  const summaryWordCount = req.body.summary_word_count;

  console.log(
    `\nStarting Summary Generation. Model: ${llmModel}, Word Limit: ${summaryWordCount}`
  );

  try {
    const completeTranscript = await getTranscript(videoId);
    const transcriptToSend = completeTranscript.slice(0, 5000);

    const apiResponse = await genSummaryOpenAI(
      openAiAuthToken,
      llmModel,
      transcriptToSend
    );

    if (!apiResponse.success) {
      throw new Error(apiResponse.error.message);
    }

    const summaryContent = JSON.parse(
      apiResponse.data.choices[0].message.content
    );

    const customResponse = {
      title: summaryContent.title,
      summary: summaryContent.summary,
      informal_summary: summaryContent.informal_summary,
      detailed_summary: summaryContent.detailed_summary,
      mcq: summaryContent.mcq,
      usage: apiResponse.data.usage,
      transcript: completeTranscript,
    };

    console.log("\nSummary Generation Successful");
    res.status(200).json(customResponse);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
      error_code: "235434",
      details: error.response ? error.response.data : error,
    });
  }
};

async function genSummaryOpenAI(openAiAuthToken, llmModel, transcript) {
  const requestBody = {
    model: llmModel,
    messages: [
      {
        role: "system",
        content: constructPrompt(),
      },
      {
        role: "user",
        content: transcript,
      },
    ],
  };

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${openAiAuthToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Received response from OpenAI: ");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("API Call Failed: ", error);
    return { success: false, error: error, error_code: "452365" };
  }
}

async function getTranscript(videoId) {
  console.log("Extracting Subtitles/Transcript for videoId:", videoId);
  try {
    const subtitles = await getSubtitles({ videoID: videoId, lang: "en" });
    const transcript = subtitles.map((sub) => sub.text).join(" ");
    console.log("DONE - Extracting Subtitles: " + transcript.slice(0, 50));
    return transcript;
  } catch (error) {
    console.error("Failed to retrieve subtitles:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}

function constructPrompt() {
  const prompt = `
    Only Respond in valid JSON Format.
    Your job is to input in a transcript given by user of a video and give produce 3 summaries - "summary" (short summary), "informal_summary" (in casual language), and a "detailed_summary"
      generate 3 multiple-choice questions based on the content. Each question should have four options (A, B, C, D) and a correct answer.

    Example Output:
    "{
      "summary" : "100 word formal summary of the transcript .... ",
      "informal_summary" : "50 word casual summary...",
      "detailed_summary" : "200 and detailed summary and analysis ...",
      "title" : "title for summary",

    "mcq" : [
        {
            "question": "What is the capital of France?",
            "options": {
                "A": "Paris"
                // more options
            },
            "answer": "B",
            "explanation" : "short justification ..."
        },
        {
            // next question
        }
        // more questions
    ]
  }"
    `;
  return prompt;
}
