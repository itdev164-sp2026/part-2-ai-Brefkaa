import { test, expect } from '@playwright/test'

const testUserEmail = process.env.TEST_USER_EMAIL
const testUserPassword = process.env.TEST_USER_PASSWORD

test.describe('Authentication flow', () => {
    test('LOGIN PAGE VISIBLE: shows email and password inputs plus sign in button', async ({ page }) => {
        await page.goto('/login')

        await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible()
        await expect(page.getByLabel('Password')).toBeVisible()
        await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
    })

    test('REDIRECT AFTER LOGIN: successful login redirects to the dashboard or projects page', async ({ page }) => {
        test.skip(
            !testUserEmail || !testUserPassword,
            'Skipping login redirect test because TEST_USER_EMAIL or TEST_USER_PASSWORD is not set',
        )

        await page.goto('/login')

        await page.getByRole('textbox', { name: 'Email' }).fill(testUserEmail!)
        await page.getByLabel('Password').fill(testUserPassword!)

        await Promise.all([
            page.waitForURL(/^(?:.*(?:\/|\/projects))$/),
            page.getByRole('button', { name: /sign in/i }).click(),
        ])

        await expect(page).toHaveURL(/(?:\/|\/projects)$/)
    })

    test('SIDEBAR NAVIGATION: after login, overview, projects, and settings links are visible', async ({ page }) => {
        test.skip(
            !testUserEmail || !testUserPassword,
            'Skipping authenticated sidebar navigation test because TEST_USER_EMAIL or TEST_USER_PASSWORD is not set',
        )

        await page.goto('/login')

        await page.getByRole('textbox', { name: 'Email' }).fill(testUserEmail!)
        await page.getByLabel('Password').fill(testUserPassword!)
        await Promise.all([
            page.waitForURL(/^(?:.*(?:\/|\/projects))$/),
            page.getByRole('button', { name: /sign in/i }).click(),
        ])

        await expect(page.getByRole('link', { name: 'Overview' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Settings' })).toBeVisible()
    })
})
