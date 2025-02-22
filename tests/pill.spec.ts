import { test, expect } from '@playwright/test';
import { waitForCustomEvent } from './lib/helper.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/playground/pill-test.html');
});

test('Renders text within the pill if a value attribute is specified', async ({
  page,
}) => {
  await expect(page.getByTestId('pill-value')).toBeVisible();
  await expect(page.getByTestId('pill-value')).toContainText('one');
});

test('Renders a removable button if no removable attribute has been specified', async ({
  page,
}) => {
  const testDefault = page.getByTestId('pill-default');

  await expect(testDefault).toBeVisible();
  await expect(testDefault.getByRole('button')).toBeVisible();
});

test('Renders a removable button if a removable attribute has been specified as true', async ({
  page,
}) => {
  await expect(page.getByTestId('pill-removable-true')).toBeVisible();
  await expect(
    page.getByTestId('pill-removable-true').getByRole('button')
  ).toBeVisible();
});

test('Renders no removable button if a removable attribute has been specified as false', async ({
  page,
}) => {
  await expect(page.getByTestId('pill-removable-false')).toBeVisible();
  await expect(
    page.getByTestId('pill-removable-false').getByRole('button')
  ).toHaveCount(0);
});

test('Renders a normal pill that is not readonly if no readonly attribute has been specified', async ({
  page,
}) => {
  const testDefault = page.getByTestId('pill-default');

  await expect(testDefault).toBeVisible();
  await expect(testDefault.getByRole('button')).toBeVisible();
});

test('Renders a pill that is readonly if a readonly attribute of true has been specified', async ({
  page,
}) => {
  await expect(page.getByTestId('pill-readonly-true')).toBeVisible();
  await expect(
    page.getByTestId('pill-readonly-true').locator('div')
  ).toHaveAttribute('aria-readonly', 'true');
});

test('Renders a pill that is not readonly if a readonly attribute of false has been specified', async ({
  page,
}) => {
  await expect(page.getByTestId('pill-readonly-false')).toBeVisible();
  await expect(
    page.getByTestId('pill-readonly-false').getByRole('button')
  ).toBeVisible();
  await expect(page.getByTestId('pill-readonly-false')).not.toHaveAttribute(
    'aria-readonly',
    'true'
  );
});

test('Renders a normal pill if no disabled attribute has been specified', async ({
  page,
}) => {
  const testDefault = page.getByTestId('pill-default');

  await expect(testDefault).toBeVisible();
});

test('Renders a disabled pill if a disabled attribute of true has been specified', async ({
  page,
}) => {
  await expect(
    page.getByTestId('pill-disabled-true').locator('div')
  ).toHaveAttribute('aria-disabled', 'true');
});

test('Renders a normal pill if a disabled attribute of false has been specified', async ({
  page,
}) => {
  await expect(page.getByTestId('pill-disabled-false')).toBeVisible();
  await expect(
    page.getByTestId('pill-disabled-false').locator('div')
  ).not.toHaveAttribute('aria-readonly', 'true');
});

test('Confirms default pill is clickable', async ({ page }) => {
  const testDefault = page.getByTestId('pill-default');

  const removeEvent = waitForCustomEvent(page, 'remove');
  await testDefault.getByRole('button').click();
  await removeEvent.detail();
});

test('Confirms disbled pill is not clickable', async ({ page }) => {
  const removeEvent = waitForCustomEvent(page, 'remove');
  await page
    .getByTestId('pill-disabled-true')
    .getByRole('button')
    .press('Enter');
  await expect(removeEvent.didNotOccur()).resolves.toBe(true);
});

test('Confirms readonly pill is not clickable', async ({ page }) => {
  const removeEvent = waitForCustomEvent(page, 'remove');
  await page
    .getByTestId('pill-readonly-true')
    .getByRole('button')
    .press('Enter');
  await expect(removeEvent.didNotOccur()).resolves.toBe(true);
});

test('Confirms keydown enter is effective on the default pill', async ({
  page,
}) => {
  const testDefault = page.getByTestId('pill-default');

  const removeEvent = waitForCustomEvent(page, 'remove');
  await testDefault.getByRole('button').press('Enter');
  await removeEvent.detail();
});

test('Confirms keydown enter is not effective on the disabled pill', async ({
  page,
}) => {
  const removeEvent = waitForCustomEvent(page, 'remove');
  await page
    .getByTestId('pill-disabled-true')
    .getByRole('button')
    .press('Enter');
  await expect(removeEvent.didNotOccur()).resolves.toBe(true);
});

test('Confirms keydown enter is effective on the readonly pill', async ({
  page,
}) => {
  const removeEvent = waitForCustomEvent(page, 'remove');
  await page
    .getByTestId('pill-readonly-true')
    .getByRole('button')
    .press('Enter');
  await expect(removeEvent.didNotOccur()).resolves.toBe(true);
});
