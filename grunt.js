module.exports = function(grunt) {

  // Project configuration.
grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
        banner: '// Plugin <%= pkg.name %>. <%= pkg.description %>\n' +
                '// Aunthor: <%= pkg.author %>. Sorced <%= pkg.birthday %>\n' +
                '// Promo: <%= pkg.sites.promo %>\n' +
                '// Documentation: <%= pkg.sites.documentation %>\n' +
                '// Version: <%= pkg.version %> (<%= grunt.template.today() %>)'
    },
    concat: {
        dev: {
            src: ['<banner:meta.banner>', '<%= pkg.app.root %>*.js', '<%= pkg.app.root %>modes/*.js'],
            dest: 'dev/<%= pkg.app.js %>.js'
        },
        app: {
            src: ['<banner:meta.banner>', '<%= pkg.app.root %>*.js', '<%= pkg.app.root %>modes/*.js'],
            dest: '<%= pkg.app.pub %><%= pkg.app.js %>-<%= pkg.version %>.js'
        }
    },
    min: {
        app: {
            src: ['<banner:meta.banner>', '<%= pkg.app.pub %><%= pkg.app.js %>-<%= pkg.version %>.js'],
            dest: '<%= pkg.app.pub %><%= pkg.app.min %>-<%= pkg.version %>.js'
        }
    },
    coffee: {
        app: {
            files: ['<%= pkg.app.root %>**/*.coffee']
        }
    },
    qunit: {
        files: ['test/*.html']
    },
    watch: {
        coffee: {
            files: '<%= pkg.app.root %>**/*.coffee',
            tasks: 'coffee concat:dev'
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
            grunt.task.run('coffee concat:app min version');
        }
    });
  
    grunt.registerTask('after_test', 'Build project', function(test) {
        grunt.log.ok('Tests passed! Run build...');
        grunt.task.run('coffee concat:app min version');
    });
  
    var coffee = require('./lib/node_modules/coffee-script');
    var path = require('path')
    grunt.registerMultiTask('coffee', 'Compile coffee', function(){
        var files = grunt.file.expandFiles(this.data.files)
        files.forEach(function(file){
            var coffeeCode = grunt.file.read(file);
            var newPath = path.join(
                path.dirname(file),
                path.basename(file, path.extname(file)) + '.js'
            );
            var jsCode = coffee.compile(coffeeCode)
            
            grunt.file.write(newPath, jsCode);
            grunt.log.ok('Compiled coffee file: ' + file + ' at ' + grunt.template.today());
        });
    });
  
    grunt.registerTask('version', 'Update versipn file', function(test) {
        var pkg = grunt.config.get('pkg');
        grunt.file.write('VERSION', pkg.version + ' ' + grunt.template.today());
        grunt.log.ok('File version updated');
    });
  
    grunt.registerTask('test', 'grunt test', function(){
        grunt.log.write('Grunt file finded and no hava errors. Version grunt: ' + grunt.version + '\n');
    });

};