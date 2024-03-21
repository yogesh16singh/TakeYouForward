import express from "express";
import Data from "./db/model.db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allData = await Data.findAll();

    if (!allData) {
      return res.status(400).json({ message: "No data found" });
    }
    return res.status(200).json({ allData });
  } catch (error) {
    console.log("Error while fetching data", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, preferredLanguage, sourceCode, stdin } = req.body;

    if (!username || !preferredLanguage || !sourceCode) {
      res.status(400).json({ message: "please fill all the details" });
    }

    const newData = await Data.create({
      username: username,
      preferredLanguage: preferredLanguage,
      sourceCode: sourceCode,
      stdin: stdin
    });

    if (!newData) {
      return res.status(400).json({ message: "data not created" });
    }
    return res
      .status(201)
      .json({ message: "data created successfully", newData });
  } catch (error) {
    console.log("Error while submiting", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
