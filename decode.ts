import base64 from "base-64";
import Result from "./result";

export default function decode(value: string): Result[] {
  return [new Result("base64", base64.decode(value))];
}

// function base64(value: string): string {
//   return Buffer.from(value, "base64").toString("utf8");
// }
