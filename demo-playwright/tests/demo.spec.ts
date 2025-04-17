import { expect, test } from '@playwright/test';

test('adds frameworks', async ({ page }) => {
	await page.goto('http://localhost:4200/andere-frameworks');

	let locator = page.locator('table tbody tr');

	await expect(page.locator('table')).toBeVisible();

	await page.getByLabel('Naam:').fill('PlaySvelteeeee');
	await page.getByLabel('Rating:').fill('9');
	await page
		.getByLabel('Logo:')
		.fill(
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.thenewstack.io%2Fmedia%2F2021%2F09%2F9969f494-sveltelogo.png&f=1&nofb=1&ipt=64053b176296758872648093f764ae8afd49e6cba291ce57524bca3fcb6b3386'
		);
	let countBefore = await locator.count();
	await page.locator('form').getByRole('button').click();
	await page.getByLabel('Naam:').fill('PlaySvelteeeeeeee');
	await expect(locator).toHaveCount(countBefore + 1);
});
