if [[ "$OSTYPE" == "linux-gnu" ]]; then
  sudo apt-get update
  sudo apt-get install -y graphicsmagick
  sudo apt-get install -y nodejs
  sudo apt-get install -y mongodb-org
  #git clone https://github.com/codingfriend1/meanbase-1.0.0.git
  #cd meanbase-1.0.0
  #mongod &
  #fg %1
elif [[ "$OSTYPE" == "darwin"* ]]; then
  if[["which brew" == "/usr/local/bin/brew"]]; then
    brew update
  else
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  fi
  brew install mongodb
  brew install graphicsmagick
  brew install node
elif [[ "$OSTYPE" == "cygwin" ]]; then
        # POSIX compatibility layer and Linux environment emulation for Windows
elif [[ "$OSTYPE" == "msys" ]]; then
        # Lightweight shell and GNU utilities compiled for Windows (part of MinGW)
elif [[ "$OSTYPE" == "win32" ]]; then
  choco install git
  choco install mongodb
  choco install graphicsmagick
  choco install nodejs
  choco install npm
  npm install bson

elif [[ "$OSTYPE" == "freebsd"* ]]; then
        # ...
else
        # Unknown.
fi

#/usr/local/lib/node_modules
git checkout dev
npm update -g npm
npm install mongoose express jade lodash multer winston passport karma karma-phantomjs-launcher supertest jsonwebtoken
npm install -g bower
npm install -g gulp
npm link gulp
npm install
gulp install
