sudo apt-get update
sudo apt-get install -y graphicsmagick
sudo apt-get install -y nodejs
npm update -g npm
sudo apt-get install -y mongodb-org
npm install -g bower
npm install -g gulp
git clone https://github.com/codingfriend1/meanbase-1.0.0.git
cd meanbase-1.0.0
git checkout dev
npm install --verbose
gulp install
mongod &
fg %1


npm install --save-dev orchestrator vinyl replace-ext chalk dateformat has-gulplog lodash.template lodash._reescape lodash._reevaluate
