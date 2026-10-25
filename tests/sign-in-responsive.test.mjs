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

  const mainClassName = source.match(/<main className="([^"]+)"/)?.[1];
  const sectionClassName = source.match(
    /<section className="([^"]+)">/,
  )?.[1];

  assert.ok(mainClassName);
  assert.ok(sectionClassName);
  assert.match(mainClassName, /min-h-dvh/);
  assert.match(sectionClassName, /w-full/);
  assert.match(sectionClassName, /px-4 py-6/);
  assert.match(sectionClassName, /sm:px-6 sm:py-10/);
});

test("uses a responsive sign-in card", async () => {
  const source = await readSource(
    "src/features/auth/sign-in/ui/SignInForm/index.tsx",
  );

  const cardClassName = source.match(/<div className="([^"]+)"/)?.[1];
  const buttonClassName = source.match(
    /<OAuthLoginButton className="([^"]+)" \/>/,
  )?.[1];

  assert.ok(cardClassName);
  assert.ok(buttonClassName);
  assert.match(cardClassName, /w-full max-w-110/);
  assert.match(cardClassName, /px-5 py-8/);
  assert.match(cardClassName, /sm:px-7 sm:py-10/);
  assert.match(buttonClassName, /w-full/);
  assert.match(buttonClassName, /px-4/);
  assert.match(buttonClassName, /sm:px-\[2\.09375rem\]/);
});
