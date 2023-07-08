import AddFrindsForm from "@/components/AddFrindsForm";
import React from "react";

type Props = {};

export default async function AddFrinds(props: Props) {
  return (
    <section className="px-4 py-8 lg:p-8 grow max-h-screen overflow-y-auto">
      <h1 className="mb-6 lg:mb-8  text-3xl lg:text-5xl font-bold  text-gray-900">
        Add a new friend
      </h1>
      <AddFrindsForm />
    </section>
  );
}
