import { useState } from "react";
import { useParams } from "react-router-dom";
import { Sign } from "../../../../services/auth/utils";
import SignIn from "../../../components/auth/SignIn";

const SignInPage = () => {
  const {id} = useParams<{id: string}>();
  return (
    <>
      <SignIn id={id}/>
    </>
  );
};

export default SignInPage;
