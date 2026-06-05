import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getCard,
  updateCard,
} from "../api/card";

import {
  getComments,
  createComment,
  deleteComment,
} from "../api/comment";

import {
  getLabels,
  createLabel,
} from "../api/label";
import {
  getMembers,
  createMember,
  deleteMember,
} from "../api/member";

import LabelItem from "../components/Label/LabelItem";

import CommentItem from "../components/Comment/CommentItem";
import CreateComment from "../components/Comment/CreateComment";

import {
  getChecklists,
  createChecklist,
  toggleChecklist,
  deleteChecklist,
} from "../api/checklist";

import {
  getActivities,
  createActivity,
} from "../api/activity";

import {
  getAttachments,
  createAttachment,
  deleteAttachment,
} from "../api/attachment";

import ChecklistItem from "../components/Checklist/ChecklistItem";
import AttachmentItem from "../components/Attachment/AttachmentItem";

function CardPage() {

  const { id } = useParams();

  const [card, setCard] =
    useState<any>(null);

  const [comments, setComments] =
    useState<any[]>([]);
    const [labels, setLabels] =
  useState<any[]>([]);

  const [activities, setActivities] =
    useState<any[]>([]);

  const [attachments, setAttachments] =
    useState<any[]>([]);

  const [fileName, setFileName] =
    useState("");

  const [filePath, setFilePath] =
    useState("");

  const [members, setMembers] =
  useState<any[]>([]);

const [userId, setUserId] =
  useState("");



const [labelName, setLabelName] =
  useState("");

const [labelColor, setLabelColor] =
  useState("#0079bf");

  const [checklists, setChecklists] =
  useState<any[]>([]);

const [checklistTitle, setChecklistTitle] =
  useState("");


  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const loadCard = async () => {

    try {

      const data =
        await getCard(
          Number(id)
        );

      setCard(data);

      setTitle(
        data.title || ""
      );

      setDescription(
        data.description || ""
      );

      setDueDate(
        data.due_date
          ? data.due_date.substring(0, 10)
          : ""
      );

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

      console.error(error);
    }
  };

const loadLabels =
  async () => {

    try {

      const data =
        await getLabels(
          Number(id)
        );

      setLabels(data);

    } catch (error) {

      console.error(error);
    }
  };

  const loadChecklists =
  async () => {

    try {

      const data =
        await getChecklists(
          Number(id)
        );

      setChecklists(data);

    } catch (error) {

      console.error(error);
    }
  };

  const loadActivities =
    async () => {

      try {

        const data =
          await getActivities(
            Number(id)
          );

        setActivities(data);

      } catch (error) {

        console.error(error);
      }
    };

  const loadAttachments =
    async () => {

      try {

        const data =
          await getAttachments(
            Number(id)
          );

        setAttachments(data);

      } catch (error) {

        console.error(error);
      }
    };

useEffect(() => {

  console.log("CardPage Loaded");
  console.log("ID:", id);

  loadCard();
  loadComments();
  loadLabels();
  loadChecklists();
  loadActivities();
  loadAttachments();

}, [id]);

  const handleSave =
    async () => {

      try {

        await updateCard(
          Number(id),
          title,
          description,
          dueDate
        );

        alert(
          "Card Updated"
        );

        loadCard();

        await addActivity(
          "Updated card"
        );

      } catch (error) {

        console.error(error);
      }
    };

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

      await addActivity(
        "Added a comment"
      );
    } catch (error) {
      console.error(error);
    }
  };

const handleCreateChecklist =
  async () => {

    if (
      !checklistTitle.trim()
    ) return;

    try {

      await createChecklist(
        checklistTitle,
        Number(id)
      );

      setChecklistTitle("");

      loadChecklists();

      await addActivity(
        `Added checklist ${checklistTitle}`
      );

    } catch (error) {

      console.error(error);
    }
  };

const handleCreateAttachment =
  async () => {

    if (
      !fileName ||
      !filePath
    ) return;

    try {

      await createAttachment(
        fileName,
        filePath,
        Number(id)
      );

      setFileName("");
      setFilePath("");

      loadAttachments();

    } catch (error) {

      console.error(error);
    }
  };

const handleDeleteAttachment =
  async (
    attachmentId: number
  ) => {

    try {

      await deleteAttachment(
        attachmentId
      );

      loadAttachments();

    } catch (error) {

      console.error(error);
    }
  };

const handleToggleChecklist =
  async (
    item: any
  ) => {

    try {

      await toggleChecklist(
        item.id,
        !item.completed
      );

      loadChecklists();

    } catch (error) {

      console.error(error);
    }
  };

const handleDeleteChecklist =
  async (
    checklistId: number
  ) => {

    try {

      await deleteChecklist(
        checklistId
      );

      loadChecklists();

    } catch (error) {

      console.error(error);
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
      console.error(error);
    }
  };

const handleCreateLabel =
  async () => {

    if (!labelName.trim()) {
      return;
    }

    try {

      await createLabel(
        labelName,
        labelColor,
        Number(id)
      );

      setLabelName("");

      loadLabels();

      await addActivity(
        `Added label ${labelName}`
      );

    } catch (error) {

      console.error(error);
    }
  };

  const loadMembers =
  async () => {

    try {

      const data =
        await getMembers(
          Number(id)
        );

      setMembers(data);

    } catch (error) {

      console.error(error);
    }
  };

  const handleAddMember =
  async () => {

    if (!userId)
      return;

    try {

      await createMember(
        Number(userId),
        Number(id)
      );

      setUserId("");

      loadMembers();

    } catch (error) {

      console.error(error);
    }
  };

const handleDeleteMember =
  async (
    memberId: number
  ) => {

    try {

      await deleteMember(
        memberId
      );

      loadMembers();

    } catch (error) {

      console.error(error);
    }
  };

  const addActivity =
    async (
      message: string
    ) => {

      try {

        await createActivity(
          Number(id),
          message
        );

        loadActivities();

      } catch (error) {

        console.error(error);
      }
    };

 if (!card) {

  return (
    <div>
      <h2>Loading Card...</h2>
      <p>Card ID: {id}</p>
    </div>
  );
}

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
      }}
    >

      <input
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "24px",
          marginBottom: "20px",
        }}
      />

      <h3>
        Description
      </h3>

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        rows={5}
        style={{
          width: "100%",
        }}
      />

      <h3>
        Due Date
      </h3>

      <input
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(
            e.target.value
          )
        }
      />

      <br />

 <button
  onClick={handleSave}
  style={{
    marginTop: "20px",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    background: "#0079bf",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  Save Changes
</button>

      <hr />

<h2>
  Labels
</h2>

<div
  style={{
    marginBottom: "15px",
  }}
>

  {labels.map(
    (label) => (

      <LabelItem
        key={label.id}
        name={label.name}
        color={label.color}
      />

    )
  )}

</div>

<div
  style={{
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "20px",
  }}
>

  <input
    placeholder="Label Name"
    value={labelName}
    onChange={(e) =>
      setLabelName(
        e.target.value
      )
    }
  />

  <input
    type="color"
    value={labelColor}
    onChange={(e) =>
      setLabelColor(
        e.target.value
      )
    }
  />

  <button
    onClick={
      handleCreateLabel
    }
  >
    Add Label
  </button>

</div>
      <hr />

<h2>
  Checklist
</h2>

<div>

  {checklists.map(
    (item) => (

      <ChecklistItem
        key={item.id}
        title={item.title}
        completed={item.completed}
        onToggle={() =>
          handleToggleChecklist(
            item
          )
        }
        onDelete={() =>
          handleDeleteChecklist(
            item.id
          )
        }
      />

    )
  )}

</div>

<input
  placeholder="Checklist Item"
  value={checklistTitle}
  onChange={(e) =>
    setChecklistTitle(
      e.target.value
    )
  }
/>

<button
  onClick={
    handleCreateChecklist
  }
>
  Add Task
</button>

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



        {comments.map(
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
        )}

      </div>

      <hr />

      <h2>
        Attachments
      </h2>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        {attachments.map(
          (attachment) => (
            <AttachmentItem
              key={attachment.id}
              filename={attachment.filename}
              filepath={attachment.filepath}
              onDelete={() =>
                handleDeleteAttachment(
                  attachment.id
                )
              }
            />
          )
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "15px",
          marginBottom: "30px",
        }}
      >
        <input
          placeholder="File Name"
          value={fileName}
          onChange={(e) =>
            setFileName(
              e.target.value
            )
          }
        />

        <input
          placeholder="File Path"
          value={filePath}
          onChange={(e) =>
            setFilePath(
              e.target.value
            )
          }
        />

        <button
          onClick={
            handleCreateAttachment
          }
        >
          Add Attachment
        </button>
      </div>

      <hr />

      <h2>
        Activity
      </h2>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        {activities.map(
          (activity) => (
            <div
              key={activity.id}
              style={{
                marginBottom: "15px",
                padding: "10px",
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  margin: "0 0 5px 0",
                }}
              >
                {activity.message}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#666",
                  margin: "0",
                }}
              >
                {new Date(
                  activity.created_at
                ).toLocaleString()}
              </p>
            </div>
          )
        )}
      </div>

<hr />

<h2>
  Members
</h2>

{members.map(
  (member) => (

    <div
      key={member.id}
      style={{
        marginBottom: "8px",
      }}
    >
      User ID:
      {member.user_id}

      <button
        onClick={() =>
          handleDeleteMember(
            member.id
          )
        }
      >
        Remove
      </button>

    </div>

  )
)}

<input
  placeholder="User ID"
  value={userId}
  onChange={(e) =>
    setUserId(
      e.target.value
    )
  }
/>

<button
  onClick={
    handleAddMember
  }
>
  Add Member
</button>    </div>



  );
  
}

export default CardPage;