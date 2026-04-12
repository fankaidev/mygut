# E2E Tests for TabBar Layout

## Overview

Rewrite E2E tests for the new TabBar navigation structure. Tests cover happy paths only, verifying actual data creation in the cloud database.

## Test Files

| File | Purpose |
|------|---------|
| `e2e/setup.ts` | Shared helpers (keep existing) |
| `e2e/home.test.ts` | Home page quick action navigation |
| `e2e/records.test.ts` | Records page date switching and cards |
| `e2e/settings.test.ts` | Settings page profile display |
| `e2e/record-flows.test.ts` | All 4 record creation flows |

Old files to delete: `meal.test.ts`, `stool.test.ts`, `symptom.test.ts`, `medication.test.ts`

## Test Cases

### home.test.ts

1. **Load home page** - Navigate via TabBar, verify page loads
2. **Quick action: 体感** - Tap button, verify navigates to `/pages/symptom/add/index`
3. **Quick action: 饮食** - Tap button, verify navigates to `/pages/meal/add/index`
4. **Quick action: 排便** - Tap button, verify navigates to `/pages/stool/add/index`
5. **Quick action: 用药** - Tap button, verify navigates to `/pages/medication/add/index`

### records.test.ts

1. **Load records page** - Navigate via TabBar, verify page loads
2. **Display record cards** - Verify 4 cards present (体感/用药/饮食/排便)
3. **Date navigation: prev** - Tap ◀, verify date decrements
4. **Date navigation: next** - Tap ▶, verify date increments (disabled on today)

### settings.test.ts

1. **Load settings page** - Navigate via TabBar, verify page loads
2. **Display profile** - Verify avatar area and nickname displayed

### record-flows.test.ts

Each flow: navigate to add page → fill form → submit → verify record appears on records page.

#### Symptom Flow
1. Navigate to `/pages/symptom/add/index`
2. Select overall feeling (tap one of 5 emoji options)
3. Tap submit button
4. Verify redirect/success
5. Go to records page, verify 体感 card shows new record

#### Meal Flow
1. Navigate to `/pages/meal/add/index`
2. Select a food item from grid
3. Tap submit button
4. Verify redirect/success
5. Go to records page, verify 饮食 card shows new record

#### Stool Flow
1. Navigate to `/pages/stool/add/index`
2. Select Bristol type (tap one of 7 options)
3. Tap submit button
4. Verify redirect/success
5. Go to records page, verify 排便 card shows new record

#### Medication Flow
1. Navigate to `/pages/medication/add/index`
2. Select a medication from grid
3. Tap submit button
4. Verify redirect/success
5. Go to records page, verify 用药 card shows new record

## Shared Test Pattern

```typescript
// Each test file follows this pattern
describe("Page Tests", () => {
  let miniProgram: MiniProgram;
  let page: Page;

  beforeAll(async () => {
    miniProgram = await automator.launch({
      projectPath: path.resolve(__dirname, "../dist"),
    });
    setMiniProgram(miniProgram);
    // Setup console error listener
  });

  afterAll(async () => {
    await miniProgram?.close();
    setMiniProgram(null);
  });

  afterEach(() => {
    // Fail on console errors
  });

  // Tests...
});
```

## Data Isolation

Tests use `TARO_APP_ENV=e2e` which sets a fixed test user ID (`e2e_test_user`) to avoid polluting real user data. Tests run against real cloud database.

## Selectors Reference

### Home Page
- Quick action buttons: `.action-item` (4 items, order: 体感/饮食/排便/用药)

### Records Page
- Date arrows: `.date-arrow` (prev, next)
- Date text: `.date-text`
- Record cards: `.record-card` (4 cards)
- Card count: `.card-count`
- Empty hint: `.empty-hint`

### Settings Page
- Profile section: `.profile-section`
- Nickname: `.profile-nickname`
- Avatar: `.profile-avatar`

### Add Pages (shared)
- Submit button: `.submit-btn`
- Section title: `.section-title`

### Symptom Add
- Feeling options: `.feeling-item` (5 items)

### Meal Add
- Food items: `.food-item`
- Selected foods: `.selected-food-tag`

### Stool Add
- Bristol options: `.bristol-item` (7 items)

### Medication Add
- Medication items: `.medication-item`
