import React, { useRef, useState } from "react";
import Link from "next/link";
import Input from "../UI/Input";
import { useLanguage } from "../../hooks/useLanguage";
import { IUser } from "../../lib/types/user";
import { MdVisibility, MdVisibilityOff } from "react-icons/md"; // Importing icons from Material Design

interface Props {
  title: string;
  submitHandler: (user: IUser) => void;
  errorMessage: string;
  loading?: boolean;
}

const EnteringBox: React.FC<Props> = ({
  title,
  submitHandler,
  errorMessage,
}) => {
  const errorMessageRef = useRef<HTMLSpanElement | null>(null);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const { t } = useLanguage();
  // const [error, setErrorMessage] = useState<string>(errorMessage);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [localErrorMessage, setLocalErrorMessage] = useState("");

  if (errorMessage) {
    title === "signUp"
      ? firstNameRef.current?.focus() &&
        lastNameRef.current?.focus() &&
        emailRef.current?.focus() &&
        passwordRef.current?.focus() &&
        confirmPasswordRef.current?.focus()
      : null;
    emailRef.current?.focus();
    passwordRef.current?.focus();
  }

  /*   useEffect(() => {
    console.log("loading", loading);
  }, [loading]); */

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordRef.current?.value && emailRef.current?.value) {
      let user: IUser | null = null;
      if (
        firstNameRef.current?.value &&
        title === "signUp" &&
        lastNameRef.current?.value
      ) {
        if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
          errorMessageRef.current?.focus();
          passwordRef.current?.focus();
          setLocalErrorMessage("passwordMismatch");
          return;
        }
        user = {
          password: passwordRef.current?.value,
          email: emailRef.current?.value,
          firstName: firstNameRef.current?.value,
          lastName: lastNameRef.current?.value,
        };
      } else {
        user = {
          password: passwordRef.current?.value,
          email: emailRef.current?.value,
        };
      }
      setLocalErrorMessage("");
      submitHandler(user);
    }
  };

  // TODO : Add a function to handle error from data
  // TODO : Add the loader to button when we are fetching API  ==> use Redux

  const linkHref = title === "login" ? "signUp" : "login";

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="w-full md:w-[50%] max-w-[500px] border-2 bg-palette-card shadow-lg py-4 px-8 rounded-lg">
        <h2 className="text-lg md:text-2xl font-bold">{t[`${title}`]}</h2>
        <p className="mt-4 mb-2">
          {t.hi}
          {title === "login" ? (
            <>
              <br />
              <span className="inline-block text-palette-mute dark:text-palette-base/80 text-sm mt-2 bg-palette-fill p-2">
                {t.loginExplanation}
              </span>
            </>
          ) : null}
        </p>
        <form onSubmit={onSubmitHandler}>
          <div className="mt-8">
            {title === "signUp" ? (
              <Input
                ref={firstNameRef}
                type="text"
                id="firstName"
                placeholder="enterYourFistName"
                required={true}
              />
            ) : null}

            {title === "signUp" ? (
              <Input
                ref={lastNameRef}
                type="text"
                id="lastName"
                placeholder="enterYourLastName"
                required={true}
              />
            ) : null}

            <Input
              ref={emailRef}
              type="email"
              id="email"
              placeholder="enterYourEmail"
              required={true}
            />

            <div className="relative">
              <Input
                ref={passwordRef}
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="enterYourPassword"
                required={true}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <MdVisibilityOff className="h-5 w-5" />
                ) : (
                  <MdVisibility className="h-5 w-5" />
                )}
              </button>
            </div>

            {title === "signUp" && (
              <div className="relative">
                <Input
                  ref={confirmPasswordRef}
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="confirmYourPassword"
                  required={true}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  {confirmPasswordVisible ? (
                    <MdVisibilityOff className="h-5 w-5" />
                  ) : (
                    <MdVisibility className="h-5 w-5" />
                  )}
                </button>
              </div>
            )}

            {errorMessage && (
              <span
                ref={errorMessageRef}
                className="block -mt-4 mb-4 text-red-600 text-sm"
              >
                {t[`${errorMessage}`]}
              </span>
            )}

            {localErrorMessage && (
              <span
                ref={errorMessageRef}
                className="block -mt-4 mb-4 text-red-600 text-sm"
              >
                {t[`${localErrorMessage}`] || localErrorMessage}
              </span>
            )}

            <button
              // disabled={loading}
              type="submit"
              className="bg-palette-primary w-full py-4 rounded-lg text-palette-side text-xl shadow-lg"
            >
              {t[`${title}`]}
            </button>
          </div>
        </form>
        <Link href={`/${linkHref}`}>
          <div className="block my-4">
            <span className="text-sm text-palette-mute">
              {title === "login" ? t.doHaveAnAccount : t.alreadyHaveAnAccount}
            </span>
            <span className="text-palette-tertiary">{t[`${linkHref}`]}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EnteringBox;
