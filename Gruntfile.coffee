module.exports = (grunt)->

    grunt.initConfig
        pkg: grunt.file.readJSON('package.json')
        meta:
            banner: '// Plugin <%= pkg.name %>. <%= pkg.description %>\n' +
                    '// Aunthor: <%= pkg.author %>. Sorced <%= pkg.birthday %>\n' +
                    '// Promo: <%= pkg.sites.promo %>\n' +
                    '// Documentation: <%= pkg.sites.documentation %>\n' +
                    '// Version: <%= pkg.version %> (<%= grunt.template.today() %>)\n'

        concat:
            options:
                banner: '<%= meta.banner %>'

            dev:
                src: ['<%= pkg.app.root %>*.js', '<%= pkg.app.root %>modes/*.js']
                dest: 'dev/<%= pkg.app.js %>.js'

            app:
                src: ['<%= pkg.app.root %>*.js', '<%= pkg.app.root %>modes/*.js']
                dest: '<%= pkg.app.pub %><%= pkg.app.js %>-<%= pkg.version %>.js'

        uglify:
            app:
                options:
                    banner: '<%= meta.banner %>'

                files:
                    '<%= pkg.app.pub %><%= pkg.app.min %>-<%= pkg.version %>.js': ['<%= pkg.app.pub %><%= pkg.app.js %>-<%= pkg.version %>.js']

        coffee:
            app:
                src: ['<%= pkg.app.root %>**/*.coffee']

        zip:
            app:
                cwd: '<%= pkg.app.pub %>'
                src: ['<%= pkg.app.pub %><%= pkg.app.js %>-<%= pkg.version %>.js', '<%= pkg.app.pub %><%= pkg.app.min %>-<%= pkg.version %>.js', 'README.md']
                dest: '<%= pkg.app.pub %><%= pkg.app.js %>-<%= pkg.version %>.zip'

        qunit:
            files: ['test/*.html']

        watch:
            coffee:
                files: '<%= pkg.app.root %>**/*.coffee',
                tasks: ['coffee', 'concat:dev']

    # Default task.
    grunt.registerTask 'default', 'test'

    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-concat'
    grunt.loadNpmTasks 'grunt-contrib-qunit'
    grunt.loadNpmTasks 'grunt-zip'
  
    grunt.registerTask 'build', 'Build project', (test)->
        if test is 'test'
            grunt.log.write 'Starting tests...'
            grunt.task.run 'qunit', 'after_test'

        else
            grunt.log.write 'Run build...'
            grunt.task.run ['coffee', 'concat:app', 'uglify', 'version', 'zip', 'cleadBuilds']
  
    grunt.registerTask 'after_test', 'Build project', (test)->
        grunt.log.ok 'Tests passed! Run build...'
        grunt.task.run ['coffee', 'concat:app', 'uglify', 'version', 'zip', 'cleadBuilds']
  
    coffee = require 'coffee-script'
    path = require 'path'

    grunt.registerMultiTask 'coffee', 'Compile coffee', ()->
        files = grunt.file.expand this.data.src
        files.forEach (file)->
            coffeeCode = grunt.file.read file
            newPath = path.join(
                path.dirname(file)
                path.basename(file, path.extname(file)) + '.js'
            )

            jsCode = coffee.compile coffeeCode
            
            grunt.file.write newPath, jsCode
            grunt.log.ok 'Compiled coffee file: ' + file + ' at ' + grunt.template.today()
  
    grunt.registerTask 'version', 'Update versipn file', (test)->
        pkg = grunt.config.get 'pkg'
        grunt.file.write 'VERSION', pkg.version + ' ' + grunt.template.today()
        grunt.log.ok 'File version updated'

    grunt.registerTask 'cleadBuilds', 'Clean builds folder', ()->
        files = grunt.file.expand grunt.config.get('pkg').app.pub + '*.js'
        files.forEach (file)->
            try
                grunt.file.delete file
                grunt.log.ok 'Removed file: ' + file
            catch e
                grunt.log.error 'File' + file + ' not removed'

        grunt.log.ok 'Files cleared at ' + grunt.template.today()
  
    grunt.registerTask 'test', 'grunt test', ()->
        grunt.log.write 'Grunt file finded and no hava errors. Version grunt: ' + grunt.version + '\n'



