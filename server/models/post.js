import mongoose from "mongoose";
import moment from "moment";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true, // 추후에 검색기능 향상을 위해
  },
  contents: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: -2, // 처음 작성한 사람의 조회수를 빼기 위해 -2
  },
  fileUrl: {
    type: String,
    default: "http://source.unsplash.com/random/301x201", // 그림 파일의 주소 값의 기본값
  },
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD hh:mm:ss"),
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category", // 1개의 post는 1개의 카테고리를 갖기 때문에, ref는 관계형 데이터를 의미함
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});
// 스키마 : 데이터베이스의 구조
const Post = mongoose.model("post", PostSchema);

export default Post;
