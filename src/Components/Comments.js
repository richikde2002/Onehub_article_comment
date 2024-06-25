import React, { useEffect, useState } from "react";
import { getComments, addComment } from "../api";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { BiCommentDetail } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { MdOutlineCommentsDisabled } from "react-icons/md";
import { IoWarning } from "react-icons/io5";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Comments = ({ currentUserId }) => {
  const query = useQuery();
  const url_id = query.get("knowledge_id") ? query.get("knowledge_id") : 1;
  const territory_id = query.get("territory_id")
    ? query.get("territory_id")
    : "Not listed";
  const [backEndComments, setBackEndComments] = useState([]);
  const [activeComments, setActiveComments] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const keys = [1, 2];
  const rootComments = backEndComments?.filter(
    (backEndComments) => backEndComments.reply_id === 0
  );
  const getReplies = (commentId) => {
    return backEndComments.filter(
      (backendComment) => backendComment.reply_id === commentId
    );
  };

  useEffect(() => {
    getComments(url_id).then((data) => {
      setBackEndComments(data);
    });
  }, [url_id, refresh]);

  const addComment_text = (text) => {
    addComment(text, territory_id, url_id).then(() => {
      console.log("Added Succesflly");
      setRefresh((prev) => !prev);
    });
  };
  if(territory_id?.toLowerCase().includes('guest') && !backEndComments){
    return(
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="flex flex-col justify-center items-center mt-auto mb-auto gap-3">
          <MdOutlineCommentsDisabled className="text-5xl"/>
          <p className="text-xl text-center text-gray-600 font-medium">
            No Comments Available
          </p>
        </div>
        <div className="flex-shrink-0 fixed bottom-0 left-0 w-full px-4 pb-2 bg-white z-10 flex flex-row justify-start items-center gap-3 font-google-sans">
          <IoWarning className="text-xl text-red-600"/>
          <p className="text-red-600">You have to be a TSM/ASM to comment</p>
        </div>
      </div>
    )
  }
  if(territory_id?.toLowerCase().includes('guest')){
    return(
      <div className="min-h-screen flex flex-col">
        <div className="flex-shrink-0 fixed top-0 left-0 w-full p-6 bg-white z-10">
          <div className="flex flex-row w-full justify-start items-center text-3xl text-black gap-3 font-google-sans">
            <BiCommentDetail className="text-black" />
            <p>Comments</p>
            <p className="text-2xl">{backEndComments.length}</p>
          </div>
          <div className="h-0.5 w-full bg-gray-200"></div>
        </div>
        <div className="flex-grow overflow-y-auto px-6 pt-24 pb-24">
          {rootComments.map((rootComment) => (
            <Comment
              key={rootComment.comment_id}
              comment={rootComment}
              replies={getReplies(rootComment.comment_id)}
              currentUserId={currentUserId}
              activeComments={activeComments}
              setActiveComments={setActiveComments}
              addComment={addComment_text}
              knowledge_id={url_id}
              setRefresh={setRefresh}
              territory_id={"guest"}
            />
          ))}
        </div>
        <div className="flex-shrink-0 fixed bottom-0 left-0 w-full px-4 pb-2 bg-white z-10 flex flex-row justify-start items-center gap-3 font-google-sans">
          <IoWarning className="text-xl text-red-600"/>
          <p className="text-red-600">You have to be a TSM/ASM to comment</p>
        </div>
      </div>
    )
  }
  if (!backEndComments) {
    return (
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="flex flex-col justify-center items-center mt-auto mb-auto gap-3">
          <MdOutlineCommentsDisabled className="text-5xl"/>
          <p className="text-xl text-center text-gray-600 font-medium">
            No Comments Available
          </p>
        </div>
        <div className="flex-shrink-0 fixed bottom-0 left-0 w-full px-4 pb-2 bg-white z-10">
          <CommentForm handleSubmit={addComment_text} />
        </div>
      </div>
    );
  } 
  
  
  
  else {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-shrink-0 fixed top-0 left-0 w-full p-6 bg-white z-10">
          <div className="flex flex-row w-full justify-start items-center text-3xl text-black gap-3 font-google-sans">
            <BiCommentDetail className="text-black" />
            <p>Comments</p>
            <p className="text-2xl">{backEndComments.length}</p>
          </div>
          <div className="h-0.5 w-full bg-gray-200"></div>
        </div>
        <div className="flex-grow overflow-y-auto px-6 pt-24 pb-24">
          {rootComments.map((rootComment) => (
            <Comment
              key={rootComment.comment_id}
              comment={rootComment}
              replies={getReplies(rootComment.comment_id)}
              currentUserId={currentUserId}
              activeComments={activeComments}
              setActiveComments={setActiveComments}
              addComment={addComment_text}
              knowledge_id={url_id}
              setRefresh={setRefresh}
              territory_id={territory_id}
            />
          ))}
        </div>
        <div className="flex-shrink-0 fixed bottom-0 left-0 w-full px-4 pb-2 bg-white z-10">
          <CommentForm handleSubmit={addComment_text} />
        </div>
      </div>
    );
  }
};

export default Comments;
