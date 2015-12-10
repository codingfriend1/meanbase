# Stop server
pm2 stop all;
sudo mongo 127.0.0.1/admin --eval "db.shutdownServer()";
sudo nginx -s quit

# Grab Updates
git pull
gulp build
cd dist/

# Start server
sudo mongod --smallfiles --fork --logpath /var/log/mongodb.log
pm2 start server/app.js
sudo nginx
