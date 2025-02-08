import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { isValidLength, isValidTitle } from "../helpers/validator";
import Input from "../components/Input";
import { IPost } from "../interfaces/IPosts";

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userSession } = useContext(AuthContext);
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    async function getPost() {
      const data = await fetch(`http://localhost:5000/api/get/post/${id}`)
        .then((res) => res.json())
        .then((data) => data);

      setPost(data);
    }
    getPost();
  }, [id]);

  //state for button handling (if any input has an invalid value, button is disabled)
  const [formState, setFormState] = useState({
    title: true,
    message: true,
  });
  console.log(formState);

  const isFormInvalid = Object.values(formState).includes(false);

  //error state for form submittion
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      postId: id,
      title: formData.get("title"),
      message: formData.get("message"),
      userId: userSession?.userId,
      postedBy: userSession?.email,
      userImg: userSession?.userImg,
      datePosted: new Date().toLocaleDateString(),
      isEdited: true,
    };

    fetch("http://localhost:5000/api/edit", {
      method: "PUT",
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
          navigate(`/user/${userSession?.userId}`);
        }
      });
    console.log("aaa");
  };

  const displayId = id?.slice(2, 5);
  return (
    <div className="flex items-center justify-center mt-40">
      <div className="bg-slate-400 shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-3xl  text-gray-800 font-semibold text-center">
          Edit post #{displayId}
        </h2>
        <form className="flex flex-col mt-5 space-y-4" onSubmit={handleSubmit}>
          {post !== null && (
            <>
              <div className="flex flex-col">
                <Input
                  value={post?.title || null}
                  isInput
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
                  value={post?.message}
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
            </>
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
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPostPage;
