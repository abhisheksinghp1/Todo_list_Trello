import {
  useDraggable,
} from "@dnd-kit/core";

import CardItem from "./CardItem";

type Props = {
  id: number;
  title: string;
  onDelete: () => void;
};

function DraggableCard({
  id,
  title,
  onDelete,
}: Props) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: id.toString(),
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <CardItem
        id={id}
        title={title}
        onDelete={onDelete}
      />
    </div>
  );
}

export default DraggableCard;