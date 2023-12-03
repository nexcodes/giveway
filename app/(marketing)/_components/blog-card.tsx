"use client";

import { formatDate } from "@/lib/utils";
import { Post } from "@/types/post";
import { useLanguageStore } from "@/zustand/language";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface BlogCardProps {
  post: Pick<Post, "id" | "title" | "description" | "image" | "created_at">;
}

const BlogCard = ({
  post: { title, description, image, created_at, id },
}: BlogCardProps) => {
  const { language } = useLanguageStore();
  const [content, setContent] = useState<{ [key: string]: string | null }>({
    title,
    description,
  });

  useEffect(() => {
    const TranslateText = async () => {
      if (language.locale === "en") return;

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
        data: [
          {
            text: title,
          },
          {
            text: description,
          },
        ],
      };

      const response = await axios.request(options);

      setContent({
        title: response.data[0].translations[0].text,
        description: response.data[1].translations[0].text,
      });
    };

    TranslateText();
  }, [language.locale, title, description]);

  return (
    <article className="group relative flex flex-col space-y-2">
      <div className="my-4 relative overflow-hidden w-full pt-[56.25%] rounded-md border bg-muted transition-colors">
        <Image src={image ?? "/images/cover.jpg"} alt="alt" fill />
      </div>
      <h2 className="text-2xl font-extrabold">{content.title}</h2>
      <p className="text-muted-foreground">{content.description}</p>
      <p className="text-sm text-muted-foreground">{formatDate(created_at)}</p>
      <Link className="absolute inset-0" href={`/blog/${id}`}>
        <span className="sr-only">View Article</span>
      </Link>
    </article>
  );
};

export default BlogCard;
