module.exports = function (grunt) {

	// описываем конфигурацию:
	grunt.initConfig({
		// подгружаем даннае из package.json:
		pkg: grunt.file.readJSON("package.json"),

		// плагин sass:
		sass: {
			dist: {
				options: {
					// compass : true,
					style   : "nested"
				},
				// files: [{
				//     nested: true,
				//     cwd: "src/sass",
				//     src: ["*.scss"],
				//     dest: "src/css",
				//     ext: ".css"
				// }]
			  files: {
			  	"dest/css/main.css": [
					  "src/sass/main.scss"
					]
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
			},

		  	// вставляем название проекта из package.json;
		  	"<%= pkg.name %>": {

		  	// какие файлы проверять;
			src: [ "src/js/*.js" ]
		  }
		},

		// плагин конкатенации:
		// concat: {
		// 	dist: {
		// 		src: ["src/js/main.js"],
		// 		dest: "dest/js/build.js"
		// 	}
		// },

		// плагин минификации js:
		// uglify: {
		// 	build: {
		// 		src: "dest/js/build.js",
		// 		dest: "dest/js/build.min.js"
		// 	}
		// },

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
				// tasks: ["jshint", "concat", "uglify", "removelogging"]
				tasks: ["jshint"]
			},

			css: {
				files: ["src/sass/*.scss"],
				tasks: ["sass", "cssmin"]
			}
		}

	});

	// подгружаем необходимые плагины:
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	// grunt.loadNpmTasks("grunt-contrib-concat");
	// grunt.loadNpmTasks("grunt-contrib-uglify");
	// grunt.loadNpmTasks("grunt-remove-logging");
	grunt.loadNpmTasks("grunt-contrib-watch");

	// регистрируем задачу:
	// grunt.registerTask("default", ["sass", "cssmin", "jshint", "concat", "uglify", "removelogging", "watch"]);
	grunt.registerTask("default", ["sass", "cssmin", "jshint", "watch"]);
};
