import { useParams } from "react-router-dom";
import SignUp from "../../../components/auth/SignUp";

const SignUpPage = () => {
  const {id} = useParams<{id: string}>();
  return (
    <>
      <SignUp id={id}/>
    </>
  );
};

export default SignUpPage;
