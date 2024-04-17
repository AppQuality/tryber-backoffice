interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea = ({ label, name, ...props }: TextAreaProps) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...props} />
    </>
  );
};
export default TextArea;
