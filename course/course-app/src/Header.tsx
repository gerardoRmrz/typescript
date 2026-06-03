interface CourseName {
  courseName: string;
}

const Header = (props: CourseName): React.JSX.Element => {
  return <h1>{props.courseName}</h1>;
};

export default Header;
