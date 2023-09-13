import { Candidate } from "./candidate";

export type Position = {
  title: string;
  description?: string;
  candidates: Candidate[];
};
