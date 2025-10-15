# Repository Guidelines

## Project Structure & Module Organization
Documentation routes live in `pages/`, primarily MDX files that map directly to site paths. Shared React building blocks belong in `components/`. Static art, models, and shaders live in `assets/`. Global Tailwind layers and utilities stay in `styles/`. Customize navigation, theming, and sidebar behavior through `theme.config.tsx`. Middleware such as redirects sits in `middleware.ts`, so treat it as the entry-point for request-time logic.

## Build, Test, and Development Commands
Install dependencies once with `pnpm install`. Run `pnpm dev` for a local Next.js server on port 3000. Use `pnpm build` to produce the production bundle that Vercel also runs. Verify the prebuilt output with `pnpm start`. When adjusting Three.js shaders, rebuild after edits to ensure GLSL assets recompile cleanly.

## Coding Style & Naming Conventions
Author React components in TypeScript with 2-space indentation and PascalCase filenames (e.g., `HeroCanvas.tsx`). Place MDX content under `pages/` using kebab-case folder names to match URLs. Co-locate supporting helpers or styles alongside the component they serve. Keep Tailwind class lists orderly and prefer semantic utility groups (`layout`, `color`, `effects`). Run `pnpm dev` while editing to catch type-check feedback from Next.js.

## Testing Guidelines
The template ships without automated tests, but new features should include component-level coverage using React Testing Library or integration checks via Playwright. Name test files `<Component>.test.tsx` and place them adjacent to the code. Always validate visual updates manually in the local dev server before opening a pull request.

## Commit & Pull Request Guidelines
Follow the existing Conventional Commit pattern (`feat(pages): ...`, `fix(styles): ...`) and keep messages present tense and under 72 characters. Scope your pull requests narrowly, summarize changes in one concise paragraph, link the relevant issue or Linear ticket, and attach before/after screenshots or screen recordings for UI work, especially when modifying MDX documentation or Three.js scenes. Confirm `pnpm build` completes locally before requesting review.
