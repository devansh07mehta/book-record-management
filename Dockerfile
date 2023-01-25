FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

ENV MONGO_URI=mongodb+srv://devansh:devanshmehta@cluster0.ehoc7ts.mongodb.net/?retryWrites=true&w=majority

CMD [ "npm", "run", "start" ]