import { type CoursePart } from "./types.tsx";
const Part = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    );
  };
  const renderParts = () =>
    courseParts.map((part, index) => {
      switch (part.kind) {
        case "basic":
          return (
            <div key={index} className="part-container">
              <p className="first-paragraph">
                {part.name}
                {part.exerciseCount}
              </p>
              <p className="second-paragraph">{part.description}</p>
            </div>
          );
        case "group":
          return (
            <div key={index} className="part-container">
              <p className="first-paragraph">
                {part.name} {part.exerciseCount}
              </p>
              <p>project exercises {part.groupProjectCount}</p>
            </div>
          );
          break;
        case "background":
          return (
            <div key={index} className="part-container">
              <p className="first-paragraph">
                {part.name} {part.exerciseCount}
              </p>
              <p>{part.description}</p>
              <p className="third-paragraph">{part.backgroundMaterial}</p>
            </div>
          );
        case "special":
          return (
            <div>
              <p className="first-paragraph">
                {part.name} {part.exerciseCount}
              </p>
              <p>{part.description}</p>
              <p className="third-paragraph">
                required skills: {part.requirements.join(", ")}
              </p>
            </div>
          );
        default:
          return assertNever(part);
      }
    });
  return <>{renderParts()}</>;
};

export default Part;
