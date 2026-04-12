# Input Validation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add input validation for user-entered text fields (nickname, food, symptom, medication, note) to prevent invalid data from being saved.

**Architecture:** Centralized validation utility (`src/utils/validation.ts`) with field-specific validator functions. Each function returns `string | null` (error message or null if valid). Pages import validators and call them in submit handlers, showing errors via `Taro.showToast`.

**Tech Stack:** TypeScript, Taro, Vitest

---

## File Structure

| File | Purpose |
|------|---------|
| `src/utils/validation.ts` | Validation functions for each field type |
| `src/utils/validation.test.ts` | Unit tests for validation functions |
| `src/components/ProfilePopup/index.tsx` | Add nickname validation |
| `src/pages/meal/add/index.tsx` | Add food name validation |
| `src/pages/symptom/add/index.tsx` | Add symptom name validation |
| `src/pages/medication/add/index.tsx` | Add medication name validation |

---

### Task 1: Create validation utility with nickname validator

**Files:**
- Create: `src/utils/validation.ts`
- Create: `src/utils/validation.test.ts`

- [ ] **Step 1: Write failing tests for nickname validation**

```typescript
// src/utils/validation.test.ts
import { describe, it, expect } from "vitest";
import { validateNickname } from "./validation";

describe("validateNickname", () => {
  it("returns null for valid nickname", () => {
    expect(validateNickname("用户123")).toBeNull();
    expect(validateNickname("test_user")).toBeNull();
    expect(validateNickname("张三")).toBeNull();
  });

  it("returns error for empty nickname", () => {
    expect(validateNickname("")).toBe("昵称不能为空");
    expect(validateNickname("   ")).toBe("昵称不能为空");
  });

  it("returns error for nickname exceeding 20 characters", () => {
    expect(validateNickname("a".repeat(21))).toBe("昵称长度不能超过20字符");
  });

  it("returns error for invalid characters", () => {
    expect(validateNickname("user@name")).toBe("昵称只能包含中英文、数字、下划线");
    expect(validateNickname("user name")).toBe("昵称只能包含中英文、数字、下划线");
    expect(validateNickname("用户😀")).toBe("昵称只能包含中英文、数字、下划线");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/utils/validation.test.ts`
Expected: FAIL with "Cannot find module './validation'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/utils/validation.ts

// Pattern: Chinese characters, English letters, numbers, underscore
const NICKNAME_PATTERN = /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/;

export function validateNickname(value: string): string | null {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return "昵称不能为空";
  }

  if (trimmed.length > 20) {
    return "昵称长度不能超过20字符";
  }

  if (!NICKNAME_PATTERN.test(trimmed)) {
    return "昵称只能包含中英文、数字、下划线";
  }

  return null;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/utils/validation.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/validation.ts src/utils/validation.test.ts
git commit -m "feat(validation): add nickname validation"
```

---

### Task 2: Add food name validator

**Files:**
- Modify: `src/utils/validation.ts`
- Modify: `src/utils/validation.test.ts`

- [ ] **Step 1: Write failing tests for food validation**

Add to `src/utils/validation.test.ts`:

```typescript
import { validateNickname, validateFood } from "./validation";

describe("validateFood", () => {
  it("returns null for valid food name", () => {
    expect(validateFood("红烧肉")).toBeNull();
    expect(validateFood("Pasta")).toBeNull();
    expect(validateFood("牛奶(低脂)")).toBeNull();
    expect(validateFood("全麦面包-无糖")).toBeNull();
  });

  it("returns error for empty food name", () => {
    expect(validateFood("")).toBe("食物名称不能为空");
    expect(validateFood("   ")).toBe("食物名称不能为空");
  });

  it("returns error for food name exceeding 30 characters", () => {
    expect(validateFood("a".repeat(31))).toBe("食物名称不能超过30字符");
  });

  it("returns error for invalid characters", () => {
    expect(validateFood("食物@名")).toBe("食物名称包含无效字符");
    expect(validateFood("food#1")).toBe("食物名称包含无效字符");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/utils/validation.test.ts`
Expected: FAIL with "validateFood is not exported"

- [ ] **Step 3: Write minimal implementation**

Add to `src/utils/validation.ts`:

```typescript
// Pattern: Chinese, English, numbers, space, parentheses, hyphen
const FOOD_PATTERN = /^[\u4e00-\u9fa5a-zA-Z0-9\s\-()（）]+$/;

export function validateFood(value: string): string | null {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return "食物名称不能为空";
  }

  if (trimmed.length > 30) {
    return "食物名称不能超过30字符";
  }

  if (!FOOD_PATTERN.test(trimmed)) {
    return "食物名称包含无效字符";
  }

  return null;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/utils/validation.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/validation.ts src/utils/validation.test.ts
git commit -m "feat(validation): add food name validation"
```

---

### Task 3: Add symptom name validator

**Files:**
- Modify: `src/utils/validation.ts`
- Modify: `src/utils/validation.test.ts`

- [ ] **Step 1: Write failing tests for symptom validation**

Add to `src/utils/validation.test.ts`:

```typescript
import { validateNickname, validateFood, validateSymptom } from "./validation";

describe("validateSymptom", () => {
  it("returns null for valid symptom name", () => {
    expect(validateSymptom("腹痛")).toBeNull();
    expect(validateSymptom("headache")).toBeNull();
    expect(validateSymptom("胃胀气")).toBeNull();
  });

  it("returns error for empty symptom name", () => {
    expect(validateSymptom("")).toBe("症状名称不能为空");
    expect(validateSymptom("   ")).toBe("症状名称不能为空");
  });

  it("returns error for symptom name exceeding 20 characters", () => {
    expect(validateSymptom("a".repeat(21))).toBe("症状名称不能超过20字符");
  });

  it("returns error for invalid characters", () => {
    expect(validateSymptom("症状123")).toBe("症状名称只能包含中英文");
    expect(validateSymptom("pain@stomach")).toBe("症状名称只能包含中英文");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/utils/validation.test.ts`
Expected: FAIL with "validateSymptom is not exported"

- [ ] **Step 3: Write minimal implementation**

Add to `src/utils/validation.ts`:

```typescript
// Pattern: Chinese and English only
const SYMPTOM_PATTERN = /^[\u4e00-\u9fa5a-zA-Z]+$/;

export function validateSymptom(value: string): string | null {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return "症状名称不能为空";
  }

  if (trimmed.length > 20) {
    return "症状名称不能超过20字符";
  }

  if (!SYMPTOM_PATTERN.test(trimmed)) {
    return "症状名称只能包含中英文";
  }

  return null;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/utils/validation.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/validation.ts src/utils/validation.test.ts
git commit -m "feat(validation): add symptom name validation"
```

---

### Task 4: Add medication name validator

**Files:**
- Modify: `src/utils/validation.ts`
- Modify: `src/utils/validation.test.ts`

- [ ] **Step 1: Write failing tests for medication validation**

Add to `src/utils/validation.test.ts`:

```typescript
import { validateNickname, validateFood, validateSymptom, validateMedication } from "./validation";

describe("validateMedication", () => {
  it("returns null for valid medication name", () => {
    expect(validateMedication("布洛芬")).toBeNull();
    expect(validateMedication("Ibuprofen")).toBeNull();
    expect(validateMedication("维生素B12")).toBeNull();
    expect(validateMedication("阿莫西林(500mg)")).toBeNull();
  });

  it("returns error for empty medication name", () => {
    expect(validateMedication("")).toBe("药物名称不能为空");
    expect(validateMedication("   ")).toBe("药物名称不能为空");
  });

  it("returns error for medication name exceeding 50 characters", () => {
    expect(validateMedication("a".repeat(51))).toBe("药物名称不能超过50字符");
  });

  it("returns error for invalid characters", () => {
    expect(validateMedication("药物@名")).toBe("药物名称包含无效字符");
    expect(validateMedication("med#1")).toBe("药物名称包含无效字符");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/utils/validation.test.ts`
Expected: FAIL with "validateMedication is not exported"

- [ ] **Step 3: Write minimal implementation**

Add to `src/utils/validation.ts`:

```typescript
// Pattern: Chinese, English, numbers, space, parentheses, hyphen
const MEDICATION_PATTERN = /^[\u4e00-\u9fa5a-zA-Z0-9\s\-()（）]+$/;

export function validateMedication(value: string): string | null {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return "药物名称不能为空";
  }

  if (trimmed.length > 50) {
    return "药物名称不能超过50字符";
  }

  if (!MEDICATION_PATTERN.test(trimmed)) {
    return "药物名称包含无效字符";
  }

  return null;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/utils/validation.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/validation.ts src/utils/validation.test.ts
git commit -m "feat(validation): add medication name validation"
```

---

### Task 5: Add note validator

**Files:**
- Modify: `src/utils/validation.ts`
- Modify: `src/utils/validation.test.ts`

- [ ] **Step 1: Write failing tests for note validation**

Add to `src/utils/validation.test.ts`:

```typescript
import { validateNickname, validateFood, validateSymptom, validateMedication, validateNote } from "./validation";

describe("validateNote", () => {
  it("returns null for valid note", () => {
    expect(validateNote("这是一条备注")).toBeNull();
    expect(validateNote("Note with symbols: @#$%")).toBeNull();
    expect(validateNote("")).toBeNull(); // empty is allowed
    expect(validateNote("   ")).toBeNull(); // whitespace-only is allowed (trims to empty)
  });

  it("returns error for note exceeding 500 characters", () => {
    expect(validateNote("a".repeat(501))).toBe("备注不能超过500字符");
  });

  it("returns null for note at exactly 500 characters", () => {
    expect(validateNote("a".repeat(500))).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/utils/validation.test.ts`
Expected: FAIL with "validateNote is not exported"

- [ ] **Step 3: Write minimal implementation**

Add to `src/utils/validation.ts`:

```typescript
export function validateNote(value: string): string | null {
  const trimmed = value.trim();

  if (trimmed.length > 500) {
    return "备注不能超过500字符";
  }

  return null;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/utils/validation.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/validation.ts src/utils/validation.test.ts
git commit -m "feat(validation): add note validation"
```

---

### Task 6: Integrate validation into ProfilePopup

**Files:**
- Modify: `src/components/ProfilePopup/index.tsx`

- [ ] **Step 1: Add import and validation to handleSave**

In `src/components/ProfilePopup/index.tsx`, add import at top:

```typescript
import { validateNickname } from "../../utils/validation";
```

- [ ] **Step 2: Update handleSave function**

Replace the `handleSave` function:

```typescript
  const handleSave = async () => {
    if (saving) return;

    const nicknameError = validateNickname(currentNickname);
    if (nicknameError) {
      Taro.showToast({ title: nicknameError, icon: "none" });
      return;
    }

    setSaving(true);

    try {
      let avatarFileId = currentAvatar;

      // 如果有新选择的头像，先上传
      if (tempAvatarPath) {
        avatarFileId = await uploadAvatar(tempAvatarPath);
      }

      // 更新用户设置
      await updateUserSettings({
        nickname: currentNickname.trim(),
        avatar: avatarFileId,
      });

      onSave({
        nickname: currentNickname.trim(),
        avatar: avatarFileId,
      });

      Taro.showToast({ title: "保存成功", icon: "success" });
    } catch (error) {
      console.error("保存失败:", error);
      Taro.showToast({ title: "保存失败", icon: "none" });
    } finally {
      setSaving(false);
    }
  };
```

- [ ] **Step 3: Verify the change compiles**

Run: `pnpm build:weapp`
Expected: Build succeeds without errors

- [ ] **Step 4: Commit**

```bash
git add src/components/ProfilePopup/index.tsx
git commit -m "feat(profile): add nickname validation"
```

---

### Task 7: Integrate validation into meal/add

**Files:**
- Modify: `src/pages/meal/add/index.tsx`

- [ ] **Step 1: Add import**

In `src/pages/meal/add/index.tsx`, add import at top:

```typescript
import { validateFood } from "../../../utils/validation";
```

- [ ] **Step 2: Update handleManualAdd function**

Replace the `handleManualAdd` function:

```typescript
  const handleManualAdd = () => {
    const food = manualInput.trim();
    if (!food) {
      Taro.showToast({ title: "请输入食物名称", icon: "none" });
      return;
    }

    const error = validateFood(food);
    if (error) {
      Taro.showToast({ title: error, icon: "none" });
      return;
    }

    if (selectedFoods.includes(food)) {
      Taro.showToast({ title: "已添加该食物", icon: "none" });
      return;
    }
    setSelectedFoods([...selectedFoods, food]);
    setManualInput("");
    // 如果不在预设中，保存到自定义列表
    if (!ALL_PRESET_FOODS.has(food)) {
      saveCustomFood(food);
      setCustomFoods(getStoredCustomFoods());
    }
  };
```

- [ ] **Step 3: Verify the change compiles**

Run: `pnpm build:weapp`
Expected: Build succeeds without errors

- [ ] **Step 4: Commit**

```bash
git add src/pages/meal/add/index.tsx
git commit -m "feat(meal): add food name validation"
```

---

### Task 8: Integrate validation into symptom/add

**Files:**
- Modify: `src/pages/symptom/add/index.tsx`

- [ ] **Step 1: Add import**

In `src/pages/symptom/add/index.tsx`, add import at top:

```typescript
import { validateSymptom } from "../../../utils/validation";
```

- [ ] **Step 2: Update handleAddCustomSymptom function**

Replace the `handleAddCustomSymptom` function:

```typescript
  const handleAddCustomSymptom = () => {
    const trimmed = customSymptom.trim();
    if (!trimmed) return;

    const error = validateSymptom(trimmed);
    if (error) {
      Taro.showToast({ title: error, icon: "none" });
      return;
    }

    if (symptoms.includes(trimmed)) {
      Taro.showToast({ title: "已添加该症状", icon: "none" });
      return;
    }
    setSymptoms([...symptoms, trimmed]);
    setCustomSymptom("");
    // 保存到本地存储（如果不是预设的）
    if (!SYMPTOM_SHORTCUTS.includes(trimmed as (typeof SYMPTOM_SHORTCUTS)[number])) {
      saveCustomSymptom(trimmed);
      setSavedCustomSymptoms(getStoredCustomSymptoms());
    }
  };
```

- [ ] **Step 3: Verify the change compiles**

Run: `pnpm build:weapp`
Expected: Build succeeds without errors

- [ ] **Step 4: Commit**

```bash
git add src/pages/symptom/add/index.tsx
git commit -m "feat(symptom): add symptom name validation"
```

---

### Task 9: Integrate validation into medication/add

**Files:**
- Modify: `src/pages/medication/add/index.tsx`

- [ ] **Step 1: Add import**

In `src/pages/medication/add/index.tsx`, add import at top:

```typescript
import { validateMedication } from "../../../utils/validation";
```

- [ ] **Step 2: Update handleManualAdd function**

Replace the `handleManualAdd` function:

```typescript
  const handleManualAdd = () => {
    const medication = manualInput.trim();
    if (!medication) {
      Taro.showToast({ title: "请输入药物名称", icon: "none" });
      return;
    }

    const error = validateMedication(medication);
    if (error) {
      Taro.showToast({ title: error, icon: "none" });
      return;
    }

    setSelectedMedication(medication);
    setManualInput("");
    if (!ALL_PRESET_MEDICATIONS.has(medication)) {
      saveCustomMedication(medication);
      setCustomMedications(getStoredCustomMedications());
    }
  };
```

- [ ] **Step 3: Verify the change compiles**

Run: `pnpm build:weapp`
Expected: Build succeeds without errors

- [ ] **Step 4: Commit**

```bash
git add src/pages/medication/add/index.tsx
git commit -m "feat(medication): add medication name validation"
```

---

### Task 10: Run all tests and E2E verification

**Files:**
- None (verification only)

- [ ] **Step 1: Run all unit tests**

Run: `pnpm test`
Expected: All tests pass

- [ ] **Step 2: Run E2E tests**

Run: `pnpm test:e2e`
Expected: All E2E tests pass

- [ ] **Step 3: Manual verification (optional)**

Open WeChat DevTools and verify:
1. ProfilePopup rejects nickname with special characters
2. Meal add page rejects food names with @ or #
3. Symptom add page rejects symptoms with numbers
4. Medication add page rejects medication names with special characters

- [ ] **Step 4: Final commit if any fixes needed**

If any fixes were made during verification, commit them.
