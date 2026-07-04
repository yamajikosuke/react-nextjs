# react-nextjs

Next.js 15 / React 19 / TypeScript をベースに、以下を含む初期構成です。

- UI: MUI, Emotion, Wijmo, MUI X
- 状態管理: Zustand
- データ取得: TanStack React Query, Axios
- フォーム: React Hook Form, Zod
- 認証: NextAuth.js
- API連携: OpenAPI Generator, Swagger
- テスト: Vitest, Testing Library, Playwright, MSW
- 品質管理: ESLint, Prettier, Husky, lint-staged

## Scripts

- `npm run dev` - Next.js 開発サーバー
- `npm run build` - 本番ビルド
- `npm run lint` - ESLint
- `npm run test` - Vitest
- `npm run test:e2e` - Playwright
- `npm run openapi:validate` - OpenAPI 定義の検証
- `npm run openapi:generate` - OpenAPI クライアント生成

## Setup

```bash
npm install
npm run prepare
```
