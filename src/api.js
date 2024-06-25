import axios from "axios";
export const baseURL = "https://gcptest.testexperience.site";
export const getComments = async (id) => {
  try {
    const response = await axios.get(
      `${baseURL}/fetchcommentsByArticle/${id}`
    );
    if (response.status !== 200) {
      throw new Error(`Error fetching comments: ${response.status}`);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const addComment = async (
  comments,
  territoryId,
  knowledgeId 
) => {
  try {
    const url = new URL(`${baseURL}/createComment`);
    url.searchParams.append("territory_id", (territoryId)); // Encode spaces and special characters
    url.searchParams.append("knowledge_id", encodeURIComponent(knowledgeId));
    url.searchParams.append("comments", (comments));

    const response = await axios.post(url.toString());
    console.log(url.toString());


    if (response.status !== 200) {
      throw new Error(`Error adding comment: ${response.status}`);
    }

    // Handle successful comment creation (optional)
    console.log("Comment added successfully!");

    return response.data; // Return response data (if relevant)
  } catch (error) {
    console.error("Error adding comment:", error);
    return null; // Indicate an error (or handle errors differently based on your needs)
  }
};

export const replyComment = async (
  comments,
  territoryId = "New York, NY",
  knowledgeId = "2",
  replyId
) => {
  try {
    const url = new URL(`${baseURL}/replyComment_testing`);
    url.searchParams.append("territory_id", (territoryId));
    url.searchParams.append("knowledge_id", (knowledgeId));
    url.searchParams.append("reply_id", replyId);
    url.searchParams.append("comments", comments);

    const response = await axios.post(url.toString());
    console.log(url.toString());

    if (response.status !== 200) {
      throw new Error(`Error replying to comment: ${response.status}`);
    }

    console.log("Reply added successfully!");
    return response.data;
  } catch (error) {
    console.error("Error replying to comment:", error);
    return null;
  }
};
// export const getComments = async () => {
//   return [
//     {
//       comment_id: 2,
//       knowledge_id: "2",
//       territory_id: "New York, NY",
//       comment: "this is great",
//       visibility: 1,
//       timestamp: "5/23/2024 7:50:49 AM",
//       reply_id: 0,
//       total_comments: 2,
//     },
//     {
//       comment_id: 3,
//       knowledge_id: "2",
//       territory_id: "New York, NY",
//       comment: "this is great",
//       visibility: 1,
//       timestamp: "5/23/2024 7:51:11 AM",
//       reply_id: 0,
//       total_comments: 2,
//     },
//     {
//         comment_id: 4,
//         knowledge_id: "2",
//         territory_id: "New York, NY",
//         comment: "this is great",
//         visibility: 1,
//         timestamp: "5/23/2024 7:51:11 AM",
//         reply_id: 0,
//         total_comments: 2,
//       },
//       {
//         comment_id: 5,
//         knowledge_id: "2",
//         territory_id: "New York, NY",
//         comment: "this is great",
//         visibility: 1,
//         timestamp: "5/23/2024 7:51:11 AM",
//         reply_id: 2,
//         total_comments: 2,
//       },
//       {
//         comment_id: 6,
//         knowledge_id: "2",
//         territory_id: "New York, NY",
//         comment: "this is great",
//         visibility: 1,
//         timestamp: "5/23/2024 7:51:11 AM",
//         reply_id: 5,
//         total_comments: 2,
//       },

//   ];
// };
