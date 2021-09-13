FROM node:14 as build-deps

WORKDIR /usr/src/alunos-web

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-deps /usr/src/alunos-web/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]