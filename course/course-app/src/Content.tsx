import type React from "react";
interface Content {
  name: string;
  exerciseCount: number;
}
const Content = ({
  courseParts,
}: {
  courseParts: Content[];
}): React.JSX.Element => {
  return (
    <>
      {courseParts.map((item, index) => (
        <p key={index}>
          {" "}
          {item.name} {item.exerciseCount}{" "}
        </p>
      ))}
    </>
  );
};

export default Content;
