FROM node:20-alpine

WORKDIR /app

COPY frontend/package.json ./package.json
COPY frontend/package-lock.json ./package-lock.json
RUN npm ci

COPY frontend ./

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
