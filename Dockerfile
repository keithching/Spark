FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# the PORT to expose
# PORT 4000 corresponds to the local machine only during development
EXPOSE 4000 

CMD ["npm", "start"]