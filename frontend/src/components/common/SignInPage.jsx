import React from "react";
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <section className="flex justify-center items-center lg:min-h-[40vh]">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SignIn />
      </div>
    </section>
  );
}
