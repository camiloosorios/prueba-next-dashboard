FROM node:18-alpine as build
WORKDIR /app
COPY package*.json .
RUN npm install --production
COPY . .
RUN npm run build

FROM node:18-alpine as production
WORKDIR /app
COPY --from=build /app/.next /app/.next
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json
EXPOSE 3000
CMD ["npm", "start"]