FROM node:17-alpine3.12
WORKDIR /reactfrontend
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000