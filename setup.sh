#git clone https://github.com/codingfriend1/meanbase-1.0.0.git
#cd meanbase-1.0.0

## ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

## @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

if [[ "$OSTYPE" == "linux-gnu" ]]; then
  sudo add-apt-repository ppa:dhor/myway
  sudo apt-get update
  sudo apt-get install -y graphicsmagick
  sudo apt-get install -y nodejs
  sudo apt-get install -y git-core
  sudo apt-get install -y mongodb-org
  sudo apt-get install nginx
elif [[ "$OSTYPE" == "darwin"* ]]; then
  brew update
  brew install mongodb
  brew install graphicsmagick
  brew install node
  brew install nginx
elif [[ "$OSTYPE" == "win32" ]]; then
  choco install git
  choco install mongodb
  choco install graphicsmagick
  choco install nodejs
  choco install npm
  choco install nginx
  npm install bson
else
  sudo add-apt-repository ppa:dhor/myway
  sudo apt-get update
  sudo apt-get install -y graphicsmagick
  sudo apt-get install -y nodejs
  sudo apt-get install git-core
  sudo apt-get install -y mongodb-org
fi

#/usr/local/lib/node_modules
sudo mkdir /etc/nginx/ssl
npm update -g npm
npm install mongoose express jade lodash multer winston passport karma karma-phantomjs-launcher supertest jsonwebtoken
npm install -g gulp
npm install -g nodemon
npm link gulp
npm install
npm install bower -g
bower install --force-latest
gulp install
gulp build
cd dist/
export NODE_ENV=production
#mongod --smallfiles
