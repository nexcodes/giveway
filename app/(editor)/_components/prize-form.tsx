"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Prize } from "@/types/prize";
import { useState } from "react";
import { Spinner } from "@/components/misc/spinner";
import { toast } from "sonner";
import { useEdgeStore } from "@/lib/edgestore";
import { UploadCloudIcon } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Participant } from "@/types/participants";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  prize_value: z.string(),
  credit_need: z.string(),
  winner: z.string(),
  time_end: z.string(),
});

interface PrizeFormProps {
  prize: Prize;
}

export default function PrizeForm({ prize }: PrizeFormProps) {
  const [file, setFile] = useState<File | null>();
  const [base64File, setBase64File] = useState<string | ArrayBuffer | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectingWinner, setSelectingWinner] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: prize.title ?? "",
      description: prize.description ?? "",
      category: prize.category ?? "",
      prize_value: prize.prize_value?.toString() ?? "",
      credit_need: prize.credit_need?.toString() ?? "",
      winner: prize.winner ?? "",
      time_end: prize.time_end?.toString() ?? "",
    },
  });

  const { edgestore } = useEdgeStore();

  function getBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setBase64File(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
          options: {
            replaceTargetUrl: prize.image ?? "",
          },
        });

        const response = await fetch(`/api/prize/${prize.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            image: res.url,
          }),
        });

        if (!response?.ok) {
          return toast.error(
            "Something went wrong. Your prize was not saved. Please try again."
          );
        }
      }

      if (!file) {
        const response = await fetch(`/api/prize/${prize.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
          }),
        });
        if (!response?.ok) {
          return toast.error(
            "Something went wrong. Your prize was not saved. Please try again."
          );
        }
      }

      toast.success("Your prize has been saved.");
    } catch (error) {
      console.error(error, "PRIZE_FORM_ERROR");
    } finally {
      setIsLoading(false);
    }
  }

  function weightedRandomChoice(participants: Prize["participants"]) {
    const users: Participant[] = JSON.parse(participants ?? "[]");
    if(!users.length) return null;

    const totalWeight = users.reduce((sum, user) => sum + user.weight, 0);
    const randNum = Math.random() * totalWeight;
    let cumulativeWeight = 0;

    for (const user of users) {
      cumulativeWeight += user.weight;
      if (randNum < cumulativeWeight) {
        return user.email;
      }
    }
  }

  const selectWinner = async () => {
    try {
      setSelectingWinner(true);
      
      const _response = await fetch(`/api/prize/${prize.id}/matchTimeEnd`);

      const data = await _response.json();

      if (data[0].winner) {
        return toast.error("A winner has already been selected.");
      }

      if (!data[0].time_end) {
        return toast.error("The lucky draw has not ended yet.");
      }

      const winner = weightedRandomChoice(prize.participants);

      if(!winner) {
        return toast.error("No participants found.");
      }

      const response = await fetch(`/api/prize/${prize.id}/winner`, {
        method: "PATCH",
        body: JSON.stringify({ winner }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response?.ok) {
        return toast.error(
          "Something went wrong. Your winner was not saved. Please try again."
        );
      }
      form.setValue("winner", winner ?? "");
      toast.success("Your winner has been saved.");
    } catch (error) {
      console.error(error, "PRIZE_FORM_ERROR");
    } finally {
      setSelectingWinner(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="write a title..." {...field} />
              </FormControl>
              <FormDescription>
                This will be the title of the prize.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="write a description..." {...field} />
              </FormControl>
              <FormDescription>
                This will be the description of the prize.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="image" className="cursor-pointer w-full">
              {!!base64File || !!prize.image ? (
                <div className="my-4 relative overflow-hidden w-full pt-[56.25%] rounded-md border bg-muted transition-colors">
                  <Image
                    src={
                      (base64File as string) ||
                      prize.image ||
                      "/images/cover.png"
                    }
                    alt="alt"
                    fill
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg ">
                  <div className="flex flex-col items-center justify-center py-10 px-20">
                    <UploadCloudIcon className="mb-2 h-7 w-7" />
                    <div className="text-gray-400">
                      Click or drag file to this area to upload
                    </div>
                  </div>
                </div>
              )}
              <input
                id="image"
                name="image"
                accept="image/*"
                type="file"
                className="hidden"
                disabled={isLoading}
                onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    setFile(file);
                    getBase64(file);
                  }
                }}
              />
            </label>
          </div>
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Gift Card">Gift Card</SelectItem>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="Cooking">Cooking</SelectItem>
                    <SelectItem value="Gaming">Gaming</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                This will be the value of the prize.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prize_value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prize Value</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Prize Value..." {...field} />
              </FormControl>
              <FormDescription>
                This will be the value of the prize in $.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="credit_need"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Credit</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter an amount..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This will be the amount of credit a user need to join in the
                draw.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="winner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Winner</FormLabel>
              <FormControl>
                <Input placeholder="Winner" {...field} disabled />
              </FormControl>
              <Button type="button" onClick={selectWinner}>
                {selectingWinner ? <Spinner /> : "Select winner"}
              </Button>
              <FormDescription>
                This is the winner of the prize.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time_end"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lucky Draw ends at</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>
                This is the date & time when the lucky draw will end.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {isLoading ? <Spinner /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
