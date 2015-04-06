'use strict';

module.exports = function (grunt)
{
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig
  ({
    pkg: grunt.file.readJSON('package.json'),
    gitinfo: {},
    filenameTemplates:
    {
      app: '<%= pkg.name %>-<%= gitinfo.local.branch.current.shortSHA %>',
      vendor: 'vendor-<%= gitinfo.local.branch.current.shortSHA %>'
    },
    concurrent:
    {
      dev: ['nodemon:dev', 'watch:dev'],
      options: {logConcurrentOutput: true}
    },
    nodemon:
    {
      dev:
      {
        script: 'server.js',
        options:
        {
          watch: ['server/**/*.js', 'server.js', 'Gruntfile.js'],
          callback: function(nodemon)
          {
            nodemon.on('config:update', function()
            {
              setTimeout(function() {require('open')('http://localhost:3030');}, 1000);
            });

            nodemon.on('restart', function()
            {
              setTimeout(function() {require('fs').writeFileSync('.rebooted', 'rebooted');}, 1000);
            });
          }
        }
      }
    },
    watch:
    {
      options: {livereload: true},
      dev:
      {
        files: ['public/app/**/*.js', 'public/app/**/*.html',
          'public/styles/**/*.css', 'server/views/*.html', 'server/includes/*.html', '.rebooted']
      }
    },
    clean:
    {
      //angularDoc: ['../doc/angular'],
      //nodeDoc: ['../doc/node'],
      vendorDir: ['public/vendor'],
      fontDir: ['public/assets/fonts'],
      prebuild: ['public/dist'],
      postbuild: ['public/dist/<%= filenameTemplates.app %>.js', 'public/dist/<%= filenameTemplates.app %>.css',
        'public/dist/<%= filenameTemplates.vendor %>.css']
    },
    bowercopy:
    {
      options: {srcPrefix: 'bower_components'},
      font:
      {
        options: {destPrefix: 'public/assets'},
        files: {'fonts': 'font-awesome/fonts/*'}
      },
      vendor:
      {
        options: {destPrefix: 'public/vendor'},
        files:
        {
          'angular/angular.min.js': 'angular/angular.min.js',
          'angular/angular.min.js.map': 'angular/angular.min.js.map',
          'angular-bootstrap/ui-bootstrap-tpls.min.js': 'angular-bootstrap/ui-bootstrap-tpls.min.js',
          'angular-resource/angular-resource.min.js': 'angular-resource/angular-resource.min.js',
          'angular-resource/angular-resource.min.js.map': 'angular-resource/angular-resource.min.js.map',
          'angular-route/angular-route.min.js': 'angular-route/angular-route.min.js',
          'angular-route/angular-route.min.js.map': 'angular-route/angular-route.min.js.map',
          'bootstrap/bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css',
          'bootstrap/bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js',
          'jquery/jquery.min.js': 'jquery/dist/jquery.min.js',
          'jquery/jquery.min.map': 'jquery/dist/jquery.min.map',
          'toastr/toastr.min.css': 'toastr/toastr.min.css',
          'toastr/toastr.min.js': 'toastr/toastr.min.js'
        }
      }
    },
    jshint:
    {
      files: ['Gruntfile.js', 'public/app/**/*.js'],
      options:
      {
        globals:
        {
          jQuery: true,
          console: true,
          module: true
        },
        node: true
      }
    },
    concat:
    {
      vendor_js:
      {
        src: ['public/vendor/angular/angular.min.js', 'public/vendor/jquery/jquery.min.js', 'public/vendor/{,*/}*.js'],
        dest: 'public/dist/<%= filenameTemplates.vendor %>.min.js'
      },
      app_js:
      {
        src: ['public/app/app.js', 'public/app/**/*.js'],
        dest: 'public/dist/<%= filenameTemplates.app %>.js'
      },
      vendor_css:
      {
        src: ['public/vendor/bootstrap/bootstrap.min.css', 'public/vendor/**/*.css'],
        dest: 'public/dist/<%= filenameTemplates.vendor %>.css'
      },
      app_css:
      {
        src: ['public/styles/**/*.css'],
        dest: 'public/dist/<%= filenameTemplates.app %>.css'
      }
    },
    uglify:
    {
      app:
      {
        options: {banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'},
        files: {'public/dist/<%= filenameTemplates.app %>.min.js': ['<%= concat.app_js.dest %>']}
      }
    },
    less:
    {

        options:
        {
          paths: ["bower_components/font-awesome/less"],
          cleancss: true,
          modifyVars:
          {
            "fa-font-path": "'../../assets/fonts'"
          }
        },
        files: {"public/vendor/font-awesome/font-awesome.min.css":
          "bower_components/font-awesome/less/font-awesome.less"}

    },
    cssmin:
    {
      app:
      {
        options: {banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'},
        files: {'public/dist/<%= filenameTemplates.app %>.min.css': ['public/dist/<%= filenameTemplates.app %>.css']}
      },
      vendor:
      {
        files: {'public/dist/<%= filenameTemplates.vendor %>.min.css':
          ['public/dist/<%= filenameTemplates.vendor %>.css']}
      }
    },
    jsdoc :
    {
      all:
      {
        src: ['../core/*.js', '../feed/*.js', 'server/**/*.js'],
        options: {destination: '../doc/node'}
      }
    },
    ngdocs:
    {
      //all: ['public/app/**/*.js'],
      options: {dest: '../doc/angular'}
    },
    ngAnnotate:
    {
      options: {singleQuotes: true},
      app: {files: {'public/dist/<%= filenameTemplates.app %>.js': ['public/dist/<%= filenameTemplates.app %>.js']}}
    }
  });

  //grunt.registerTask('doc', ['clean:nodeDoc', 'jsdoc'/*, 'clean:angularDoc', 'ngdocs'*/]);

  grunt.registerTask('fonts', ['clean:fontDir', 'bowercopy:font']);
  grunt.registerTask('vendor', ['clean:vendorDir', 'fonts', 'less', 'bowercopy:vendor']);
  grunt.registerTask('build', ['jshint', 'gitinfo', 'clean:prebuild', 'vendor', 'concat', 'ngAnnotate', 'uglify',
    'cssmin', 'clean:postbuild']);
  grunt.registerTask('serve', ['vendor', 'concurrent:dev']);
  //grunt.registerTask('deploy', ['clean:distDir', 'less:prod', 'build', 'concurrent:prod']);
};
