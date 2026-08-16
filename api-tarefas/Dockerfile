FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

RUN mkdir -p dist/generated/prisma
RUN cp -R src/generated/prisma/client dist/generated/prisma/

EXPOSE 3333

CMD ["node", "dist/server.js"]