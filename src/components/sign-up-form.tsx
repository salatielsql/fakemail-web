"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
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
import { useFormStatus } from "react-dom";

const formSchema = z.object({
  name: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export type SignUpFormValues = z.infer<typeof formSchema>;

export function SignUpForm({
  onSubmit,
}: {
  onSubmit: (values: FormData) => void;
}) {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        action={onSubmit}
        onSubmit={form.handleSubmit(() => {})}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your name</FormLabel>
              <FormControl>
                <Input placeholder="Type your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Type a email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormDescription>Min 8 characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}

function SubmitButton() {
  const formStatus = useFormStatus();
  console.log(formStatus);
  return (
    <Button type="submit" disabled={formStatus.pending}>
      {formStatus.pending ? "Loading..." : "Sign up"}
    </Button>
  );
}
