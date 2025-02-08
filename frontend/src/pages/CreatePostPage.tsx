import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { isValidLength, isValidTitle } from "../helpers/validator";

function CreatePost() {
  const navigate = useNavigate();
  const { userSession } = useContext(AuthContext);

  //state for button handling (if any input has an invalid value, button is disabled)
  const [formState, setFormState] = useState({
    title: false,
    message: false,
  });
  console.log(formState);

  const isFormInvalid = Object.values(formState).includes(false);

  //error state for form submittion
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      title: formData.get("title"),
      message: formData.get("message"),
      userId: userSession?.userId,
      postedBy: userSession?.email,
      userImg: userSession?.userImg,
      datePosted: new Date().toLocaleDateString(),
    };

    fetch("http://localhost:5000/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setErr(data.message);
        } else {
          console.log("aaaa");
          navigate(`/user/${userSession?.userId}`);
        }
      });
  };

  return (
    <div className="flex items-center justify-center mt-40">
      <div className="bg-slate-400 shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-3xl  text-gray-800 font-semibold text-center">
          Create a Post
        </h2>
        <form className="flex flex-col mt-5 space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Input
              label="Post Title"
              placeholder="Enter your post title..."
              name="title"
              id="title"
              type="text"
              validators={[isValidTitle]}
              errorText="Enter a title (min. 5 character)"
              onInput={(isValid) =>
                setFormState((prevState) => ({
                  ...prevState,
                  title: isValid,
                }))
              }
            />
          </div>
          <div className="flex flex-col">
            <Input
              label="Post message"
              placeholder="Enter your message..."
              name="message"
              id="title"
              validators={[isValidLength]}
              errorText="Enter a message (min. 7 characters)"
              onInput={(isValid) =>
                setFormState((prevState) => ({
                  ...prevState,
                  message: isValid,
                }))
              }
            />
          </div>
          {err && (
            <p className=" text-center mt-3 text-red-600 font-semibold">
              {err}
            </p>
          )}
          <button
            className="bg-blue-500 text-white py-2 rounded-lg text-lg font-semibold hover:scale-105 hover:bg-blue-600 hover:cursor-pointer transition disabled:bg-slate-500"
            type="submit"
            disabled={isFormInvalid}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
