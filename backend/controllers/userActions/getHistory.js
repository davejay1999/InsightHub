const pool = require("../../config/db");
const axios = require("axios");

exports.getHistory = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "user_id is required" });
  }

  try {
    const query = `
    SELECT 
      ur.*, 
      s.* 
    FROM 
      userRequests ur 
    LEFT JOIN 
      summaries s ON ur.videoId = s.video_id 
    WHERE 
      ur.userId = ?;
  `;

    const [rows] = await pool.query(query, [user_id]);

    const modifiedRows = rows.map((row) => {
      return {
        ...row,
        mcq: row.q_and_a,
        // Remove the original q_and_a field
        q_and_a: undefined,
      };
    });

    if (!modifiedRows.length) {
      return res
        .status(404)
        .json({ error: "No records found for the provided user_id" });
    }

    res.status(200).json(modifiedRows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the records" });
  }
};
