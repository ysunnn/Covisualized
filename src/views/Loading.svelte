<div class="loading">
	<span class="content">
		<span class="anim" />
		<span class="text">Loading Data...</span>
	</span>
</div>

<style>
	.loading {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		font-weight: bold;
	}

	.content {
		position: relative;
	}

	.text {
		position: relative;
	}

	.anim {
		--padding: 50%;
		--size: calc(100% + var(--padding) * 2);

		position: absolute;
		top: 50%;
		left: calc(var(--padding) * -1);
		width: var(--size);
		padding-top: var(--size);
		transform: translateY(-50%);
	}
	.anim::after,
	.anim::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background-color: hsl(var(--c-foreground-h), var(--c-foreground-s), 90%);
		animation: loader 2s ease-in-out infinite;
	}
	.anim::after {
		animation-delay: -1s;
	}

	@keyframes loader {
		0%, 100% {
			transform: scale(0);
			opacity: 1;
		}
		50% {
			transform: scale(1);
			opacity: 0;
		}
	}
</style>
