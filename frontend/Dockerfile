FROM node:22-alpine AS base
WORKDIR /app

# ── Install dependencies ───────────────────────────────────────────────────────
FROM base AS deps
COPY package*.json ./
RUN npm install

# ── Build ─────────────────────────────────────────────────────────────────────
FROM deps AS builder
COPY . .
RUN npm run build

# ── Production image (Next.js standalone) ─────────────────────────────────────
FROM base AS runner
ENV NODE_ENV=production

# next.config.ts output: "standalone" bundles server + minimal node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy public assets if they exist
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
