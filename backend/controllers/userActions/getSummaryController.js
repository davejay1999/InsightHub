const axios = require("axios");
const pool = require("../../config/db");

exports.getSummary = async (req, res) => {
  console.log("\n\nInside Get Summary from User \n\n");

  const userId = req.body.user_id;
  if (!userId) {
    return res
      .status(400)
      .json({ message: "No User Id is Provided", json_data: req.body });
  }

  let videoId = req.body.video_id;
  if (!videoId) {
    return res.status(400).json({
      message: "No Video Id is Provided",
      json_data: req.body,
      error_code: "4362",
    });
  }

  videoId = extractYouTubeID(videoId);

  try {
    const addVideoToDbUrl = "http://localhost:3000/internal/addVideoToDb";
    const addVideoToDbResponse = await axios.post(addVideoToDbUrl, {
      ...req.body,
      video_id: videoId,
    });

    const cacheHitInt = addVideoToDbResponse.data.cache_hit ? 1 : 0;

    const [result] = await pool.query(
      "INSERT INTO userRequests (videoId, userId, total_tokens, completion_tokens, prompt_tokens, score, totalScore, cache_hit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        videoId,
        userId,
        addVideoToDbResponse.data.token_used.total_tokens,
        addVideoToDbResponse.data.token_used.completion_tokens,
        addVideoToDbResponse.data.token_used.prompt_tokens,
        null,
        null,
        cacheHitInt,
      ]
    );

    const insertedId = result.insertId;

    res.status(200).json({
      mcq_id: insertedId,
      user_id: userId,
      ...addVideoToDbResponse.data,
    });
    console.log(
      "\n\nSummary send successfully. Total Tokens Used - ",
      JSON.stringify(addVideoToDbResponse.data.token_used.total_tokens)
    );
  } catch (error) {
    console.error("Error in addVideoToDb request:", error);
    const errorData = error.response ? error.response.data : {};
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
      error_code: "576435",
      ...errorData,
    });
  }
};

function extractYouTubeID(input) {
  try {
    console.log("Input:", input);
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
      console.log("Valid YouTube ID:", input);
      return input;
    }
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = input.match(regExp);
    const result = match && match[2].length === 11 ? match[2] : null;
    console.log("Extracted YouTube ID:", result);
    return result;
  } catch {
    console.error("Error extracting YouTube ID");
    return null;
  }
}
