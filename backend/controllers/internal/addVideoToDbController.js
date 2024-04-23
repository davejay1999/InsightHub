const axios = require("axios");
const pool = require("../../config/db");

exports.videoCacheHandler = async (req, res) => {
  const { video_id: videoId } = req.body;
  console.log("video id ===" + videoId);
  try {
    // Query database for existing video
    const [existingVideo] = await pool.query(
      "SELECT * FROM summaries WHERE video_id = ?",
      [videoId]
    );
    const cacheHit = existingVideo.length > 0;
    let responseData = { videoId };

    console.log(`Cache hit status - ${cacheHit}`);

    if (cacheHit) {
      // Handling cache hit scenario
      responseData = {
        ...responseData,
        ...existingVideo[0],
        token_used: {
          total_tokens: 0,
          completion_tokens: 0,
          prompt_tokens: 0,
        },
      };
    } else {
      // Handling cache miss scenario
      const internalSummaryUrl = "http://localhost:3000/internal/summarize";
      try {
        const internalSummaryResponse = await axios.post(
          internalSummaryUrl,
          req.body
        );
        const {
          summary,
          informal_summary,
          detailed_summary,
          transcript,
          mcq,
          title,
          usage,
        } = internalSummaryResponse.data;

        await pool.query(
          "INSERT INTO summaries (video_id, transcript, summary, q_and_a, informal_summary, detailed_summary, title) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            videoId,
            transcript,
            summary,
            JSON.stringify(mcq),
            informal_summary,
            detailed_summary,
            title,
          ]
        );

        responseData = {
          ...responseData,
          transcript,
          summary,
          informal_summary,
          detailed_summary,
          mcq,
          title,
          token_used: usage,
        };
      } catch (error) {
        console.error("Error fetching summary:", error);
        return res.status(500).json({
          error: "Internal Server Error while fetching summary",
          message: error.message,
          details: error.response ? error.response.data : {},
          error_code: "54329",
        });
      }
    }

    res.status(200).json({
      cache_hit: cacheHit,
      ...responseData,
    });
  } catch (error) {
    console.error("Error in videoCacheHandler:", error);
    res.status(500).json({
      error: "Internal Server Error in video cache handler",
      message: error.message,
      error_code: "46432",
    });
  }
};
