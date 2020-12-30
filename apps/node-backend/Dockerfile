# make sure context is the root of the whole repo!
FROM node:12-buster AS build
WORKDIR /app
COPY ./package-lock.json /app
COPY ./package.json /app
COPY ./decorate-angular-cli.js /app
RUN ["npm","install","--unsafe-perm"]
COPY . /app
RUN ["npx","nx","build","node-backend","--prod"]
RUN ["npx","nx","build","core","--prod"]

FROM node:12-alpine AS final
WORKDIR /app
# backend packages only
COPY --from=build /app/dist/apps/node-backend/package.json /app
COPY --from=build /app/package-lock.json /app
COPY --from=build /app/dist /app/dist
RUN ["npm","install","--production"]
ENV PORT=4000
EXPOSE 4000
CMD ["node","dist/apps/node-backend/main.js"]