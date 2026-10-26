import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const readSource = (relativePath) =>
  readFile(path.join(projectRoot, relativePath), "utf8");

const assertHasClasses = (className, expectedClasses) => {
  const classTokens = new Set(className.split(/\s+/));

  for (const expectedClass of expectedClasses) {
    assert.ok(
      classTokens.has(expectedClass),
      `Expected className to include ${expectedClass}`,
    );
  }
};

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
  assertHasClasses(mainClassName, ["min-h-dvh"]);
  assertHasClasses(sectionClassName, [
    "w-full",
    "px-4",
    "py-6",
    "sm:px-6",
    "sm:py-10",
  ]);
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
  assertHasClasses(cardClassName, [
    "w-full",
    "max-w-110",
    "px-5",
    "py-8",
    "sm:px-7",
    "sm:py-10",
  ]);
  assertHasClasses(buttonClassName, [
    "w-full",
    "px-4",
    "sm:px-[2.09375rem]",
  ]);
});
