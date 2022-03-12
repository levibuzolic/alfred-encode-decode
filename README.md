# Alfred Encode / Decode Workflow

[![Tests](https://github.com/levibuzolic/alfred-encode-decode/actions/workflows/test.yml/badge.svg)](https://github.com/levibuzolic/alfred-encode-decode/actions/workflows/test.yml)

![screenshot](https://user-images.githubusercontent.com/721323/158000536-e1c8fe88-5dd1-44a6-aafa-db020d021373.png)

Inspired by https://github.com/willfarrell/alfred-encode-decode-workflow but without the dependency on PHP. Uses an embedded universal (Apple Silicon or Intel) QuickJS binary.

Encode and decode the following formats:

 - Base64
 - Base64 (URL safe)
 - HTML Entities

## Development

#### Running

```bash
yarn dev --encode "Hello"
```

#### Tests

```bash
yarn test
```

#### Download QuickJS Binaries

```bash
yarn download
```

#### Compile Binary

```bash
yarn build
./dist/alfred-encode-decode --encode "Hello"
```
