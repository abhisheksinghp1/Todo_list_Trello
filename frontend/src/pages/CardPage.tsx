import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getCard,
} from "../api/card";

import {
  getComments,
  createComment,
  deleteComment,
} from "../api/comment";

import CommentItem from "../components/Comment/CommentItem";
import CreateComment from "../components/Comment/CreateComment";

function CardPage() {

  const { id } = useParams();

  const [card, setCard] =
    useState<any>(null);

  const [comments, setComments] =
    useState<any[]>([]);

  const loadCard = async () => {

    try {

      const data =
        await getCard(
          Number(id)
        );

      setCard(data);

    } catch (error) {

      console.error(
        "Error loading card:",
        error
      );
    }
  };

  const loadComments =
    async () => {

      try {

        const data =
          await getComments(
            Number(id)
          );

        setComments(data);

      } catch (error) {

        console.error(
          "Error loading comments:",
          error
        );
      }
    };

  useEffect(() => {

    loadCard();

    loadComments();

  }, [id]);

  const handleCreateComment =
    async (
      message: string
    ) => {

      try {

        await createComment(
          Number(id),
          message
        );

        loadComments();

      } catch (error) {

        console.error(
          "Error creating comment:",
          error
        );
      }
    };

  const handleDeleteComment =
    async (
      commentId: number
    ) => {

      try {

        await deleteComment(
          commentId
        );

        loadComments();

      } catch (error) {

        console.error(
          "Error deleting comment:",
          error
        );
      }
    };

  if (!card) {

    return (
      <h2>
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
      }}
    >

      <h1>
        {card.title}
      </h1>

      <h3>
        Description
      </h3>

      <p>
        {card.description ||
          "No Description"}
      </p>

      <h3>
        Due Date
      </h3>

      <p>
        {card.due_date ||
          "No Due Date"}
      </p>

      <hr />

      <h2>
        Comments
      </h2>

      <CreateComment
        onCreate={
          handleCreateComment
        }
      />

      <div
        style={{
          marginTop: "20px",
        }}
      >

        {comments.length === 0 ? (

          <p>
            No Comments
          </p>

        ) : (

          comments.map(
            (comment) => (

              <CommentItem
                key={comment.id}
                message={
                  comment.message
                }
                onDelete={() =>
                  handleDeleteComment(
                    comment.id
                  )
                }
              />

            )
          )

        )}

      </div>

    </div>
  );
}

export default CardPage;