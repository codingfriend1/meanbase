![Meanbase Logo](meanbase-logo.png?raw=true =200x)

A CMS built on the MEAN (MongoDB, Express, Angular, Node) stack and made to be simple and intuitive for users and developers.

See the documentation here
[meanbase docs](https://codingfriend1.gitbooks.io/meanbase/content/)

[meanbase.com](http://meanbase.com)


![Meanbase Screenshot](Meanbase-Frontend.png?raw=true "Meanbase Front End Screenshot")

#### Backend
![Meanbase Screenshot Backend](Meanbase-Themes-Page.png?raw=true "Meanbase Screenshot Backend Screenshot")


Meanbase is built on Mongo, Express, Angular, Node. This stack is superior to the outdated LAMP stack (Linux, Apache, MySQL, and PHP). It provides faster page loads using ajax with AngularJS, can handle more traffic at once through Node and Nginx, and has a more flexible api for interacting with data (Mongo, Express, and [Feathersjs](http://feathersjs.com/)).

### Special Thanks
I would also like to give special thanks to Natalie Gee for helping me work on the User Experience for the CMS. By putting herself into the user's shoes she was able to make many complicated features much easier.

## Why it exists

Meanbase provides a relationship between developers and their clients that allows developers to have full control over the code on their site and allows clients to easily manage content without the need for the developers help.


#### Easy for clients
Many popular CMS's struggle to be intuitive. Your clients are usually busy, they don't have the time or the motivation to learn a complicated CMS and you have to provide them training which wastes your time.

Meanbase has been user tested all along the way not by computer experts but by average users to insure they find the product enjoyable and easy.


#### Easy for developers
Building themes in for popular CMS's is confusing and you usually don't have a lot of flexibility. Meanbase is designed to allow you to take a theme from say [bootswatch.com](https://bootswatch.com/), add a few attributes and elements to it to make it dynamically load data, perhaps have an angular controller for extra functionality and then you have a usable template for your clients to manage. There's far less boilerplate code and the CMS elements largely stay out of the way of your html site.

#### Building the relationship
Now when a client asks for a site, you can have a customized template quickly available, and trust that they will know how to manage it without much training.

## Features

#### Good SEO
Meanbase provides a personal Prerender server for good SEO without having to pay the prerender service. If you want to use your own personal server set the environment variable in your `meanbase.env` to `PRERENDER_TOKEN=local`. Otherwise, set it to the token you received from prerender.io.

#### Automatic SSL.
Meanbase use Let's Encrypt to automatically provide SSL free for your application by just setting environment variables.

# Getting Started

### Setting up meanbase for development
Since we are working with node and npm make sure they are installed on your machine. There are several tutorials on the web for how to do that on your machine. If you're using mac, I recommend using [homebrew](http://brew.sh/)

#### Running locally
Make sure bower is installed globally  
```
npm i bower -g
```

Install [Docker](https://docs.docker.com/engine/installation/) on your machine (you need at least 4G of ram) and [docker-compose](https://docs.docker.com/compose/install/).

Install npm and bower modules by running   
```
npm run prepare
```

Finally start the server by running
```
npm run server
```

Open [localhost:3030](http://localhost:3030) in your browser

_NOTE: You can stop the server by hitting ctrl-c while in the terminal_

#### Making changes
If you want to update the app make sure to run watch so that your stylus, jade, and es8 files will be updated.

`npm run watch`

cancel with ctrl-c

### Deploying a meanbase instance
Meanbase uses docker. So you can
1. create a droplet on digitalocean.com
2. Choose the Docker Image
3. Upload your **passwordless** ssh key and begin working with meanbase. IE: `ssh-copy-id user@your-server-ip-address`

Create a file called `meanbase.env` in the root of meanbase. Don't share it with anyone or attach include it in your repo, this will contain your app secret for encrypting passwords and settings which should be kept secret.

#### Required Options
At a minimum this file needs
```
FEATHERS_AUTH_SECRET=your-app-secret
NODE_ENV=production
DATABASE_URL=mongodb://db/meanbase

# For free SSL with Let's Encrypt
DOMAINS=your-domain.com
EMAIL=your-email@your-address.com

# SSL Check frequency
CHECK_FREQ=30

# Prerender
PRERENDER_TOKEN=local
```

__Note: Setting the PRERENDER_TOKEN to local means you wish to use the personal prerender service running on your server. This means you can avoid the pricing in prerender.io but your server will use more memory. If you wish to use the prerender.io service at a price set it to your token you received from them.__

_NOTE: If you are running mongoDB locally the MongoDB server name must be **db** since in Docker that will refer to the MongoDB vm_

#### Additional Options
These variables are optional.

*If you do not specify an admin and admin pass then a default account with `admin@admin.com` and pass `admin` will be created for you.*
```
RESET_SEED=false
DOMAIN=your-domain.com
RESET_USERS=false
ADMIN="adminemail@admin.com"
ADMIN_PASS="admin_password"

# Prerender Options for lower memory
PRERENDER_NUM_WORKERS=1
PHANTOM_WORKER_ITERATIONS=3
```

Reset seed will reset all your data to default data each time the server restarts. Reset users will just do that for users.


#### npm run compile
Now we want to compile all our es8, jade, stylus, combine them into 1 file and build our **dist** folder.

```
npm run compile
```

*NOTE: Makes sure you can make password-less ssh into your host server.*

#### Connect to your docker server instance
Now we must tell docker that we want to interact with your live server. We create a new Docker Machine instance passing in the IP of our server.
```
docker-machine create --driver generic --generic-ip-address=your-server-ip-address your-custom-machine-name
```

Then we point our terminal to it.
```
eval $(docker-machine env you-custom-machine-name)
```

#### Deployment
Finally we upload our dist folder to the server and have it install production dependencies. if your running the personal prerender server set the `PRERENDER_TOKEN` variable in your `meanbase.env` to local and run:

```
npm run production-prerender
```

Otherwise if you want to not run the personal prerender service just use

```
npm run production
```

_NOTE: Parts of the theme are still in development such as cropping and editing images, but for now you can edit locally and then upload._

## MIT LICENSE

Copyright 2013-2017 Jon Paul Miles codingfriend1@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
