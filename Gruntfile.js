module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		compass: {
			dist: {
				options: {
					sassDir: 'public/scss',
					cssDir: 'public/css'
				}
 			}
		},

		jquery: {
			dist: {
				options: {
					prefix: "jquery-",
				},
				output: "public/javascripts/vendor",
				versions: {
					"2.0.3": ["ajax", "wrap", "deprecated", "sizzle", "offset", "effects"]
 				}
	  		}
		},

		lodash: {
			build: {
				dest: 'public/javascripts/vendor/lodash.js',
				include: ['backbone'],
				minus: ['template']
			}
		},

		requirejs: {
			production: {
				options: {
					baseUrl: "public/javascripts",
					mainConfigFile: "public/javascripts/config.js",
					name: 'vendor/almond',
					deps: ['setup'],
					optimize: 'uglify2',
					preserveLicenseComments: false,
					insertRequire: ['setup'],
					out: "public/javascripts/build/doppelganger.min.js",
					removeCombined: true,
					stubModules: ['text', 'hbars']
				}
			}
		},

		watch: {
			options: {
				livereload: true,
				spawn: false
			},
			html: {
				files: ['views/**/*.handlebars'],
				tasks: []
			},
			scripts: {
				files: [
					'public/javascripts/**/*.js',
					'!public/javascripts/build/**/*.js'
				],
				tasks: ['requirejs']
			},
			styles: {
				files: ['public/**/*.scss'],
				tasks: ['compass']
			}
		},

	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks("grunt-jquery-builder");
	grunt.loadNpmTasks('grunt-lodash');

	grunt.registerTask('build', ['compass', 'jquery', 'lodash', 'requirejs']);
	grunt.registerTask('default', ['build']);
};
