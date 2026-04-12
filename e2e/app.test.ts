import automator from "miniprogram-automator";
import path from "path";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setMiniProgram, getConsoleErrors, clearConsoleErrors, addConsoleError } from "./setup";

describe("App E2E", () => {
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

  describe("Home Page", () => {
    beforeAll(async () => {
      page = await miniProgram.reLaunch("/pages/index/index");
      await page.waitFor(500);
    });

    it("should display app title and 4 quick action buttons", async () => {
      const title = await page.$(".app-title");
      expect(await title!.text()).toBe("MyGut");

      const actionItems = await page.$$(".action-item");
      expect(actionItems.length).toBe(4);
    });

    it("should navigate to add pages from quick actions", async () => {
      const expectedPaths = [
        "pages/symptom/add/index",
        "pages/meal/add/index",
        "pages/stool/add/index",
        "pages/medication/add/index",
      ];

      for (let i = 0; i < 4; i++) {
        const actionItems = await page.$$(".action-item");
        await actionItems[i].tap();
        await page.waitFor(500);

        page = await miniProgram.currentPage();
        expect(page.path).toBe(expectedPaths[i]);

        await miniProgram.reLaunch("/pages/index/index");
        await page.waitFor(500);
        page = await miniProgram.currentPage();
      }
    });
  });

  describe("Records Page", () => {
    beforeAll(async () => {
      page = await miniProgram.reLaunch("/pages/records/index");
      await page.waitFor(500);
    });

    it("should display date selector and 4 record cards", async () => {
      const dateSelector = await page.$(".date-selector");
      expect(dateSelector).not.toBeNull();

      const recordCards = await page.$$(".record-card");
      expect(recordCards.length).toBe(4);

      const cardTitles = await page.$$(".card-title");
      const titles = await Promise.all(cardTitles.map((t) => t.text()));
      expect(titles).toContain("体感");
      expect(titles).toContain("用药");
      expect(titles).toContain("饮食");
      expect(titles).toContain("排便");
    });

    it("should switch dates with arrows", async () => {
      const dateText = await page.$(".date-text");
      const originalDate = await dateText!.text();

      const dateArrows = await page.$$(".date-arrow");
      await dateArrows[0].tap(); // prev arrow
      await page.waitFor(500);

      const newDateText = await page.$(".date-text");
      expect(await newDateText!.text()).not.toBe(originalDate);
    });
  });

  describe("Settings Page", () => {
    beforeAll(async () => {
      page = await miniProgram.reLaunch("/pages/settings/index");
      await page.waitFor(500);
    });

    it("should display profile section with avatar and nickname", async () => {
      const profileSection = await page.$(".profile-section");
      expect(profileSection).not.toBeNull();

      const profileAvatar = await page.$(".profile-avatar");
      expect(profileAvatar).not.toBeNull();

      const profileNickname = await page.$(".profile-nickname");
      const text = await profileNickname!.text();
      expect(text.length).toBeGreaterThan(0);
    });
  });
});
