import React, { FC, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../services/mutations/add-comment";
import Button from "./Button";

interface FormCommentProps {
  personId: number;
  onCommentAdded: () => void;
}

const FormComment: FC<FormCommentProps> = ({ personId, onCommentAdded }) => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [addComment, { loading, error }] = useMutation(ADD_COMMENT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addComment({
        variables: { personId, text },
      });
      setText("");
      setMessage("Comment added successfully!");
      onCommentAdded();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div className="pt-7 w-full">
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your comment here"
            required
            className="w-full h-20 border border-secondaryGrey pl-2 rounded-md focus:border-primaryGrey focus:outline-none"
          />
        </div>
        <div className="flex justify-end items-center ">
          <Button disabled={loading} className="flex-none">
            {loading ? "Adding Comment..." : "Add Comment"}
          </Button>
        </div>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && (
        <p style={{ color: "red" }}>Error adding comment: {error.message}</p>
      )}
    </div>
  );
};

export default FormComment;
