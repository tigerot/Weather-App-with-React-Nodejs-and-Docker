FROM node:17-alpine3.12
WORKDIR /NodeBackEnd
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 5000