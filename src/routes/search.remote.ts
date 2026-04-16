import { form } from '$app/server';
import { redirect } from '@sveltejs/kit';
import * as v from 'valibot';

export const search = form(
	v.object({
		package: v.string()
	}),
	async ({ package: package_name }) => {
		redirect(302, `/${encodeURIComponent(package_name)}`);
	}
);
