############################################################
# Dockerfile to build Meanbase
# Based on Ubuntu
############################################################

FROM codingfriend/meanbase


################## ESTABLISH DIRECTORIES ######################
RUN rm -rf /var/www/
WORKDIR /var/www/
COPY ./package.json /var/www/
RUN npm install
COPY . /var/www/
################## END DIRECTORIES ######################

# Expose the default port
EXPOSE 3030
VOLUME /var/www

CMD ["npm", "start"]
