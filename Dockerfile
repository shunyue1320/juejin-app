FROM node:10-alpine
ADD . /juejin
WORKDIR /juejin
EXPOSE 3000
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]
