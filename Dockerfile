FROM node:12-buster AS build
WORKDIR /app
COPY . /app
RUN ["npm","install"]
RUN ["npx","nx","build","core","--prod"]
RUN ["npx","nx","build","api","--prod"]

FROM node:12-alpine AS final
WORKDIR /app
# backend packages only
COPY --from=build /app/package.json /app
COPY --from=build /app/dist /app/dist
RUN ["npm","install","--production"]
ENV PORT=4000
EXPOSE 4000
CMD ["node","dist/apps/api/main.js"]