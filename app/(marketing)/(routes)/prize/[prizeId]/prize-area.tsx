"use client";

import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Prize } from "@/types/prize";
import { useState, useEffect } from "react";
import { UserData } from "@/types/user-data";
import Link from "next/link";
import { Spinner } from "@/components/misc/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Participant } from "@/types/participants";
import RemainingTime from "@/components/remaining-time";
import { useLanguageStore } from "@/zustand/language";
import { content } from "@/messages/prize/prize";
import axios from "axios";
import WinningChance from "@/app/(marketing)/_components/winning-chance";
interface PrizeAreaProps {
  prize: Prize;
  user: UserData | null;
}

const PrizeArea = ({ prize, user }: PrizeAreaProps) => {
  const router = useRouter();

  const { language } = useLanguageStore();

  const [dbcontent, setDbContent] = useState<{ [key: string]: string | null }>({
    title: prize.title,
    description: prize.description,
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
            text: prize.title,
          },
          {
            text: prize.description,
          },
        ],
      };
      const response = await axios.request(options);

      console.log(
        response.data[0].translations[0].text,
        response.data[1].translations[0].text
      );

      setDbContent({
        title: response.data[0].translations[0].text,
        description: response.data[1].translations[0].text,
      });
    };

    TranslateText();
  }, [language.locale, prize.title, prize.description]);

  const { ends_in, multiply, SignIn, chance, credit_require } =
    content[language.locale];

  const [sliderValue, setSliderValue] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  async function onAddParticipant() {
    try {
      setIsLoading(true);

      const isEligible =
        (user?.balance ?? 0) >= (prize.credit_need ?? 0) * sliderValue;

      if (!isEligible) {
        toast.error(
          "You don't have enough credit to participate in this prize"
        );
        return;
      }

      const participants: Participant[] = JSON.parse(
        prize.participants ?? JSON.stringify([])
      );
      const index = participants.findIndex(
        (item) => item.email === user?.email
      );
      if (index !== -1) {
        // Email exists in the array
        participants[index].weight += sliderValue;
      } else {
        // Email doesn't exist in the array
        participants.push({
          email: user?.email ?? "",
          weight: sliderValue,
        });
      }

      await fetch("/api/prize/addParticipant", {
        method: "PATCH",
        body: JSON.stringify({
          prizeId: prize.id,
          participants,
          credit: (prize?.credit_need ?? 0) * sliderValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("You have successfully participated in this prize");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="container px-5 py-4 mx-auto">
      <div className="flex flex-wrap">
        <div className="lg:w-[65%] w-full space-y-4">
          <div className="relative overflow-hidden w-full pt-[56.25%] ">
            <Image
              src={prize.image ?? ""}
              alt={prize.title ?? ""}
              fill
              className="object-cover rounded"
            />
          </div>
          <h2 className="md:hidden font-bold text-3xl sm:text-4xl">
            {dbcontent.title}
          </h2>
          <p className="max-w-[42rem] leading-normal text-muted-foreground text-base sm:text-xl sm:leading-8">
            {dbcontent.description}
          </p>
        </div>

        <div className="lg:w-[30%] w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 space-y-4">
          <h2 className="hidden md:block font-bold text-5xl lg:text-6xl">
            {dbcontent.title}
          </h2>
          <div>
            <p className="my-2 leading-normal text-muted-foreground text-xs sm:text-sm">
              {ends_in}
            </p>
            <RemainingTime time_end={prize.time_end} />
          </div>

          <div>
            <p className="mt-2 leading-normal text-muted-foreground text-xs sm:text-sm text-right">
              {sliderValue}
            </p>
            <input
              type="range"
              min={1}
              max={20}
              value={sliderValue}
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-500 [&::-webkit-slider-thumb]:bg-neutral-800 dark:[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5  [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full"
            />

            <p className="mt-2 leading-normal text-muted-foreground text-xs sm:text-sm">
              {multiply}
            </p>
          </div>
          {user ? (
            <button
              type="button"
              onClick={onAddParticipant}
              className={buttonVariants({ className: "w-full" })}
            >
              {isLoading ? <Spinner /> : "I Participate"}
            </button>
          ) : (
            <Link href={"/login"} className={buttonVariants()}>
              {SignIn}
            </Link>
          )}
          <p className="mt-2 leading-normal text-muted-foreground text-xs sm:text-sm">
            {credit_require} {(prize.credit_need ?? 0) * sliderValue}
          </p>
          <WinningChance
            participants={prize.participants}
            email={user?.email}
            chance={chance}
          />
        </div>
      </div>
    </section>
  );
};

export default PrizeArea;
