FROM node:16
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
EXPOSE 3000
COPY . .
ENV DATABASE_URL=file:./dev.db
RUN npx prisma migrate dev
CMD ["npm", "run", "start:dev"]
