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
  sudo mkdir /etc/nginx/ssl/
  sudo cp deployment/meanbase-config.conf /etc/nginx/
  #sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt
elif [[ "$OSTYPE" == "darwin"* ]]; then
  brew update
  brew install mongodb
  brew install graphicsmagick
  brew install node
  brew install nginx
  mkdir /usr/local/etc/nginx/
  sudo cp deployment/meanbase-config.conf /usr/local/etc/nginx/
  #sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /usr/local/etc/nginx/ssl/nginx.key -out /usr/local/etc/nginx/ssl/nginx.crt
elif [[ "$OSTYPE" == "win32" ]]; then
  choco install git
  choco install mongodb
  choco install graphicsmagick
  choco install nodejs
  choco install npm
  choco install nginx
else
  sudo add-apt-repository ppa:dhor/myway
  sudo apt-get update
  sudo apt-get install -y graphicsmagick
  sudo apt-get install -y nodejs
  sudo apt-get install -y git-core
  sudo apt-get install -y mongodb-org
  sudo apt-get install nginx
  sudo mkdir /etc/nginx/ssl/
  sudo cp deployment/meanbase-config.conf /etc/nginx/
  #sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt
fi

npm update -g npm
npm install mongoose express jade lodash multer winston passport karma karma-phantomjs-launcher supertest jsonwebtoken bower
npm install -g gulp
npm link gulp
npm install -g pm2
npm install
npm install bower -g
bower install
gulp install
gulp build
cd dist/
export NODE_ENV=production
#mongod --smallfiles
