import automator from "miniprogram-automator";
import path from "path";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setMiniProgram, getConsoleErrors, clearConsoleErrors, addConsoleError } from "./setup";

describe("Meal Records E2E", () => {
  let miniProgram: Awaited<ReturnType<typeof automator.launch>>;
  let page: Awaited<ReturnType<typeof miniProgram.reLaunch>>;

  beforeAll(async () => {
    miniProgram = await automator.launch({
      projectPath: path.resolve(__dirname, "../dist"),
    });
    setMiniProgram(miniProgram);

    // Listen for console errors
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
    // Fail test if there are console errors
    const errors = getConsoleErrors();
    clearConsoleErrors();
    if (errors.length > 0) {
      throw new Error(`Console errors during test:\n${errors.join("\n")}`);
    }
  });

  describe("Meal List Page", () => {
    beforeAll(async () => {
      page = await miniProgram.reLaunch("/pages/meal/index/index");
      await page.waitFor(500);
    });

    it("should load meal list page correctly", async () => {
      expect(page.path).toBe("pages/meal/index/index");
    });

    it("should display page title", async () => {
      const title = await page.$(".title");
      expect(title).not.toBeNull();
      const text = await title!.text();
      expect(text).toBe("饮食记录");
    });

    it("should display add button", async () => {
      const addBtn = await page.$(".add-btn");
      expect(addBtn).not.toBeNull();
    });

    it("should display empty state or records list", async () => {
      const emptyState = await page.$(".empty");
      const recordList = await page.$(".record-list");
      expect(emptyState !== null || recordList !== null).toBe(true);
    });

    it("should navigate to add page when tapping add button", async () => {
      const addBtn = await page.$(".add-btn");
      expect(addBtn).not.toBeNull();

      await addBtn!.tap();
      await page.waitFor(1000);

      page = await miniProgram.currentPage();
      expect(page.path).toBe("pages/meal/add/index");
    });
  });

  describe("Meal Add Page", () => {
    beforeAll(async () => {
      page = await miniProgram.reLaunch("/pages/meal/add/index");
      await page.waitFor(500);
    });

    it("should load add page correctly", async () => {
      expect(page.path).toBe("pages/meal/add/index");
    });

    it("should display time section", async () => {
      const sectionTitles = await page.$$(".section-title");
      expect(sectionTitles.length).toBeGreaterThan(0);
      const text = await sectionTitles[0].text();
      expect(text).toBe("时间");
    });

    it("should display food category tabs", async () => {
      const categoryTabs = await page.$$(".category-tab");
      expect(categoryTabs.length).toBe(6); // 主食、肉类、蔬菜、水果、饮品、零食
    });

    it("should display food items in grid", async () => {
      const foodItems = await page.$$(".food-item");
      expect(foodItems.length).toBeGreaterThan(0);
    });

    it("should allow selecting food items", async () => {
      const foodItems = await page.$$(".food-item");
      await foodItems[0].tap();
      await page.waitFor(300);

      const selectedFoods = await page.$$(".selected-food-tag");
      expect(selectedFoods.length).toBe(1);
    });

    it("should display amount options", async () => {
      const amountItems = await page.$$(".amount-item");
      expect(amountItems.length).toBe(3); // 少量、适中、大量
    });

    it("should have default amount selected", async () => {
      const activeAmount = await page.$(".amount-item.active");
      expect(activeAmount).not.toBeNull();
    });

    it("should display submit button", async () => {
      const submitBtn = await page.$(".submit-btn");
      expect(submitBtn).not.toBeNull();
      const text = await submitBtn!.text();
      expect(text).toBe("保存记录");
    });
  });
});
