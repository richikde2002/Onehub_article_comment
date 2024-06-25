import React, { useState } from "react";
import Avatar from "react-avatar";
import { PiArrowBendDownRightLight } from "react-icons/pi";
import ReplyForm from "./ReplyForm";
import { replyComment } from "../api";
const Comment = ({
  comment,
  replies,
  currentUserId,
  activeComments,
  setActiveComments,
  parentId = 0,
  knowledge_id,
  setRefresh,
  territory_id,
}) => {
  // id -> comment_id
  // parnet_id->reply_id
  // user_id -> knowledge_id
  // username -> territory_id
  // createdAt -> timestamp
  const valid = Boolean(currentUserId);
  const canReply = comment.reply_id === 0 && territory_id !== "guest";
  const isReplying = activeComments && activeComments.id === comment.comment_id;

  const addReply = (knowledgeId, replyId, text) => {
    console.log(replyId, text);
    replyComment(text, territory_id, knowledgeId, replyId).then(() => {
      console.log("Replied");
      setRefresh((prev) => !prev);
      setActiveComments(null);
    });
  };
  const [count, setCount] = useState(0);
  const handleReply = (id_comment) => {
    setCount(count + 1);
    console.log(count);
    if (count % 2 !== 0) {
      setActiveComments(null);
    } else {
      setActiveComments({
        id: id_comment,
      });
    }
  };
  const replyId = parentId ? parentId : comment.comment_id;
  const knowledgeId = knowledge_id;

  const calculateDaysFromNow = (timestamp) => {
    const currentDate = new Date();
    const commentDate = new Date(timestamp);
    const timeDifference = currentDate - commentDate; // time difference in milliseconds
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // convert to days
    return daysDifference;
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row gap-4 justify-items-center p-2 text-black font-google-sans">
        <Avatar
          className="rounded-t-xl object-cover aspect-square w-full h-10"
          name={comment.territory_id}
          size="40"
          round={true}
          style={{ backgroundColor: "#333" }}
        />
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4">
            <p className="w-fit">{comment.territory_id}</p>
            <div className="flex flex-row gap-1 text-gray-800 text-sm">
              <span className="hidden sm:inline">
                {calculateDaysFromNow(comment.timestamp)} days ago
              </span>
              <span className="sm:hidden">
                {calculateDaysFromNow(comment.timestamp)} d
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className="text-gray-800">{comment.comment}</p>
          </div>
          <div className="flex justify-start items-center flex-row gap-2 text-gray-800 text-sm">
            {valid && canReply && <PiArrowBendDownRightLight />}
            {valid && canReply && (
              <div
                className="cursor-pointer"
                onClick={() => handleReply(comment.comment_id)}
              >
                Reply
              </div>
            )}
          </div>
        </div>
      </div>
      {isReplying && (
        <div className="flex-shrink-0 fixed bottom-0 left-0 w-full px-4 pb-2 bg-white z-20">
          <ReplyForm
            knowledgeId={knowledgeId}
            replyId={replyId}
            handleSubmit={addReply}
          />
        </div>
      )}
      {replies.length > 0 && (
        <div className="mx-16">
          {replies.map((reply) => (
            <Comment
              comment={reply}
              key={reply.comment_id}
              replies={[]}
              currentUserId={currentUserId}
              activeComments={activeComments}
              setActiveComments={setActiveComments}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
