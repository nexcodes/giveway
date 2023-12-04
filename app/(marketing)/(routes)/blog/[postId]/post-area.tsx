"use client";

import dynamic from "next/dynamic";

import { Post } from "@/types/post";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import { useLanguageStore } from "@/zustand/language";
import { useEffect, useState } from "react";
import { DataItem } from "@/types/prize";

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published">;
}

export function PostArea({ post }: EditorProps) {
  const Editor = dynamic(() => import("./editor"), { ssr: false });
  const [content, setContent] = useState({
    title: post.title,
    content: post.content,
  });

  const { language } = useLanguageStore();

  useEffect(() => {
    const TranslateText = async () => {
      if (language.locale === "en") return;

      const data: DataItem[] = JSON.parse(post.content ?? "[]");

      console.log(data);

      const newData = data.map((item) => {
        if (item.type !== "image") {
          if (item.content && Array.isArray(item.content)) {
            const textContentArray = item.content
              .filter((contentItem) => contentItem.type === "text")
              .map((contentItem) => ({ text: contentItem.text }));

            return textContentArray[0] || { text: "" };
          } else {
            return {
              text: "",
            };
          }
        } else {
          return {
            text: "",
          };
        }
      });

      console.log(newData);

      const options = {
        method: "POST",
        url: "https://microsoft-translator-text.p.rapidapi.com/translate",
        params: {
          "to[0]": "fr",
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "7489783a7amshf0c4b41472678fcp1cbe8fjsn4c526a3587eb",
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
        data: newData,
      };
      const response = await axios.request(options);

      console.log(response.data);

      // console.log(
      //   response.data[0].translations[0].text,
      //   response.data[1].translations[0].text
      // );

      // setContent({
      //   title: response.data[0].translations[0].text,
      //   content: response.data[1].translations[0].text,
      // });
    };

    TranslateText();
  }, [language.locale, post.content]);

  return (
    <div className="container px-4 sm:px-8 mx-auto grid items-start gap-6 md:gap-10 py-8">
      <div className="mx-auto max-w-3xl w-full">
        <TextareaAutosize
          autoFocus
          id="title"
          defaultValue={content?.title ?? undefined}
          placeholder="Post title"
          disabled={true}
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl sm:text-4xl lg:text-5xl font-bold focus:outline-none"
        />
        <div className="-translate-x-12">
          <Editor
            initialContent={content?.content ?? undefined}
            editable={false}
          />
        </div>
      </div>
    </div>
  );
}
