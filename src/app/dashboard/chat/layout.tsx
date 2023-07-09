import React from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" grow h-screen  overflow-y-auto ">{children}</section>
  );
}
