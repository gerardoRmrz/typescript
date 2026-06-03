import type React from "react";
import Part from "./Part.tsx";
import { type CoursePart } from "./types.tsx";

const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): React.JSX.Element => {
  return (
    <>
      <Part courseParts={courseParts} />
    </>
  );
};

export default Content;
