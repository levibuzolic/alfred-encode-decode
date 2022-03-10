import decode from "./decode";

test("decode", () => {
  expect(decode("SGVsbG8=").map((r) => [r.type, r.value])).toEqual([
    ["base64", "Hello"],
  ]);
});
