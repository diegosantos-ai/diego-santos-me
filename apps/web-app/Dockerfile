# ==============================================================================
# STAGE 1: Instalação de Dependências
# ==============================================================================
FROM node:20-alpine AS deps
WORKDIR /app/apps/web-app

COPY apps/web-app/package.json apps/web-app/package-lock.json ./
RUN npm ci --ignore-scripts

# ==============================================================================
# STAGE 2: Build da Aplicação
# ==============================================================================
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/apps/web-app/node_modules ./apps/web-app/node_modules
COPY apps/web-app ./apps/web-app
COPY content ./content

WORKDIR /app/apps/web-app
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ==============================================================================
# STAGE 3: Runtime Enxuto (Standalone)
# ==============================================================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache wget && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/content ./content
COPY --from=builder /app/apps/web-app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web-app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web-app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
