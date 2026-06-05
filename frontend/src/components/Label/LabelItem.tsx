type Props = {
  name: string;
  color: string;
};

function LabelItem({
  name,
  color,
}: Props) {

  return (
    <span
      style={{
        background: color,
        color: "white",
        padding: "4px 10px",
        borderRadius: "12px",
        marginRight: "8px",
      }}
    >
      {name}
    </span>
  );
}

export default LabelItem;