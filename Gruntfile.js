module.exports = function (grunt) {

	// описываем конфигурацию:
	grunt.initConfig({

		// подгружаем даннае из package.json:
		pkg: grunt.file.readJSON("package.json"),

		// плагин compass:
		compass: {
			dist: {
				options: {
					sassDir: "src/sass",
					cssDir: "dest/css",
					environment: "development"
				}
			}
		},

		// плагин минификации и конкатенации css:
		cssmin: {
			minify: {
				expand: true,
				cwd: "dest/css/",
				src: ["*.css", "!*.min.css"],
				dest: "dest/css/",
				ext: ".min.css"
			}
		},

		// плагин проверки js:
		jshint: {
			options: {
				curly   : true,
				eqeqeq  : true,
				immed   : true,
				latedef : true,
				newcap  : true,
				noarg   : true,
				sub     : true,
				undef   : true,
				eqnull  : true,
				browser : true,
				globals : {
					jQuery: true,
					$: true,
					console: true
				}
			}
		},

		// плагин конкатенации:
		concat: {
			dist: {
				src: ["src/js/main.js", "src/js/mail.js"],
				dest: "dest/js/build.js"
			}
		},

		// плагин минификации js:
		uglify: {
			build: {
				src: "dest/js/build.js",
				dest: "dest/js/build.min.js"
			}
		},

		// плагин удаления логов:
		// removelogging: {
		// 	dist: {
		// 		src: "dest/js/build.min.js",
		// 		dest: "dest/js/build.min.js"
		// 	}
		// },

		// плагин для слежки за файлами:
		watch: {
			scripts: {
				files: ["src/js/*.js"],
				// tasks: ["removelogging"]
				tasks: ["jshint", "concat", "uglify"]
			},

			css: {
				files: ["src/sass/*.scss"],
				tasks: ["compass", "cssmin"]
			}
		}

	});

	// подгружаем необходимые плагины:
	grunt.loadNpmTasks("grunt-contrib-compass");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	// grunt.loadNpmTasks("grunt-remove-logging");
	grunt.loadNpmTasks("grunt-contrib-watch");

	// регистрируем задачу:
	grunt.registerTask("default", ["watch"]);
};
