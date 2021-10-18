import React, { useState } from "react";
import Editor from "../../../components/Editor";
import Layout from "../../../components/Layout";
import SubmitButton from "../../../components/buttons/SubmitButton";
import CancelButton from "../../../components/buttons/CancelButton";
import { useRouter } from "next/router";
import { Toast, Swal } from "../../../helpers/swal";

export async function getServerSideProps({ query: { id } }) {
  const apiURL = process.env.URL + id;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return {
      props: {
        post: data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default function Edit({ post }) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const cancel = (e) => {
    e.preventDefault();
    router.push(router.asPath.replace("/edit", ""));
  };
  const editPost = async (e) => {
    e.preventDefault();
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure to edit?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, edit it!",
      });
      if (isConfirmed) {
        const body = {
          title,
          content,
        };
        const options = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          redirect: "follow",
        };
        await fetch(process.env.URL + post.id, options);
        await router.push(router.asPath.replace("/edit", ""));
        Toast.fire({ icon: "success", title: "Edit post success!" });
      }
    } catch (error) {
      Toast.fire({ icon: "error", title: "Something went wrong!" });
    }
  };

  return (
    <div>
      <Layout title={`Edit ${title}`} />
      <h1 className="text-center text-3xl font-bold mt-10">Edit post</h1>
      <form onSubmit={editPost} className="p-3 mt-5 lg:container lg:mt-12">
        <input
          className="outline-none rounded h-12 p-2 w-full mb-5"
          placeholder="Title"
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Editor content={content} setContent={setContent} />
        <div className="flex flex-row-reverse mt-4">
          <SubmitButton />
          <CancelButton cancel={cancel} />
        </div>
      </form>
    </div>
  );
}
