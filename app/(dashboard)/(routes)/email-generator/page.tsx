"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { ClipboardCopy, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  formSchema,
  languageOptions,
  PurposeOptions,
  voiceOptions,
  Wordsptions,
} from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ChatCompletionRequestMessage from "openai";

import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import * as copy from "copy-to-clipboard";
import Loader from "@/components/loader";
import Empty from "@/components/empty";


export default function EmailGeneratorPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      words: "500",
      languages: "English",
      tone: "Formal",
      purpose : "a greeting"
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMessages([]);
      const email =
        "Generate an email about " + values.purpose + " with the message " +
        values.message +
        " words limit " +
        values.words +
        " language " +
        values.languages +
        " voice tone " +
        values.tone;
      const userMessage: ChatCompletionRequestMessage = {
        // @ts-ignore
        role: "user",
        content: email,
      };
      const newEmail = [userMessage];

      const response = await axios.post("/api/emailgenerator", {
        messages: newEmail,
      });
      
      
      setMessages(response.data);

      form.reset();
    } catch (error: any) {
    } finally {
      router.refresh();
    }
  };

  const copyToClipboard = () => {
    // @ts-ignore
    if (messages.content) {
      // @ts-ignore
      copy(messages.content);
    }

    toast.success("Copied");
  };

  return (
    <div>
      <Heading
        title="Email Generator"
        description=""
        icon={Mail}
        iconColor="text-green-500"
        bgColor="bg-green-500/10"
      />
      <div className="p-8 flex sm:flex-row flex-col sm:gap-x-6">
        <div className="sm:w-1/2 w-full">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Compose the perfect email</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>

                    <FormField
                      name="message"
                      render={({ field }) => (
                        <FormItem className="col-span-12 lg:col-span-6">
                          <FormControl className="m-0 p-0">
                            <Textarea
                              className="min-h-[150px]"
                              disabled={isLoading}
                              placeholder="Provide a brief description of your email"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="words">Length</Label>
                      <FormField
                        name="words"
                        render={({ field }) => (
                          <FormItem className="">
                            <Select
                              disabled={isLoading}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue defaultValue={field.value} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Wordsptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="voice-tone">Voice Tone</Label>
                      <FormField
                        name="tone"
                        render={({ field }) => (
                          <FormItem className="">
                            <Select
                              disabled={isLoading}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue defaultValue={field.value} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {voiceOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <FormField
                        name="languages"
                        render={({ field }) => (
                          <FormItem className="">
                            <Select
                              disabled={isLoading}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue defaultValue={field.value} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {languageOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="purpose">Purpose</Label>
                      <FormField
                        name="purpose"
                        render={({ field }) => (
                          <FormItem className="">
                            <Select
                              disabled={isLoading}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue defaultValue={field.value} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {PurposeOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="py-4">
                    <Button disabled={isLoading} className="w-full">
                      Generate
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="sm:w-1/2 w-full space-y-4 mt-4 relative bg-gray-200 h-full rounded-lg p-8 overflow-auto">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justifiy-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <div>
              <Empty label="No email" />
            </div>
          )}
          <div className="flex  flex-col-reverse gap-y-4">
          
          <ReactMarkdown
           className="text-sm overflow-hidden leading-7 flex flex-col">

{// @ts-ignore 
messages.content || ""}
          </ReactMarkdown>
           
              
              
           
            <div className="absolute bottom-0.5  float-right right-5">
              <button onClick={copyToClipboard}>
                <ClipboardCopy className="opacity-70 w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
