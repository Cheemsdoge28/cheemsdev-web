"use client";

import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import SectionContainer from "@/components/ui/section-container";
import { urlFor } from "@/sanity/lib/image";

type ButtonVariant =
  | "default"
  | "secondary"
  | "link"
  | "destructive"
  | "outline"
  | "ghost";

interface FormContactProps {
  readonly padding: {
    readonly top: boolean;
    readonly bottom: boolean;
  };
  readonly colorVariant:
    | "primary"
    | "secondary"
    | "card"
    | "accent"
    | "destructive"
    | "background"
    | "transparent";
  readonly consentText: string;
  readonly description?: string;
  readonly tagLine?: string;
  readonly title: string;
  readonly buttonVariant: ButtonVariant | null | undefined;
  readonly buttonText: string;
  readonly successMessage: string;
  readonly image?: Sanity.Image;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter your name",
  }),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  email: z
    .string()
    .min(1, { message: "Please enter your email" })
    .email({ message: "Please enter a valid email" }),
  enquiryType: z.enum(["General", "Support", "Sales", "Other"], {
    required_error: "Please select an enquiry type",
  }),
  message: z.string().min(1, {
    message: "Please enter your message",
  }),
});

export default function FormContact({
  padding,
  tagLine,
  title,
  description,
  colorVariant,
  consentText,
  buttonText,
  buttonVariant,
  successMessage,
  image,
}: Readonly<Partial<FormContactProps>>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      enquiryType: "General",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleSend = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        console.log(JSON.stringify(values));
        const result = await response.json();

        if (response.ok) {
          toast(successMessage);
          form.reset();
        } else {
          toast.error(result.error);
        }
      } catch (error: any) {
        toast.error(error.message);
        throw new Error(error.message);
      }
    },
    [form, successMessage]
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await handleSend(values);
  }

  const color = stegaClean(colorVariant);

  return (
    <SectionContainer
      color={color}
      padding={padding}
      isContainer={false}
      className="py-0"
    >
      <Form {...form}>
        <form
          className="flex min-h-900 flex-col lg:h-fit lg:flex-row"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          
          {image?.asset?._id && (
            <div className="h-[100vw] w-full md:h-500 lg:h-auto lg:w-2/5">
              <Image
                className="h-full w-full object-cover"
                src={urlFor(image.asset).url()}
                alt={image.alt ?? ""}
                width={image.asset.metadata?.dimensions?.width ?? 800}
                height={image.asset.metadata?.dimensions?.height ?? 800}
                placeholder={image.asset.metadata?.lqip ? "blur" : undefined}
                blurDataURL={image.asset.metadata?.lqip || ""}
                quality={100}
              />
            </div>
          )}
          <div className="flex w-full flex-col gap-y-4 px-4 py-16 md:px-16 lg:px-24 md:py-16 md:pb-16 lg:w-3/5 lg:pb-24 lg:pl-12 lg:pr-24 lg:pt-24">
          <div
            className={cn(color === "primary" ? "text-background" : undefined, "flex flex-col gap-4")}
          >
            {tagLine && (
              <h1 className="leading-[0]">
                <span className="text-base font-semibold">{tagLine}</span>
              </h1>
            )}
            <h2 className="text-3xl md:text-5xl">{title}</h2>
          </div>
          <p
            className={cn({
              "text-secondary-foreground": color === "secondary",
              "text-background": color === "primary", 
            })}
          >
            {description}
          </p>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="relative mb-5">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Your full name"
                      className={cn({
                        "text-secondary-foreground": color === "secondary",
                        "text-background": color === "primary",
                      })}
                    />
                  </FormControl>
                  <FormMessage className="absolute left-0 top-full mt-1 text-xs text-destructive" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="relative mb-5">
                  <FormControl>
                    <PhoneInput
                      placeholder="Enter your phone number"
                      {...field}
                      defaultCountry="US"
                      className={cn({
                        "text-secondary-foreground": color === "secondary",
                        "text-background": color === "primary",
                      })}
                    />
                  </FormControl>
                  <FormMessage className="absolute left-0 top-full mt-1 text-xs text-destructive" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative mb-5">
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="off"
                      data-1p-ignore
                      className={cn({
                        "text-secondary-foreground": color === "secondary",
                        "text-background": color === "primary",
                      })}
                    />
                  </FormControl>
                  <FormMessage className="absolute left-0 top-full mt-1 text-xs text-destructive" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enquiryType"
              render={({ field }) => (
                <FormItem className="relative">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn({
                          "text-secondary-foreground": color === "secondary",
                          "text-background": color === "primary",
                        })}
                      >
                        <SelectValue placeholder="Select enquiry type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="General">Finance and Accounting</SelectItem>
                      <SelectItem value="Support">Consulting</SelectItem>
                      <SelectItem value="Sales">Payroll</SelectItem>
                      <SelectItem value="Other">Taxation</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="absolute left-0 top-full mt-1 text-xs text-destructive" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="relative mb-5">
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Your message..."
                      rows={5}
                      className={cn({
                        "text-secondary-foreground": color === "secondary",
                        "text-background": color === "primary",
                      })}
                    />
                  </FormControl>
                  <FormMessage className="absolute left-0 top-full mt-1 text-xs text-destructive" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 w-full sm:w-auto"
              variant={stegaClean(buttonVariant)}
            >
              {isSubmitting && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {buttonText}
            </Button>
            {consentText && (
              <p className="text-xs text-foreground/90">{consentText}</p>
            )}
          </div>
        </form>
      </Form>
    </SectionContainer>
  );
}
