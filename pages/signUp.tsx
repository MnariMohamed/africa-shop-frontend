import type { NextPage } from "next";
import { useDispatch } from "react-redux";
import { userInfoActions } from "../store/user-slice";
import jsCookie from "js-cookie";
import EnteringBox from "../components/entering/EnteringBox";
import { IUser } from "../lib/types/user";
import axios from "axios";
import { getError } from "../utilities/error";
import { useRouter } from "next/router";
import { useState } from "react";
import { Ip_port } from "@/constants";
import { AppDispatch } from "@/store";

const SignUp: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [errorMessage, setErrorMessage] = useState("");
  const AUTH_URL = `${Ip_port.Adresse}/api/v1/auth/`;

  const signUpHandler = async (user: IUser) => {
    const { email, password, firstName, lastName } = user;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${AUTH_URL}email/register`,
        {
          firstName,
          lastName,
          email,
          password,
        },
        config
      );

      const data = response.data;
      console.log("userRes", response);

      if (data && response.status === 201) {
        const user = {
          lastName: data.user.lastName,
          firstName: data.user.firstName,
          email: email,
        };

        dispatch(userInfoActions.userSignup(user));
        jsCookie.set("userInfo", JSON.stringify(user));

        router.push("/login");
      }
    } catch (err: any) {
      setErrorMessage(getError(err));
    }
  };

  return (
    <EnteringBox
      title="signUp"
      submitHandler={signUpHandler}
      errorMessage={errorMessage}
    />
  );
};

export default SignUp;
