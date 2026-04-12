import automator from "miniprogram-automator";
import path from "path";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setMiniProgram, getConsoleErrors, clearConsoleErrors, addConsoleError } from "./setup";

describe("Records Page E2E", () => {
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

    page = await miniProgram.reLaunch("/pages/records/index");
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

  it("should load records page correctly", async () => {
    expect(page.path).toBe("pages/records/index");
  });

  it("should display date selector", async () => {
    const dateSelector = await page.$(".date-selector");
    expect(dateSelector).not.toBeNull();
  });

  it("should display 4 record cards", async () => {
    const recordCards = await page.$$(".record-card");
    expect(recordCards.length).toBe(4);
  });

  it("should display card titles for all record types", async () => {
    const cardTitles = await page.$$(".card-title");
    expect(cardTitles.length).toBe(4);

    const titles = await Promise.all(cardTitles.map((t) => t.text()));
    expect(titles).toContain("体感");
    expect(titles).toContain("用药");
    expect(titles).toContain("饮食");
    expect(titles).toContain("排便");
  });

  it("should navigate to previous date when tapping prev arrow", async () => {
    const dateText = await page.$(".date-text");
    const originalDate = await dateText!.text();

    const dateArrows = await page.$$(".date-arrow");
    await dateArrows[0].tap(); // prev arrow
    await page.waitFor(500);

    const newDateText = await page.$(".date-text");
    const newDate = await newDateText!.text();
    expect(newDate).not.toBe(originalDate);
  });

  it("should navigate to next date when tapping next arrow", async () => {
    // We're now on yesterday, so next should work
    const dateText = await page.$(".date-text");
    const originalDate = await dateText!.text();

    const dateArrows = await page.$$(".date-arrow");
    await dateArrows[1].tap(); // next arrow
    await page.waitFor(500);

    const newDateText = await page.$(".date-text");
    const newDate = await newDateText!.text();
    expect(newDate).not.toBe(originalDate);
  });
});
