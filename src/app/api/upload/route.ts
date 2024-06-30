import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";
import PDFParser from "pdf2json";
import fs from "fs";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join("/", "tmp", file.name);
  await writeFile(path, buffer);

  const pdfParser = new PDFParser();

  pdfParser.on("pdfParser_dataError", (errData) =>
    console.error(errData.parserError)
  );
  pdfParser.on("pdfParser_dataReady", (pdfData) => {
    const text = pdfData.Pages.map((page) => {
      return page.Texts.map((text) => decodeURIComponent(text.R[0].T)).join("");
    }).join("");
    console.log(text);
  });

  fs.readFile(path, (err, pdfBuffer) => {
    if (!err) {
      pdfParser.parseBuffer(pdfBuffer);
    } else {
      console.log(err);
    }
  });

  return NextResponse.json({ success: true });
}
