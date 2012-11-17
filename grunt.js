module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:public.json>',
    meta: {
      banner: '// Plugin <%= pkg.name %>. <%= pkg.descr %>.\n' +
              '// Aunthor: <%= pkg.author %>. Sorced <%= pkg.birthday %>\n' +
              '// Promo: <%= pkg.sites.promo %>\n' +
              '// Documentation: <%= pkg.sites.documentation %>\n' +
              '// Version: <%= pkg.version %> (<%= grunt.template.today() %>)'
    },
    concat: {
        app: {
            src: ['<banner:meta.banner>', '<%= pkg.app.root %>*.js'],
            dest: '<%= pkg.app.pub %><%= pkg.app.js %>-<%= pkg.version %>.js'
        }
    },
    min: {
        app: {
            src: ['<banner:meta.banner>', '<%= pkg.app.pub %><%= pkg.app.js %>-<%= pkg.version %>.js'],
            dest: '<%= pkg.app.pub %><%= pkg.app.min %>-<%= pkg.version %>.js'
        }
    },
    qunit: {
        files: ['test/*.html']
    },
    watch: {
        js: {
            files: '<%= pkg.app.root %>*.js',
            tasks: 'build'
        },
        test: {
            files: '<%= pkg.app.root %>*.js',
            tasks: 'build:test'
        }
    }
  });

  // Default task.
  grunt.registerTask('default', 'test');
  
  grunt.registerTask('build', 'Build project', function(test) {
      if(test == 'test'){
          grunt.log.write('Starting tests...');
          grunt.task.run('qunit after_test');
      } else {
          grunt.log.write('Run build...');
          grunt.task.run('concat min version');
      }
  });
  
  grunt.registerTask('after_test', 'Build project', function(test) {
      grunt.log.ok('Tests passed! Run build...');
      grunt.task.run('concat min version');
  });
  
  grunt.registerTask('coffee', 'Compile coffee', function(){
      //TODO
  });
  
  grunt.registerTask('version', 'Update versipn file', function(test) {
      var pkg = grunt.config.get('pkg');
      grunt.file.write('VERSION', pkg.version + ' ' + new Date());
      grunt.log.ok('File version updated');
  });
  
  grunt.registerTask('test', 'grunt test', function(){
      grunt.log.write('Grunt file finded and no hava errors. Version grunt: ' + grunt.version + '\n');
  });

};