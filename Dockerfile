FROM node:alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV MONGO_URI=mongodb+srv://devansh:devanshmehta@cluster0.ehoc7ts.mongodb.net/?retryWrites=true&w=majority

CMD [ "npm", "run", "start" ]