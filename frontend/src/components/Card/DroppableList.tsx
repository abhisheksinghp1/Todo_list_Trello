import {
  useDroppable,
} from "@dnd-kit/core";

type Props = {
  id: number;
  children: React.ReactNode;
};

function DroppableList({
  id,
  children,
}: Props) {

  const {
    setNodeRef,
  } = useDroppable({
    id: id.toString(),
  });

  return (
    <div ref={setNodeRef}>
      {children}
    </div>
  );
}

export default DroppableList;