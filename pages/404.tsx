import React from "react";
import MetaData from "@components/MetaData";

export default function PageNotFound() {
  return (
    <>
      <MetaData
        title="404"
        suffix="Page Not Found"
        description="You are lost in Space !!!"
      />
      <section className="flex flex-col gap-5 pageTop md:pt-20">
        <h1 className="text-3xl font-bold uppercase font-barlow md:text-5xl dark:text-white">
          This page does not exist
        </h1>
      </section>
    </>
  );
}
