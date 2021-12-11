# make sure context is the root of the whole repo!
FROM node:12-buster AS build
WORKDIR /app
COPY ./pnpm-lock.yaml /app
COPY ./package.json /app
COPY ./decorate-angular-cli.js /app
RUN curl -sL https://unpkg.com/@pnpm/self-installer | node
RUN ["pnpm","install"]
COPY . /app
RUN ["pnpx","nx","build","core","--prod"]
RUN ["pnpx","nx","build","node-backend","--prod"]

FROM node:12-alpine AS final
WORKDIR /app
# backend packages only
COPY --from=build /app/dist/apps/node-backend /app
COPY --from=build /app/pnpm-lock.yaml /app
RUN curl -sL https://unpkg.com/@pnpm/self-installer | node
RUN ["pnpm","install","--production"]
ENV PORT=4000
EXPOSE 4000
CMD ["node","main.js"]