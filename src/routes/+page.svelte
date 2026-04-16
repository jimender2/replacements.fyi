<script lang="ts">
	import { resolve } from '$app/paths';
	import { search } from './search.remote';

	const examples = ['is-number', 'left-pad', 'is-array', 'object-assign'];
</script>

<div class="page">
	<div class="container">
		<div class="title">
			<span class="namespace">mr</span>
			<span class="method">.e18e</span>
		</div>

		<p class="params">
			<span class="paren">(</span><span class="param">module_replacements</span><span class="paren"
				>)</span
			>
		</p>

		<p class="tagline">type a package name. we'll tell you what you don't need.</p>

		<form {...search} class="search-form">
			<input
				placeholder="e.g. is-number"
				autocomplete="off"
				spellcheck="false"
				{...search.fields.package.as('text')}
			/>
			<button type="submit" class="submit-btn" aria-label="Search">→</button>
		</form>

		<div class="examples">
			<span class="examples-header">// examples</span>
			<div class="examples-list">
				{#each examples as name (name)}
					<a href={resolve('/[package]', { package: name })}>· {name}</a>
				{/each}
			</div>
		</div>

		<a href="https://e18e.dev" class="powered-by" target="_blank" rel="noopener"
			>powered by e18e.dev</a
		>
	</div>
</div>

<style>
	.page {
		min-height: 100vh;
		font-family: 'IBM Plex Mono', 'SF Mono', 'Cascadia Code', Consolas, monospace;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.container {
		max-width: 480px;
		width: 100%;
		transform: translateY(-2rem);
	}

	.title {
		margin-bottom: 0.5rem;
	}

	.namespace {
		display: block;
		color: #94a3b8;
		font-size: 0.875rem;
		font-weight: 400;
		line-height: 1;
		margin-bottom: 0.125rem;
	}

	.method {
		display: block;
		color: #1e293b;
		font-size: 3.5rem;
		font-weight: 700;
		line-height: 1;
	}

	.params {
		margin: 0.75rem 0 0;
		font-size: 1rem;
	}

	.paren {
		color: #94a3b8;
	}

	.param {
		color: #059669;
	}

	.tagline {
		color: #64748b;
		font-size: 0.875rem;
		margin: 1.5rem 0 0;
		line-height: 1.5;
	}

	.search-form {
		display: flex;
		align-items: center;
		margin-top: 1.5rem;
		border: 1px solid #cbd5e1;
		border-radius: 6px;
		background: #fff;
		overflow: hidden;
		transition: border-color 0.15s;
	}

	.search-form:focus-within {
		border-color: #059669;
	}

	input {
		background: transparent;
		border: none;
		outline: none;
		color: #1e293b;
		font-family: inherit;
		font-size: 0.9375rem;
		width: 100%;
		padding: 0.625rem 0.75rem;
	}

	input::placeholder {
		color: #94a3b8;
	}

	.submit-btn {
		background: none;
		border: none;
		color: #059669;
		font-family: inherit;
		font-size: 1.125rem;
		padding: 0.625rem 0.75rem;
		cursor: pointer;
		flex-shrink: 0;
		line-height: 1;
	}

	.submit-btn:hover {
		color: #047857;
	}

	.examples {
		margin-top: 2rem;
	}

	.examples-header {
		color: #94a3b8;
		font-size: 0.8125rem;
		display: block;
		margin-bottom: 0.5rem;
	}

	.examples-list {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.examples-list a {
		color: #059669;
		text-decoration: none;
		font-size: 0.875rem;
		padding: 0.125rem 0;
	}

	.examples-list a:hover {
		text-decoration: underline;
	}

	.powered-by {
		display: block;
		margin-top: 3rem;
		color: #94a3b8;
		font-size: 0.75rem;
		text-decoration: none;
	}

	.powered-by:hover {
		text-decoration: underline;
	}
</style>
