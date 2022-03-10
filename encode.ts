import base64 from "base-64";
import Result from "./result";

export default function encode(value: string): Result[] {
  return [new Result("base64", base64.encode(value))];
}
