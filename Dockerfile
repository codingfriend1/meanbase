############################################################
# Dockerfile to build Meanbase
# Based on Ubuntu
############################################################

FROM codingfriend/meanbase


################## ESTABLISH DIRECTORIES ######################
RUN rm -rf /var/www/
WORKDIR /var/www/
COPY dist/package.json /var/www/
RUN npm install
COPY dist/ /var/www/
# RUN chmod -R 755 /var/www
################## END DIRECTORIES ######################

# Expose the default port
EXPOSE 8080
VOLUME /var/www

# CMD ["pm2", "start", "src", "--no-daemon"]
CMD ["node", "app"]
