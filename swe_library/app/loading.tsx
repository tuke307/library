"use client";
import { Spinner } from "@nextui-org/react";

function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spinner color="primary" />
    </div>
  );
}

export default Loading;
