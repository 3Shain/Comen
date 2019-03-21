FROM node:11.8-slim AS build
WORKDIR /app
COPY . /app
RUN ["npm","install"]
RUN ["npm","run","build:ssr:official"]

FROM node:11.8-slim AS final
WORKDIR /app
COPY --from=build /app/dist /app/dist
EXPOSE 4000
ENTRYPOINT ["node","dist/server"]