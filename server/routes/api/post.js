import express from "express";
import Post from "../../models/post";

const router = express.Router();

router.get("/", async (res, req) => {
  const postFindResult = await Post.find();
  console.log(postFindResult, "All Post Get");
  res.json(postFindResult); // 클라이언트에게 이것을 반환한다.
});

router.post("/", async (req, res) => {
  try {
    console.log(req, "req");
    const { title, contents, fileUrl, creator } = req.body;
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      creator,
    });
    res.json(newPost);
  } catch (e) {
    console.log(e);
    console.log("Post Upload Error");
  }
});
