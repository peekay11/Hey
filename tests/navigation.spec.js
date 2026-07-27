import { test, expect } from '@playwright/test';

test.describe('Hey Navigation Flow', () => {
  test('should navigate through all main tabs successfully', async ({ page }) => {
    // Start at home
    await page.goto('http://localhost:5173/');
    
    // Verify we are on Home page
    await expect(page.locator('.feed-tabs')).toBeVisible();
    await expect(page.locator('text=Latest')).toBeVisible();
    
    // 1. Navigate to Discover
    await page.click('text=Discover');
    await expect(page).toHaveURL(/.*discover/);
    await expect(page.locator('text=Trending Topics')).toBeVisible();
    await expect(page.locator('text=Suggested For You')).toBeVisible();

    // 2. Navigate to Alerts
    await page.click('a[href="/alerts"]');
    await expect(page).toHaveURL(/.*alerts/);
    await expect(page.getByRole('heading', { name: 'Notifications' })).toBeVisible();

    // 3. Navigate to Saved
    await page.click('a[href="/saved"]');
    await expect(page).toHaveURL(/.*saved/);
    await expect(page.locator('text=Saved Posts')).toBeVisible();

    // 4. Navigate to Profile
    await page.click('a[href="/profile"]');
    await expect(page).toHaveURL(/.*profile/);
    await expect(page.locator('text=Paseka Dev').first()).toBeVisible();
    await expect(page.locator('text=Edit Profile')).toBeVisible();

    // 5. Test "Say Hey" Compose Modal flow
    await page.click('button:has-text("Say Hey")');
    // Ensure modal appears
    const composeBox = page.locator('textarea[placeholder="What\'s happening?"]');
    await expect(composeBox).toBeVisible();
    
    // Check our unerasable feature logic - it should have @Hey inside the box
    await expect(composeBox).toHaveValue(/@Hey/);

    // Type a new post
    await composeBox.fill('@Hey Playwright is awesome');
    
    // Click post button inside modal
    await page.getByRole('button', { name: 'Post', exact: true }).click();

    // Modal should close automatically after posting
    await expect(composeBox).not.toBeVisible();
  });
});
