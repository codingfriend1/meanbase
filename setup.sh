if [[ "$OSTYPE" == "linux-gnu" ]]; then
  sudo apt-get update
  sudo apt-get install -y graphicsmagick
  sudo apt-get install -y nodejs
  sudo apt-get install git-core
  sudo apt-get install -y mongodb-org
  #git clone https://github.com/codingfriend1/meanbase-1.0.0.git
  #cd meanbase-1.0.0
  #mongod &
  #fg %1
elif [[ "$OSTYPE" == "darwin"* ]]; then
  # ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  brew update
  brew install mongodb
  brew install graphicsmagick
  brew install node
elif [[ "$OSTYPE" == "win32" ]]; then
  # @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
  choco install git
  choco install mongodb
  choco install graphicsmagick
  choco install nodejs
  choco install npm
  npm install bson
else
  sudo apt-get update
  sudo apt-get install -y graphicsmagick
  sudo apt-get install -y nodejs
  sudo apt-get install git-core
  sudo apt-get install -y mongodb-org
fi

#/usr/local/lib/node_modules
git checkout dev
npm update -g npm
npm install mongoose express jade lodash multer winston passport karma karma-phantomjs-launcher supertest jsonwebtoken
npm install -g bower
npm install -g gulp
npm link gulp
npm install
bower install -y
gulp install
