FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY nulla ./nulla
WORKDIR /app/nulla
RUN npm ci

EXPOSE 4000

ENV NODE_ENV=production
CMD ["npm", "start"]
