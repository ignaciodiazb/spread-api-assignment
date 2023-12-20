FROM node:18.17.1-bullseye-slim
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --only=production
RUN npm run build
EXPOSE 3000
USER node
CMD ["npm", "run", "start:prod"]