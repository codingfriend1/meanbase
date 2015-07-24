// Generated on 2015-03-15 using generator-angular-fullstack 2.0.13
'use strict';

module.exports = function (grunt) {
  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch(e) {
    localConfig = {};
  }

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn',
    protractor: 'grunt-protractor-runner',
    injector: 'grunt-asset-injector',
    buildcontrol: 'grunt-build-control'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    pkg: grunt.file.readJSON('package.json'),
    yeoman: {
      // configurable paths
      client: require('./bower.json').appPath || 'client',
      dist: 'dist'
    },

    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },
    watch: {
      injectJS: {
        files: [
          '<%= yeoman.client %>/{app,components}/**/*.js',
          '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
          '!<%= yeoman.client %>/{app,components}/**/*.mock.js',
          '!<%= yeoman.client %>/app/app.js'],
        tasks: ['injector:scripts']
      },
      injectCss: {
        files: [
          '<%= yeoman.client %>/{app,components}/**/*.css'
        ],
        tasks: ['injector:css']
      },
      compileThemeAssets: {
        files: [
          '<%= yeoman.client %>/themes/**/*.css',
          '<%= yeoman.client %>/themes/**/*.js',
          '<%= yeoman.client %>/themes/**/*.styl',
          '!<%= yeoman.client %>/themes/**/theme.css'
        ],
        tasks: ['compile-theme-assets']
      },
      mochaTest: {
        files: ['server/**/*.spec.js'],
        tasks: ['env:test', 'mochaTest']
      },
      jsTest: {
        files: [
          '<%= yeoman.client %>/{app,components}/**/*.spec.js',
          '<%= yeoman.client %>/{app,components}/**/*.mock.js'
        ],
        tasks: ['newer:jshint:all', 'karma']
      },
      injectStylus: {
        files: [
          '<%= yeoman.client %>/{app,components}/**/*.styl'],
        tasks: ['injector:stylus']
      },
      stylus: {
        files: [
          '<%= yeoman.client %>/{app,components}/**/*.styl'],
        tasks: ['stylus:cms', 'autoprefixer']
      },
      jade: {
        files: [
          '<%= yeoman.client %>/{app,components,themes,extensions}/*',
          '<%= yeoman.client %>/{app,components,themes,extensions}/**/*.jade'],
        tasks: ['jade']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.css',
          '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.html',
          '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
          '!{.tmp,<%= yeoman.client %>}{app,components}/**/*.spec.js',
          '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js',
          '<%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: true
        }
      },
      express: {
        files: [
          'server/**/*.{js,json}'
        ],
        tasks: ['express:dev', 'wait'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },

    docker: {
      options: {
        // These options are applied to all tasks 
      },
      app: {
        // Specify `src` and `dest` directly on the task object 
        src: [
          'client/app/**/*.js',
          'client/components/meanbase-editable/*.js',
          'client/components/endpoints/*.js',
          'client/components/helpers/*.js',
          'client/components/cms.headbar/*.js',
          'server/components/DAO/index.js',
          'server/components/index/index.js',
          '!**/*spec.js'
        ],
        dest: 'code-documentation/',
        options: {
          onlyUpdated: true
        }
      }
    },

    // Docco
    docco: {
      debug: {
        src: [
          'client/app/**/*.js',
          'client/components/meanbase-editable/*.js',
          'client/components/endpoints/*.js',
          'client/components/helpers/*.js',
          'client/components/cms.headbar/*.js',
          'server/components/DAO/index.js',
          'server/components/index/index.js',
          '!**/*spec.js'
        ],
        options: {
          output: 'documentation/'
        }
      }
    },


    // Debugging with node inspector
    'node-inspector': {
      custom: {
        options: {
          'web-host': 'localhost'
        }
      }
    },

    // Use nodemon to run server in debug mode with an initial breakpoint
    nodemon: {
      debug: {
        script: 'server/app.js',
        options: {
          nodeArgs: ['--debug-brk'],
          env: {
            PORT: process.env.PORT || 9000
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              setTimeout(function () {
                require('open')('http://localhost:8080/debug?port=5858');
              }, 500);
            });
          }
        }
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      target: {
        src: 'server/views/index.html',
      
        ignorePath: ['../../client/'],
        exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/', /bootstrap.css/, /font-awesome.css/ ]
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/public/{,*/}*.js',
            '<%= yeoman.dist %>/public/{,*/}*.css',
            '<%= yeoman.dist %>/public/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/public/assets/fonts/*'
          ]
        }
      }
    },


    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/server/views/*.html']
      }
    },


    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        connectCommits: false,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      heroku: {
        options: {
          remote: 'heroku',
          branch: 'master'
        }
      },
      openshift: {
        options: {
          remote: 'openshift',
          branch: 'master'
        }
      }
    },


    // Test settings
      // Karma, MochaTest and Protractor tasks are in grunt/testing.js


    env: {
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      },
      all: localConfig
    },

  });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  // Load tasks from the grunt folder
  require('load-grunt-tasks')(grunt);


  // Add link each theme's assets into main file.
  grunt.registerTask("compile-theme-assets", "Combine javascript and css files in each theme info scripts.html and styles.html", function() {

    // loop through each theme in the themes folder
    grunt.file.expand("client/themes/*").forEach(function (dir) {

      var injector = grunt.config.get('injector') || {options: {}, scripts: {options:{}}, css: {}};
      var stylus = grunt.config.get('stylus') || {};

      injector.css.files[dir + '/assets/styles.html'] = [
        dir + '/**/*.css',
        dir + '/*.css'
      ];

      injector.scripts.files[dir + '/assets/scripts.html'] = [
        dir + '/**/*.js',
        dir + '/*.js',
        '!' + dir + '/*spec.js',
        '!' + dir + '/**/*spec.js'
      ];

      if(!stylus.theme) {
        stylus.theme = {files: {}, option: {
          starttag: '/* theme css */',
          endtag: '/* theme css */'
        }};
      }
      // console.log('stylus.theme', stylus.cms);

      // Combine all theme stylus files into theme.css
      stylus.theme.files[dir + '/assets/theme.css'] = [
        dir + '/**/*.styl',
        // dir + '/**/*.css',
        '!' + dir + '/assets/theme.css',
        '!' + dir + '/assets/theme.styl'
      ];

      grunt.config.set('injector', injector);
      grunt.config.set('stylus', stylus);
    });
    grunt.task.run('injector');
    grunt.task.run('stylus:theme');
  });






  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'wait', 'open', 'express-keepalive']);
    }

    if (target === 'debug') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'injector:stylus', 
        'concurrent:server',
        'injector',
        'wiredep',
        'autoprefixer',
        'concurrent:debug'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'env:all',
      'injector:stylus', 
      'concurrent:server',
      'injector',
      'wiredep',
      'autoprefixer',
      'express:dev',
      'compile-theme-assets',
      'wait',
      // 'open',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', function(target) {
    if (target === 'server') {
      return grunt.task.run([
        'env:all',
        'env:test',
        'mochaTest'
      ]);
    }

    else if (target === 'client') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'injector:stylus', 
        'concurrent:test',
        'injector',
        'autoprefixer',
        'karma'
      ]);
    }

    else if (target === 'e2e') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'env:test',
        'injector:stylus', 
        'concurrent:test',
        'injector',
        'wiredep',
        'autoprefixer',
        'express:dev',
        'protractor'
      ]);
    }

    else grunt.task.run([
      'test:server',
      'test:client'
    ]);
  });

  grunt.registerTask('build', [
    'docco',
    'clean:dist',
    'injector:stylus', 
    'concurrent:dist',
    'injector',
    'wiredep',
    'useminPrepare',
    'autoprefixer',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
