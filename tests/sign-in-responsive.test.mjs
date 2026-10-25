import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const readSource = (relativePath) =>
  readFile(path.join(projectRoot, relativePath), "utf8");

test("uses a viewport-safe auth layout", async () => {
  const source = await readSource(
    "src/widgets/layout/auth-layout/ui/AuthLayout/index.tsx",
  );

  assert.match(source, /min-h-dvh/);
  assert.match(source, /w-full/);
  assert.match(source, /px-4 py-6 sm:px-6 sm:py-10/);
});

test("uses a responsive sign-in card", async () => {
  const source = await readSource(
    "src/features/auth/sign-in/ui/SignInForm/index.tsx",
  );

  assert.match(source, /w-full max-w-110/);
  assert.match(source, /px-5 py-8/);
  assert.match(source, /sm:px-7 sm:py-10/);
  assert.match(source, /px-4/);
  assert.match(source, /sm:px-\[2\.09375rem\]/);
});
