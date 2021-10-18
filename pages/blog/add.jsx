import React, { useState } from "react";
import Layout from "../../components/Layout";
import Editor from "../../components/Editor";
import SubmitButton from "../../components/buttons/SubmitButton";
import CancelButton from "../../components/buttons/CancelButton";
import { useRouter } from "next/router";
import { Toast } from "../../helpers/swal";

export default function Add() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("Hello world!");

  const cancel = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const addPost = async (e) => {
    e.preventDefault();
    try {
      const body = {
        title,
        content,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      await fetch(process.env.URL, options);
      Toast.fire({ icon: "success", title: "Add new post success!" });
    } catch (error) {
      Toast.fire({ icon: "error", title: "Something went wrong!" });
    } finally {
      router.push("/");
    }
  };

  return (
    <div>
      <Layout title="Add new post" />
      <h1 className="text-center text-3xl font-bold mt-10">Add new post</h1>
      <form onSubmit={addPost} className="p-3 mt-5 lg:container lg:mt-12">
        <input
          className="outline-none rounded h-12 p-2 w-full mb-5"
          placeholder="Title"
          type="text"
          name="title"
          id="title"
          value={title}
          required
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
