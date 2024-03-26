const axios = require("axios");
//const isTokenValid = require('./tokenValidator');
const { getSubtitles } = require("youtube-captions-scraper");

exports.summarize = async (req, res) => {
  const open_ai_auth_token = process.env.OPEN_AI_KEY;
  const videoId = req.body.video_id;

  const llm_model = req.body.llm_model || "gpt-3.5-turbo-0125";
  let summary_word_count = req.body.word_limit || 500;
  const additional_instructions = req.body.additional_instructions || "";

  if (summary_word_count > 200) {
    summary_word_count = 200;
  }

  console.log(
    `\nStarting Generating Summary. Model - ${llm_model}, Word Limit - ${summary_word_count}`
  );

  try {
    console.log("Extracting Subtitles/Transcript");
    subtitles = await getSubtitles({
      videoID: videoId,
      lang: "en",
    });

    let transcript_to_send = subtitles
      .map((subtitle) => subtitle.text)
      .join(" ")
      .slice(0, 3000);

    console.log(
      "DONE  - Extracting Subtitles " + transcript_to_send.slice(0, 50)
    );

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

    const complete_res_body = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${open_ai_auth_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summaryContent = JSON.parse(
      complete_res_body.data.choices[0].message.content
    );
    const usage = complete_res_body.data.usage;

    const customResponse = {
      summary: summaryContent.summary,
      mcq: summaryContent.mcq,
      usage: usage,
      word_limit: summary_word_count,
      additional_instructions: additional_instructions,
      transcript: transcript_to_send,
    };

    console.log(`\nSummary Generation Successful`);

    res.status(200).json(customResponse); // Sending the custom response as JSON
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

function constructPrompt(number_of_q, summary_word_limit) {
  const prompt = `
    Only Respond in valid JSON Format.
    Your job is to input in a transcript given by user of a video and give produce a summary in ${summary_word_limit} 
    using the summary, generate ${number_of_q} multiple-choice questions based on the content. Each question should have four options (A, B, C, D) and a correct answer.

    Example Output:
    "{
      "summary" : " summary of the transcript .... ",
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
