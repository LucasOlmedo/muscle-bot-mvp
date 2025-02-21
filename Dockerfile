FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g expo-cli
RUN npm install --global @expo/ngrok
RUN npm install

COPY . .

EXPOSE 8081
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19006

CMD ["npx", "expo", "start", "--tunnel", "-c"]
