###Meanbase 1.0.0

From the lessons I've learned working on meanbase and angular, I have decided to completely restructure meanbase. This is the starting template. From the start it uses yeoman generator-angular-fullstack with authentication and authorization templates.
[https://github.com/DaftMonk/generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack)

Since this version is currently not presentable, here is a link to demo of the old version.
[Youtube Meanbase Demo](http://youtu.be/tteztXru4eA)

This project was posted before was ready in order for collaboration to be available.

####Meanbase has two main goals:
- To be self-explanitory and effecient for users
- To be fun and customizable for developers. 

####Code Design Strategy
- Upon server startup and client-request-theme-change, the server reads the index.html file in server/views/ and adds the active theme's styles and scripts to it as well as passing in some global data for the cms to use. It then writes this concatination to client/index.html. When scripts and styles are added to the project grunt inserts them into server/views/index.html.
- Whenever a page is requested ui-router makes a call to the server to get the page data and the template path for the correct view to render. This allows pages to each use individual templates that your theme supports.
- cms/* routes are ignored by this template call.

####Users
- To login visit /login

####Install
Run
- mongod
- npm install
- bower install
- grunt serve


##MIT LICENSE

Copyright 2013-2015 Jon Paul Miles codingfriend1@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

