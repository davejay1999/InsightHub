const axios = require("axios");

function constructPrompt(summary, number_of_q) {
  const prompt = `
    Only Respond in JSON Format. 
    Given the summary: "${summary}", generate ${number_of_q} multiple-choice questions based on the content. Each question should have four options (A, B, C, D) and a correct answer. Format the output as JSON.

    Example:
    [
        {
            "question": "What is the capital of France?",
            "options": {
                "A": "Paris",
                "B": "London",
                "C": "Berlin",
                "D": "Madrid"
            },
            "answer": "A"
        }
        // more questions
    ]
    `;
  return prompt;
}

exports.getMcq = async (req, res) => {
  console.log("\n\n Inside Mcq \n\n");

  const open_ai_auth_token = process.env.OPEN_AI_KEY;
  const summary = req.body.summary;
  const llm_model = req.body.llm_model || "gpt-3.5-turbo-0125";
  let number_of_questions = req.body.number_of_questions || 2;

  if (!summary) {
    return res.status(400).json({ error: "No Summary Provided" });
  }

  if (number_of_questions > 5) {
    number_of_questions = 5;
  }

  console.log(`Using Model - ${llm_model}`);

  try {
    const requestBody = {
      model: llm_model,
      messages: [
        {
          role: "system",
          content: constructPrompt(summary, number_of_questions),
        },
        {
          role: "user",
          content: summary,
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

    const summaryContent = response.data.choices[0].message.content;
    const usage = response.data.usage;

    console.log(`\n\n Custom response - ${summaryContent}`);
    res.status(200).json({ questions: summaryContent, usage: usage }); // Sending the custom response as JSON
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
