import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaLocationArrow } from "react-icons/fa6";
import {motion} from "framer-motion"

const ReplyForm = ({knowledgeId,replyId, handleSubmit }) => {
  const [text, setText] = useState("");
  const isTextAreaDisabled = text.length===0
  const submitForm = ()=>{
    if(text===""){
      return
    }
    handleSubmit(knowledgeId,replyId,text)
    setText("")
  }
  return (
    <div className="flex w-[95%] flex-row p-3 gap-3 justify-center items-center bg-white">
      <CgProfile className="text-4xl" />
      <input
        className="w-[100%] bg-gray-200 border-2 border-black rounded-full p-3 px-10"
        value={text}
        onKeyDown={(e)=>{if(e.key==="Enter"){
          submitForm()
        }}}
        onChange={(e) => setText(e.target.value)}
        placeholder="Reply .."
      ></input>
      <motion.button className="bg-blue-700 p-2 rounded-full" disabled={isTextAreaDisabled} onClick={submitForm}>
        <FaLocationArrow className="text-xl text-white" />
      </motion.button>
    </div>
  );
};

export default ReplyForm;
