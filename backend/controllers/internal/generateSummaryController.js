const axios = require("axios");
const { getSubtitles } = require("youtube-captions-scraper");

exports.summarize = async (req, res) => {
  const open_ai_auth_token = process.env.OPEN_AI_KEY;
  const videoId = req.body.video_id;
  const llm_model = req.body.llm_model || "gpt-3.5-turbo-0125";
  let summary_word_count = Math.min(req.body.word_limit || 500, 200);
  const additional_instructions = req.body.additional_instructions || "";

  console.log(
    `\nStarting Summary Generation. Model: ${llm_model}, Word Limit: ${summary_word_count}`
  );

  try {
    const transcript_to_send = await getTranscript(videoId);

    const requestBody = {
      model: llm_model,
      messages: [
        {
          role: "system",
          content: constructPrompt(3, summary_word_count),
        },
        {
          role: "user",
          content: transcript_to_send,
        },
      ],
    };

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${open_ai_auth_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "Received response from OpenAI: " + JSON.stringify(response.data)
    );

    const summaryContent = JSON.parse(response.data.choices[0].message.content);
    const usage = response.data.usage;

    const customResponse = {
      summary: summaryContent.summary,
      informal_summary: summaryContent.informal_summary,
      detailed_summary: summaryContent.detailed_summary,
      mcq: summaryContent.mcq,
      usage: usage,
      word_limit: summary_word_count,
      additional_instructions: additional_instructions,
      transcript: transcript_to_send,
    };

    console.log("\nSummary Generation Successful");
    res.status(200).json(customResponse);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
      error_code: "2354r3w4",
      details: error.response?.data || error,
    });
  }
};

async function getTranscript(videoId) {
  console.log("Extracting Subtitles/Transcript for videoId:", videoId);
  try {
    const subtitles = await getSubtitles({ videoID: videoId, lang: "en" });
    const transcript = subtitles
      .map((subtitle) => subtitle.text)
      .join(" ")
      .slice(0, 3000);
    console.log("DONE - Extracting Subtitles: " + transcript.slice(0, 50));
    return transcript;
  } catch (error) {
    console.error("Failed to retrieve subtitles:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}

function constructPrompt(number_of_q, summary_word_limit) {
  const prompt = `
    Only Respond in valid JSON Format.
    Your job is to input in a transcript given by user of a video and give produce 3 summaries - "summary" (short summary), "informal_summary" (in casual language), and a "detailed_summary"
      generate ${number_of_q} multiple-choice questions based on the content. Each question should have four options (A, B, C, D) and a correct answer.

    Example Output:
    "{
      "summary" : "100 word formal summary of the transcript .... ",
      "informal_summary" : "100 word informal summary...",
      "detailed_summary" : "200 word detailed summary ...",
      "title" : "title for summary",

    "mcq" : [
        {
            "question": "What is the capital of France?",
            "options": {
                "A": "Paris"
                // more options
            },
            "answer": "B",
            "explanation" : "justification ..."
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
