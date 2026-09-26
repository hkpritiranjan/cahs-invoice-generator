type NatureOfBusinessProps = {
  text: string;
};

export function NatureOfBusiness({ text }: NatureOfBusinessProps) {
  if (!text.trim()) return null;

  return (
    <div style={{ breakInside: "avoid" }}>
      <p className="mb-1 font-bold">Nature of Business</p>
      <p className="whitespace-pre-line">{text}</p>
    </div>
  );
}
