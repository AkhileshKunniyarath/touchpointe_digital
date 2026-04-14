# ─── Stage 1: Dependencies ───────────────────────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# ─── Stage 2: Builder ────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Receive build-time env vars from Coolify (set these in Coolify dashboard)
ARG MONGODB_URI
ARG MONGODB_DB_NAME
ARG MINIO_ENDPOINT
ARG MINIO_PORT
ARG MINIO_USE_SSL
ARG MINIO_ACCESS_KEY
ARG MINIO_SECRET_KEY
ARG MINIO_BUCKET
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG ADMIN_EMAIL
ARG ADMIN_PASSWORD
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_GA_ID

ENV MONGODB_URI=$MONGODB_URI
ENV MONGODB_DB_NAME=$MONGODB_DB_NAME
ENV MINIO_ENDPOINT=$MINIO_ENDPOINT
ENV MINIO_PORT=$MINIO_PORT
ENV MINIO_USE_SSL=$MINIO_USE_SSL
ENV MINIO_ACCESS_KEY=$MINIO_ACCESS_KEY
ENV MINIO_SECRET_KEY=$MINIO_SECRET_KEY
ENV MINIO_BUCKET=$MINIO_BUCKET
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV ADMIN_EMAIL=$ADMIN_EMAIL
ENV ADMIN_PASSWORD=$ADMIN_PASSWORD
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ─── Stage 3: Runner ─────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Standalone output copies only what's needed
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
