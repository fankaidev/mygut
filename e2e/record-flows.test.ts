import automator from "miniprogram-automator";
import path from "path";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setMiniProgram, getConsoleErrors, clearConsoleErrors, addConsoleError } from "./setup";

describe("Record Creation Flows E2E", () => {
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

  describe("Symptom Record Flow", () => {
    it("should create symptom record and verify on records page", async () => {
      // Navigate to add page
      page = await miniProgram.reLaunch("/pages/symptom/add/index");
      await page.waitFor(500);
      expect(page.path).toBe("pages/symptom/add/index");

      // Select a feeling (tap first feeling option)
      const feelingItems = await page.$$(".feeling-item");
      expect(feelingItems.length).toBeGreaterThan(0);
      await feelingItems[0].tap();
      await page.waitFor(300);

      // Submit
      const submitBtn = await page.$(".submit-btn");
      expect(submitBtn).not.toBeNull();
      await submitBtn!.tap();
      await page.waitFor(1000);

      // Should navigate back or show success
      page = await miniProgram.currentPage();

      // Navigate to records page to verify
      await miniProgram.reLaunch("/pages/records/index");
      await page.waitFor(1000);
      page = await miniProgram.currentPage();

      // Find symptom card and verify it has records
      const cardTitles = await page.$$(".card-title");
      let symptomCardIndex = -1;
      for (let i = 0; i < cardTitles.length; i++) {
        const text = await cardTitles[i].text();
        if (text === "体感") {
          symptomCardIndex = i;
          break;
        }
      }
      expect(symptomCardIndex).toBeGreaterThanOrEqual(0);

      const cardCounts = await page.$$(".card-count");
      const countText = await cardCounts[symptomCardIndex].text();
      // Should have at least 1 record
      expect(countText).toMatch(/\[\d+条\]/);
      const count = parseInt(countText.match(/\d+/)?.[0] || "0");
      expect(count).toBeGreaterThan(0);
    });
  });

  describe("Meal Record Flow", () => {
    it("should create meal record and verify on records page", async () => {
      // Navigate to add page
      page = await miniProgram.reLaunch("/pages/meal/add/index");
      await page.waitFor(500);
      expect(page.path).toBe("pages/meal/add/index");

      // Select a food item
      const foodItems = await page.$$(".food-item");
      expect(foodItems.length).toBeGreaterThan(0);
      await foodItems[0].tap();
      await page.waitFor(300);

      // Submit
      const submitBtn = await page.$(".submit-btn");
      expect(submitBtn).not.toBeNull();
      await submitBtn!.tap();
      await page.waitFor(1000);

      // Navigate to records page to verify
      await miniProgram.reLaunch("/pages/records/index");
      await page.waitFor(1000);
      page = await miniProgram.currentPage();

      // Find meal card and verify it has records
      const cardTitles = await page.$$(".card-title");
      let mealCardIndex = -1;
      for (let i = 0; i < cardTitles.length; i++) {
        const text = await cardTitles[i].text();
        if (text === "饮食") {
          mealCardIndex = i;
          break;
        }
      }
      expect(mealCardIndex).toBeGreaterThanOrEqual(0);

      const cardCounts = await page.$$(".card-count");
      const countText = await cardCounts[mealCardIndex].text();
      expect(countText).toMatch(/\[\d+条\]/);
      const count = parseInt(countText.match(/\d+/)?.[0] || "0");
      expect(count).toBeGreaterThan(0);
    });
  });

  describe("Stool Record Flow", () => {
    it("should create stool record and verify on records page", async () => {
      // Navigate to add page
      page = await miniProgram.reLaunch("/pages/stool/add/index");
      await page.waitFor(500);
      expect(page.path).toBe("pages/stool/add/index");

      // Select a Bristol type
      const bristolItems = await page.$$(".bristol-item");
      expect(bristolItems.length).toBeGreaterThan(0);
      await bristolItems[3].tap(); // Select type 4 (normal)
      await page.waitFor(300);

      // Submit
      const submitBtn = await page.$(".submit-btn");
      expect(submitBtn).not.toBeNull();
      await submitBtn!.tap();
      await page.waitFor(1000);

      // Navigate to records page to verify
      await miniProgram.reLaunch("/pages/records/index");
      await page.waitFor(1000);
      page = await miniProgram.currentPage();

      // Find stool card and verify it has records
      const cardTitles = await page.$$(".card-title");
      let stoolCardIndex = -1;
      for (let i = 0; i < cardTitles.length; i++) {
        const text = await cardTitles[i].text();
        if (text === "排便") {
          stoolCardIndex = i;
          break;
        }
      }
      expect(stoolCardIndex).toBeGreaterThanOrEqual(0);

      const cardCounts = await page.$$(".card-count");
      const countText = await cardCounts[stoolCardIndex].text();
      expect(countText).toMatch(/\[\d+条\]/);
      const count = parseInt(countText.match(/\d+/)?.[0] || "0");
      expect(count).toBeGreaterThan(0);
    });
  });

  describe("Medication Record Flow", () => {
    it("should create medication record and verify on records page", async () => {
      // Navigate to add page
      page = await miniProgram.reLaunch("/pages/medication/add/index");
      await page.waitFor(500);
      expect(page.path).toBe("pages/medication/add/index");

      // Select a medication item
      const medicationItems = await page.$$(".medication-item");
      expect(medicationItems.length).toBeGreaterThan(0);
      await medicationItems[0].tap();
      await page.waitFor(300);

      // Submit
      const submitBtn = await page.$(".submit-btn");
      expect(submitBtn).not.toBeNull();
      await submitBtn!.tap();
      await page.waitFor(1000);

      // Navigate to records page to verify
      await miniProgram.reLaunch("/pages/records/index");
      await page.waitFor(1000);
      page = await miniProgram.currentPage();

      // Find medication card and verify it has records
      const cardTitles = await page.$$(".card-title");
      let medicationCardIndex = -1;
      for (let i = 0; i < cardTitles.length; i++) {
        const text = await cardTitles[i].text();
        if (text === "用药") {
          medicationCardIndex = i;
          break;
        }
      }
      expect(medicationCardIndex).toBeGreaterThanOrEqual(0);

      const cardCounts = await page.$$(".card-count");
      const countText = await cardCounts[medicationCardIndex].text();
      expect(countText).toMatch(/\[\d+条\]/);
      const count = parseInt(countText.match(/\d+/)?.[0] || "0");
      expect(count).toBeGreaterThan(0);
    });
  });
});
