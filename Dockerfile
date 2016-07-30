############################################################
# Dockerfile to build Meanbase
# Based on Ubuntu
############################################################

FROM node:latest

# File Author / Maintainer
MAINTAINER Jon Paul Miles

################## INSTALL LIBRARIES ######################
RUN apt-get update
ENV NODE_ENV=production
RUN apt-get install -y graphicsmagick
RUN npm install pm2 -g
##################### LIBRARIES END #####################


################## ESTABLISH DIRECTORIES ######################
RUN rm -rf /var/www/
WORKDIR /var/www/
COPY dist/package.json /var/www/
RUN npm install
COPY dist/public/ /var/www/public/
COPY dist/server/ /var/www/server/
# RUN chmod -R 755 /var/www
################## END DIRECTORIES ######################

# Expose the default port
EXPOSE 8080
VOLUME /var/www

# CMD ["pm2", "start", "server/app.js", "--no-daemon"]
CMD ["node", "server/app.js"]
