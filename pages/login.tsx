import axios, { AxiosResponse } from "axios";
import type { NextPage } from "next";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";
import EnteringBox from "../components/entering/EnteringBox";
import { IUser, IUserInfoRootState } from "../lib/types/user";
import { userInfoActions } from "../store/user-slice";
import { getError } from "../utilities/error";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Ip_port } from "@/constants";
const Login: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const AUTH_URL = `${Ip_port.Adresse}/api/v1/auth/`;

  const userInfo = useSelector((state: IUserInfoRootState) => {
    return state.userInfo.user;
  });

  async function LoginHandler(user: IUser) {
    const { email, password } = user;
    setLoading(true);
    try {
      const { data } = await axios.post(`${AUTH_URL}email/login`, {
        email,
        password,
      });
      setLoading(false);
      dispatch(userInfoActions.userLogin(data));
      jsCookie.set("userInfo", JSON.stringify(data));
      if (data.token && data.user) {
        router.push((router.query.redirect as string) || "/");
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(getError(err));
    }
  }
  return (
    <EnteringBox
      title="login"
      submitHandler={LoginHandler}
      errorMessage={errorMessage}
      loading={loading}
    />
  );
};

export default Login;
