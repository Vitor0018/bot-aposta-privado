FROM node:20-alpine

WORKDIR /app

# Copy only nulla directory
COPY nulla ./nulla
WORKDIR /app/nulla

# Install dependencies
RUN npm ci --production

EXPOSE 4000

ENV NODE_ENV=production
CMD ["npm", "start"]
