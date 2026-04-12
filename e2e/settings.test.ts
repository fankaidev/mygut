import automator from "miniprogram-automator";
import path from "path";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setMiniProgram, getConsoleErrors, clearConsoleErrors, addConsoleError } from "./setup";

describe("Settings Page E2E", () => {
  let miniProgram: Awaited<ReturnType<typeof automator.launch>>;
  let page: Awaited<ReturnType<typeof miniProgram.reLaunch>>;

  beforeAll(async () => {
    miniProgram = await automator.launch({
      projectPath: path.resolve(__dirname, "../dist"),
    });
    setMiniProgram(miniProgram);

    miniProgram.on("console", (msg: { type: string; args: unknown[] }) => {
      if (msg.type === "error" || msg.type === "warn") {
        const errorText = msg.args.map((arg) => String(arg)).join(" ");
        addConsoleError(`[${msg.type}] ${errorText}`);
      }
    });

    page = await miniProgram.reLaunch("/pages/settings/index");
    await page.waitFor(500);
  });

  afterAll(async () => {
    if (miniProgram) {
      await miniProgram.close();
      setMiniProgram(null);
    }
  });

  afterEach(() => {
    const errors = getConsoleErrors();
    clearConsoleErrors();
    if (errors.length > 0) {
      throw new Error(`Console errors during test:\n${errors.join("\n")}`);
    }
  });

  it("should load settings page correctly", async () => {
    expect(page.path).toBe("pages/settings/index");
  });

  it("should display profile section", async () => {
    const profileSection = await page.$(".profile-section");
    expect(profileSection).not.toBeNull();
  });

  it("should display profile avatar area", async () => {
    const profileAvatar = await page.$(".profile-avatar");
    expect(profileAvatar).not.toBeNull();
  });

  it("should display profile nickname", async () => {
    const profileNickname = await page.$(".profile-nickname");
    expect(profileNickname).not.toBeNull();
    const text = await profileNickname!.text();
    expect(text.length).toBeGreaterThan(0);
  });
});
