const VisibilityIcon = ({
  visibility,
}: {
  visibility: "public" | "smallgroup" | "logged" | "admin";
}) => {
  if (visibility === "public") return <>P</>;
  if (visibility === "smallgroup") return <>SM</>;
  if (visibility === "logged") return <>L</>;
  if (visibility === "admin") return <>A</>;
  return null;
};

export default VisibilityIcon;
