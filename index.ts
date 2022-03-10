import encode from "./encode";
import decode from "./decode";

try {
  const [_script, mode, ...values] = scriptArgs;
  const isEncodeMode = /encode/i.test(mode);
  const value = values.join(" ");
  const handler = isEncodeMode ? encode : decode;
  const items = handler(value).filter(
    (result) => result.valid && result.value !== value
  );
  console.log(`
    <?xml version='1.0'?>
    <items>
      ${items.map((item) => item.xml).join("\n")}
    </items>
  `);
} catch (error) {
  console.log(error);
}
