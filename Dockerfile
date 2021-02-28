FROM node

COPY . /app

WORKDIR /app
RUN npm i
# RUN npx prisma generate

EXPOSE 3000

ENTRYPOINT [ "/bin/bash", "-c", "npm run build && npm run start" ]