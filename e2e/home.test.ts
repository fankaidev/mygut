import automator from "miniprogram-automator";
import path from "path";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setMiniProgram, getConsoleErrors, clearConsoleErrors, addConsoleError } from "./setup";

describe("Home Page E2E", () => {
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

    page = await miniProgram.reLaunch("/pages/index/index");
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

  it("should load home page correctly", async () => {
    expect(page.path).toBe("pages/index/index");
  });

  it("should display app title", async () => {
    const title = await page.$(".app-title");
    expect(title).not.toBeNull();
    const text = await title!.text();
    expect(text).toBe("MyGut");
  });

  it("should display 4 quick action buttons", async () => {
    const actionItems = await page.$$(".action-item");
    expect(actionItems.length).toBe(4);
  });

  it("should navigate to symptom add page when tapping 体感", async () => {
    const actionItems = await page.$$(".action-item");
    await actionItems[0].tap();
    await page.waitFor(500);

    page = await miniProgram.currentPage();
    expect(page.path).toBe("pages/symptom/add/index");

    await miniProgram.reLaunch("/pages/index/index");
    await page.waitFor(500);
    page = await miniProgram.currentPage();
  });

  it("should navigate to meal add page when tapping 饮食", async () => {
    const actionItems = await page.$$(".action-item");
    await actionItems[1].tap();
    await page.waitFor(500);

    page = await miniProgram.currentPage();
    expect(page.path).toBe("pages/meal/add/index");

    await miniProgram.reLaunch("/pages/index/index");
    await page.waitFor(500);
    page = await miniProgram.currentPage();
  });

  it("should navigate to stool add page when tapping 排便", async () => {
    const actionItems = await page.$$(".action-item");
    await actionItems[2].tap();
    await page.waitFor(500);

    page = await miniProgram.currentPage();
    expect(page.path).toBe("pages/stool/add/index");

    await miniProgram.reLaunch("/pages/index/index");
    await page.waitFor(500);
    page = await miniProgram.currentPage();
  });

  it("should navigate to medication add page when tapping 用药", async () => {
    const actionItems = await page.$$(".action-item");
    await actionItems[3].tap();
    await page.waitFor(500);

    page = await miniProgram.currentPage();
    expect(page.path).toBe("pages/medication/add/index");
  });
});
