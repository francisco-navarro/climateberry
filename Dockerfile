FROM node:slim

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PORT=8080

# Install app dependencies
COPY . /usr/src/app/
RUN cd /usr/src/app/
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]