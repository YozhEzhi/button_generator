"use strict";

var gulp       = require("gulp"),
	clean      = require("gulp-clean"),
	sass       = require("gulp-sass"),
	sourcemaps = require("gulp-sourcemaps"),
	cmq        = require("gulp-combine-media-queries"),
	rename     = require("gulp-rename"),
	minifyCSS  = require("gulp-minify-css"),
	gulpif     = require("gulp-if"),
	uglify     = require("gulp-uglify"),
	useref     = require("gulp-useref"),
	livereload = require("gulp-livereload"),
	wiredep    = require("wiredep").stream;

// Build
gulp.task("build", ["clean"], function () {
	gulp.src("src/img/**/*")
		.pipe(gulp.dest("dist/img"));

	gulp.src("src/bower_components/fontawesome/fonts/*")
		.pipe(gulp.dest("dist/fonts"));

	var assets = useref.assets();

	return gulp.src("src/*.html")
		.pipe(assets)
		.pipe(gulpif("*.js", uglify()))
		.pipe(gulpif("*.css", minifyCSS()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest("dist"));
});

// Clean
gulp.task("clean", function() {
	return gulp.src("dist", {read: false})
		.pipe(clean());
});

// Copy images
gulp.task("copy", function() {
	return gulp.src("src/img/**/*")
		.pipe(gulp.dest("dist/img"))
});

// Bower
gulp.task("bower", function () {
	gulp.src("./src/index.html")
		.pipe(wiredep({
			directory : "src/bower_components"
		}))

		.pipe(gulp.dest("./src"));
});

// SASS:
gulp.task("sass", function () {
	return gulp.src("src/sass/main.scss")

	.pipe(sourcemaps.init())

	.pipe(sass({
		errLogToConsole : true
	}))

	.pipe(sourcemaps.write("."))

	.pipe(gulp.dest("src/css"))
});

// CSS:
gulp.task("css", ["sass"], function () {
	return gulp.src("src/css/main.css")

	.pipe(cmq({
		log: true
	}))

	.pipe(gulp.dest("src/css"))

	.pipe(livereload());
});

// Watch:
gulp.task("watch", function () {
	livereload.listen();
	gulp.watch("bower.json", ["bower"]);
	gulp.watch("src/sass/main.scss", ["sass"]);
	gulp.watch("src/css/main.css", ["css"]);
});

// Default:
gulp.task("default", ["watch"]);
