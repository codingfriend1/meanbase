###Meanbase 1.0.0

Since a good CMS for the MEAN stack was not available I decided to begin building one myself. The CMS itself will be free as my way of thanking the open source web community for making all kinds awesome libraries for free. Thank you guys! Here's me giving back.

From the start it uses yeoman generator-angular-fullstack with authentication and authorization templates.
[https://github.com/DaftMonk/generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack) However it has been modified to use gulp instead of grunt.

A demo of the site in action can be seen at [https://meanbase-codingfriend.c9users.io/](https://meanbase-codingfriend.c9users.io/)

####Install
Install a package manager such as
	- [homebrew](http://brew.sh/) on mac
	- [chocolatey](https://chocolatey.org/) on windows.
- Install my repository
	- `git clone https://github.com/codingfriend1/meanbase-1.0.0.git`
- Move into the cloned folder
	- `cd meanbase-1.0.0`
- Change the root of the nginx config to this folder
	- `vim deployment/meanbase-config.conf`
- Set your app secret as an environment variable
	- `export APP_SECRET=your-secret`
- If on windows create the folder for the mongoDB databases and logs
	- `mkdir c:\data\db`
	- `mkdir c:\data\log`
- Run the setup.sh script, hit enter if prompted, and then make yourself a coffee
	- `. setup.sh`
- If you wish to run the production ready version run the update.sh script
	- `. update.sh`
- Whenever changes are made to the app running the update.sh will reinstall the latest version

####Run Development Mode
- Start Mongodb in one terminal or cmd
	- `mongod`
- Run the app from the meanbase-1.0.0 folder in another terminal or cmd
	- `gulp serve`
- See app
	- Open localhost:9000 in your browser
- Stop each with ctrl-c

###Stop Production Mode
- Stop pm2, mongoDB, and Nginx services
	- `pm2 stop all; sudo mongo 127.0.0.1/admin --eval "db.shutdownServer()"; sudo nginx -s quit`

####Gulp Commands
- gulp install
- gulp serve
- gulp build
- gulp serve-dist
- gulp test

####Meanbase has two main goals:
- To be self-explanitory and effecient for users
- To be fun and customizable for developers.

####Code Design Strategy
- Upon server startup and client-request-theme-change, the server reads the index.html file in server/views/ and adds the active theme's styles and scripts to it as well as passing in some global data for the cms to use. It then writes this concatination to client/index.html. When scripts and styles are added to the project gulp inserts them into server/views/index.html.
- Whenever a page is requested ui-router makes a call to the server to get the page data and the template path for the correct view to render. This allows pages to each use individual templates that your theme supports.
- cms/* routes are ignored by this template call.

####Contributers
- David Wible


##MIT LICENSE

Copyright 2013-2015 Jon Paul Miles codingfriend1@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
