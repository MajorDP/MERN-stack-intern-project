import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Input from "../components/Input";
import { isEmail, isValidLength } from "../helpers/validator";

interface ErrorResponse {
  message?: string;
}

function AuthPage() {
  const { login, register } = useContext(AuthContext);
  const [isSignIn, setIsSignIn] = useState(true);

  //state for button handling (if any input has an invalid value, button is disabled)
  const [formState, setFormState] = useState({
    email: false,
    password: false,
    repeatPassword: false,
  });

  const isFormInvalid = isSignIn
    ? Object.values(formState).slice(0, 1).includes(false)
    : Object.values(formState).includes(false);

  //error state for form submits
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      repeatPassword: formData.get("repeatPassword"),
    };

    let error: ErrorResponse | null = null;

    if (isSignIn) {
      //@ts-expect-error error always of correct type
      error = await login(data);
    } else {
      //@ts-expect-error error always of correct type
      error = await register(data);
    }

    if (error?.message) {
      setErr(error.message); // Set the error message
    }
  };

  return (
    <div className="flex items-center justify-center mt-40">
      <div className="bg-slate-400 shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-3xl  text-gray-800 font-semibold text-center">
          {isSignIn === true ? "Sign in" : "Sign up"}
        </h2>

        <form
          className="flex flex-col mt-5 space-y-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col">
            <Input
              isInput
              label="Email"
              id="email"
              name="email"
              placeholder="Write your email here..."
              type="email"
              validators={[isEmail]}
              errorText="Enter a valid Email"
              onInput={(isValid) =>
                setFormState((prevState) => ({
                  ...prevState,
                  email: isValid,
                }))
              }
            />
          </div>

          <div className="flex flex-col">
            <Input
              isInput
              label="Password"
              id="password"
              name="password"
              placeholder="Write your password here..."
              type="password"
              validators={[isValidLength]}
              errorText="Password too short."
              onInput={(isValid) =>
                setFormState((prevState) => ({
                  ...prevState,
                  password: isValid,
                }))
              }
            />
          </div>

          {!isSignIn && (
            <div className="flex flex-col">
              <Input
                isInput
                label="Repeat Password"
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Repeat your password here..."
                type="password"
                validators={[isValidLength]}
                errorText=""
                onInput={(isValid) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    repeatPassword: isValid,
                  }))
                }
              />
            </div>
          )}
          {err && (
            <p className=" text-center mt-3 text-red-600 font-semibold">
              {err}
            </p>
          )}
          <button
            className="bg-blue-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:cursor-pointer transition disabled:bg-slate-500"
            type="submit"
            disabled={isFormInvalid}
          >
            Post
          </button>
        </form>
        <div className="flex items-center justify-center mt-2">
          <button
            className="text-blue-800 text-sm hover:cursor-pointer hover:scale-105 duration-300"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn === true
              ? "Don't have an account?"
              : "Already have an account?"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
