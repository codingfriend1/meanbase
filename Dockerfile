############################################################
# Dockerfile to build Meanbase
# Based on Ubuntu
############################################################

FROM codingfriend/meanbase

RUN npm install --global npm-install-que

################## ESTABLISH DIRECTORIES ######################
RUN rm -rf /var/www/
WORKDIR /var/www/
# COPY dist/package.json /var/www/
ENV NODE_ENV=production
# RUN npm-install-que --production
# RUN npm config set jobs 1
# RUN npm install feathers express passport prerender-node
# RUN npm install
COPY dist/ /var/www/
################## END DIRECTORIES ######################

# Expose the default port
EXPOSE 8080
VOLUME /var/www

# CMD ["pm2", "start", "src", "--no-daemon"]
CMD ["pm2", "start", "src", "--no-daemon"]
