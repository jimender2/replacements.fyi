import { render } from 'vitest-browser-svelte';
import { expect, test, vi, beforeEach } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import Autocomplete from './Autocomplete.svelte';
import { goto } from '$app/navigation';

vi.mock('$app/navigation', () => ({
	goto: vi.fn()
}));

vi.mock('$app/paths', () => ({
	resolve: (_path: string, params: Record<string, string>) => `/${params.package}`
}));

beforeEach(() => {
	vi.clearAllMocks();
});

const items = ['apple', 'apricot', 'banana', 'blueberry', 'cherry'];

test('renders an input with combobox role', () => {
	render(Autocomplete, { items });
	const input = page.getByRole('combobox');
	expect(input.element()).toBeTruthy();
});

test('typing filters and shows suggestions', async () => {
	render(Autocomplete, { items });
	const input = page.getByRole('combobox');
	await userEvent.click(input);
	await userEvent.keyboard('ap');
	await expect.element(page.getByRole('listbox')).toBeVisible();
	await expect.element(page.getByRole('option', { name: 'apple' })).toBeVisible();
	await expect.element(page.getByRole('option', { name: 'apricot' })).toBeVisible();
	expect(page.getByRole('option').elements()).toHaveLength(2);
});

test('ArrowDown/ArrowUp keyboard navigation', async () => {
	render(Autocomplete, { items });
	const input = page.getByRole('combobox');
	await userEvent.click(input);
	await userEvent.keyboard('b');
	await expect.element(page.getByRole('listbox')).toBeVisible();
	await userEvent.keyboard('{ArrowDown}');
	await expect
		.element(page.getByRole('option', { name: 'banana' }))
		.toHaveAttribute('aria-selected', 'true');
	await userEvent.keyboard('{ArrowDown}');
	await expect
		.element(page.getByRole('option', { name: 'blueberry' }))
		.toHaveAttribute('aria-selected', 'true');
	await userEvent.keyboard('{ArrowUp}');
	await expect
		.element(page.getByRole('option', { name: 'banana' }))
		.toHaveAttribute('aria-selected', 'true');
});

test('Enter navigates to the active item', async () => {
	render(Autocomplete, { items });
	const input = page.getByRole('combobox');
	await userEvent.click(input);
	await userEvent.keyboard('ch');
	await expect.element(page.getByRole('listbox')).toBeVisible();
	await userEvent.keyboard('{ArrowDown}');
	await userEvent.keyboard('{Enter}');
	expect(goto).toHaveBeenCalledWith('/cherry');
});

test('Escape closes the dropdown', async () => {
	render(Autocomplete, { items });
	const input = page.getByRole('combobox');
	await userEvent.click(input);
	await userEvent.keyboard('ap');
	await expect.element(page.getByRole('listbox')).toBeVisible();
	await userEvent.keyboard('{Escape}');
	expect(page.getByRole('listbox').elements()).toHaveLength(0);
});

test('exact match does not hide dropdown', async () => {
	render(Autocomplete, { items });
	const input = page.getByRole('combobox');
	await userEvent.click(input);
	await userEvent.keyboard('cherry');
	expect(page.getByRole('listbox').elements()).toHaveLength(1);
});

test('clicking a suggestion navigates to it', async () => {
	render(Autocomplete, { items });
	const input = page.getByRole('combobox');
	await userEvent.click(input);
	await userEvent.keyboard('bl');
	await expect.element(page.getByRole('listbox')).toBeVisible();
	await userEvent.click(page.getByRole('option', { name: 'blueberry' }));
	expect(goto).toHaveBeenCalledWith('/blueberry');
});
