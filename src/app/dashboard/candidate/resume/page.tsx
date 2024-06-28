"use client";

import React, { useState } from "react";

export default function page() {
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input
          className="bg-black-300 p-1 rounded-sm "
          type="submit"
          value="Upload"
        />
      </form>
    </div>
  );
}
