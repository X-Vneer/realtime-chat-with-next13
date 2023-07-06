"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { addFriendValidator } from "@/lib/validation/add-friends";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

type FormData = z.infer<typeof addFriendValidator>;

const AddFrindsForm = (props: Props) => {
  // success state
  const [showSuccessState, setShowSuccessState] = useState(false);

  // form state
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  // submit logic
  const addFrind = async (email: string) => {
    setShowSuccessState(false);
    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });

      setShowSuccessState(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
        return;
      }

      if (axios.isAxiosError(error)) {
        setError("email", { message: error.response?.data });
        return;
      }

      setError("root", { message: "something went wrong!" });
    }
  };

  // submition
  const onSubmit = async (data: FormData) => {
    await addFrind(data.email);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <label id="email-input" className="mb-3 inline-block">
          Add your friend Emaill:
        </label>
        <div className="flex w-full max-w-sm  items-start space-x-2">
          <div className=" basis-80">
            <Input
              {...register("email")}
              id="email-input"
              type="email"
              placeholder="Email"
            />
            {errors.email ? (
              <p className="mt-1 text-[12px] text-red-600">
                {errors.email.message}
              </p>
            ) : null}
          </div>
          <Button
            type="submit"
            className=" whitespace-nowrap"
            isLoading={isSubmitting}
          >
            Add Friend
          </Button>
        </div>
        {errors.root ? (
          <p className="mt-1 text-[12px] text-red-600">{errors.root.message}</p>
        ) : null}
        {showSuccessState ? (
          <p className="mt-1 text-sm text-green-600">Friend request sent!</p>
        ) : null}
      </form>
    </div>
  );
};

export default AddFrindsForm;
