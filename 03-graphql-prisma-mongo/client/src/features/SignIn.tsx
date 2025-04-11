import React, { ChangeEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutation/SignIn";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [mutationSignIn, { loading, error }] = useMutation(SIGN_IN);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignIn = async () => {
    await mutationSignIn({
      variables: {
        data: {
          email: formData.email,
          password: formData.password,
        },
      },
    })
      .then((response) => {
        localStorage.setItem("token", response.data.signIn.token);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <React.Fragment>
      <div className="hero bg-base-200 min-h-screen">
        <div className="justify-center w-80 shadow-md p-5">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              <span className="font-bold">Email Address:</span>{" "}
            </legend>
            <input
              name="email"
              type="text"
              className="input"
              placeholder="Type here"
              onChange={handleInputChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              <span className="font-bold">Password:</span>{" "}
            </legend>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Type here"
              onChange={handleInputChange}
            />
          </fieldset>
          <button
            className="btn btn-success mt-2 float-end"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
