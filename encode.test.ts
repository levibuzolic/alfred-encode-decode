import encode from "./encode";

test("encode", () => {
  expect(encode("Hello").map((r) => [r.type, r.value])).toEqual([
    ["base64", "SGVsbG8="],
  ]);
});
