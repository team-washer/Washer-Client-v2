import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

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

test("renders the admin link as icon-only below lg with an accessible label", async () => {
  const source = await readSource(
    "src/widgets/layout/user-layout/ui/UserNavbar.tsx",
  );

  const adminLink = source.match(
    /<Link href="\/" title="관리자 페이지">([\s\S]*?)<\/Link>/,
  )?.[1];
  assert.ok(adminLink, "Expected the admin link to have a title tooltip");
  assert.match(adminLink, /<LayoutDashboard\s*\/>/);

  const labelClassName = adminLink.match(
    /<span className="([^"]+)">관리자 페이지<\/span>/,
  )?.[1];
  assert.ok(labelClassName);
  assertHasClasses(labelClassName, ["sr-only", "lg:not-sr-only"]);
});

test("overlays the notification badge below sm and gives nav links accessible names", async () => {
  const source = await readSource(
    "src/widgets/layout/user-layout/ui/UserNavbar.tsx",
  );

  const badgeClassName = source.match(
    /<span className="([^"]+)">\s*\{notificationCount > 99/,
  )?.[1];
  assert.ok(badgeClassName, "Expected to find the notification badge");
  assertHasClasses(badgeClassName, ["absolute", "sm:static"]);

  assert.match(
    source,
    /<Link\s+key=\{href\}\s+href=\{href\}\s+aria-label=\{/,
    "Expected each nav link to have an aria-label",
  );
});
