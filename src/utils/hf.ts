import { HfInference } from "@huggingface/inference";

const HF_TOKEN = process.env.HF_TOKEN_STRING;
export const inference = new HfInference(HF_TOKEN);
