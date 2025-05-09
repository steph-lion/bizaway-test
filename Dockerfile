FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Generate Prisma client before starting the application
RUN npx prisma generate
EXPOSE 3000
# Start the application in development mode. Otherwise, use "npm start" for production.
CMD ["npm", "run", "dev"]