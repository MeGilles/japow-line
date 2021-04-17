FROM node

# COPY . /app

# WORKDIR /app
# RUN npm i
# RUN npx prisma generate
# RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]