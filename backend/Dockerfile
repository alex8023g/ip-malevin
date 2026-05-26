FROM node:24 AS base
WORKDIR /app

# ── Install all deps (including dev for build tools) ──────────────────────────
FROM base AS deps
COPY package*.json ./
RUN npm install

# ── Build ─────────────────────────────────────────────────────────────────────
FROM deps AS builder
COPY . .
RUN npx prisma generate
RUN npm run build \
  && echo "Build output:" && ls -la dist/src/ \
  && test -f dist/src/main.js || (echo "ERROR: dist/src/main.js was not produced" && exit 1)

# ── Production image ──────────────────────────────────────────────────────────
FROM base AS runner
ENV NODE_ENV=production

# Copy node_modules (prisma CLI + ts-node needed for migrate deploy)
COPY --from=deps /app/node_modules ./node_modules

# Copy compiled app
COPY --from=builder /app/dist ./dist

# Copy generated Prisma client
COPY --from=builder /app/generated ./generated

# Copy Prisma schema, migrations and config
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

COPY package*.json ./

EXPOSE 3001

# Run migrations then start the server
CMD ["sh", "-c", "npx prisma migrate deploy && npm run prisma:seed && node dist/src/main"]
