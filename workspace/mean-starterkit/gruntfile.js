/*jslint node: true */
'use strict';

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bower-task');

	// Project configuration
	grunt.initConfig({
		bower: {
			install: {
				options: {
					install: true,
					copy: false,
					targetDir: 'dist',
					cleanTargetDir: true
				}
			}
		},
		// Concats all js files into one
		concat: {
			options: {
				seperator: ';'
			},
			dist: {
				src: [
					// App
					'client/src/app/*.js',
					// Templates
					'client/tmp/*.js',
					// Modules
					'client/src/app/**/*.js',
					// Components
					'client/src/components/**/*.js'
				],
				dest: 'client/dist/app.js'
			}
		},
		// Fresh build folder
		clean: {
			temp: {
				src: ['client/tmp']
			}
		},
		copy: {
			main: {
				src: 'client/src/app/index.html',
				dest: 'client/dist/index.html',
			},
			assets: {
				expand: true,
				flatten: true,
				filter: 'isFile',
				src: ['client/src/assets/**/*'],
				dest: 'client/dist/assets/images'
			}
		},
		// Converts templates to js
		html2js: {
			app: {
				options: {
					base: 'client/src/app'
				},
				src: [
					// Module templates
					'client/src/app/**/*.tpl.html'
				],
				dest: 'client/tmp/app-templates.js'
			},
			components: {
				options: {
					base: 'client/src/components'
				},
				src: [
					// Component templates
					'client/src/components/**/*.tpl.html'
				],
				dest: 'client/tmp/component-templates.js'
			}
		},
		// Runs jshint
		jshint: {
			options: {
				node: true
			},
			all: {
				src: [
					'gruntfile.js',
					// Modules
					'client/src/app/**/*.js',
					'client/src/app/*.js',
					// Components
					'client/components/**/*.js'
				]
			}
		},
		// Compiles LESS
		less: {
			dev: {
				files: {
					'client/dist/style.css': 'client/src/less/main.less'
				}
			},
			dist: {
				options: {
					cleancss: true,
          			compress: true
				},
				files: {
					'client/dist/style.css': 'client/src/less/main.less'
				}
			}
		},
		// Starts BE server
		nodemon: {
			dev: {
				script: 'server/app.js',
				options: {
					ext: 'js, html'
				}
			}
		},
		// Minifies js
		uglify: {
			dist: {
				files: {
					'client/dist/app.js': ['client/dist/app.js']
				},
				options: {
					mangle: false
				}
			}
		},
		// Watches changes in files
		watch: {
			dev: {
				files: [
					'Grunfile.js',
					// App
					'client/src/app/*.js',
					// Index
					'client/*.html',
					// Components
					'client/src/components/**/*.js',
					// Components (templates)
					'client/src/components/**/*.tpl.html',
					// Modules
					'client/src/app/**/*.js',
					// Modules (templates)
					'client/src/app/**/*.tpl.html',
					// Modules (LESS)
					'client/src/app/**/*.less',
					// LESS
					'client/src/less/*.less'
				],
				tasks: ['jshint', 'html2js', 'copy:main', 'copy:assets', 'concat:dist', 'less:dev', 'clean:temp', 'uglify:dist'],
				options: {
					atBegin: true
				}
			},
			min: {
				files: [
					'Grunfile.js',
					// App
					'client/src/app/*.js',
					// Index
					'client/*.html',
					// Components
					'client/src/components/**/*.js',
					// Components (templates)
					'client/src/components/**/*.tpl.html',
					// Modules
					'client/src/app/**/*.js','*.html',
					// Modules (templates)
					'client/src/app/**/*.tpl.html',
					// LESS
					'client/src/less/*.less'
				],
				tasks: ['jshint', 'html2js', 'concat:dist', 'less:dist','clean:temp', 'uglify:dist'],
				options: {
					atBegin: true
				}
			}
		}
	});

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Default to force
	grunt.option('force', true);

	// Grunt dev
	grunt.registerTask('dev', function() {
		var nodemon = grunt.util.spawn({
	        cmd: 'grunt',
	        grunt: true,
	        args: 'nodemon'
	    });

	    nodemon.stdout.pipe(process.stdout);
    	nodemon.stderr.pipe(process.stderr);

		grunt.task.run(['bower', 'watch:dev']);
	});
};










