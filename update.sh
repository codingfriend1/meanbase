# Stop server
sudo nginx -s quit; pm2 stop all; sudo mongo 127.0.0.1/admin --eval "db.shutdownServer()";

# Grab Updates
git pull
npm install
sudo bower install --allow-root --config.interactive=false
gulp build
gulp injectBuild
gulp build-themes

export NODE_ENV=production
# Start server
sudo mongod --smallfiles --fork --logpath /var/log/mongodb.log; pm2 start dist/server/app.js; sudo nginx
