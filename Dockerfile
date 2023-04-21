# Pull node image from docker hub
FROM node:20-alpine

# Set working directory
RUN mkdir -p /var/www/test-colkie
WORKDIR /var/www/test-colkie

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /var/www/test-colkie/node_modules/.bin:$PATH

# create user with no password
RUN adduser --disabled-password colkie

# Copy existing application directory contents
COPY . /var/www/test-colkie

# install and cache app dependencies
COPY package.json /var/www/test-colkie/package.json
COPY package-lock.json /var/www/test-colkie/package-lock.json

# grant a permission to the application
RUN chown -R colkie:colkie /var/www/test-colkie
USER colkie

# clear application caching
RUN npm cache clean --force

# install all dependencies
RUN npm install

# expose port
EXPOSE 3004

# start application
CMD [ "npm", "run", "start:dev" ]