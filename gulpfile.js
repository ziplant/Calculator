const { src, dest, parallel, series } = require('gulp');
const scss = require('gulp-sass');
const prefix = require('autoprefixer');
const postcss = require('gulp-postcss');
const watch = require('gulp-watch');
const debug = require('gulp-debug');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const sync = require('browser-sync').create();
const clean = require('gulp-clean');
const babel = require('gulp-babel');
//const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');


function cleanDist() {
	return src('dist/**/*', {read: false})
				.pipe(clean());
}

function toCSS() {
	return src('dev/sass/main.sass')
				//.pipe(sourcemaps.init())
				.pipe(debug({title: 'sass:'}))
				.pipe(scss())
				.pipe(postcss([prefix()]))
				.pipe(csso())
				.pipe(rename({
					basename: 'calc'
				}))
				//.pipe(sourcemaps.write())
				.pipe(dest('dist/'));
}

function babelJS() {
	return src('dev/js/**/*.js')
				//.pipe(sourcemaps.init())
				.pipe(debug({title: 'js:'}))
				.pipe(babel({
					presets: ['@babel/env']
				}))
				.pipe(webpack({
					//mode: "development",
					mode: "production",
					output: {
						filename: 'calc.js'
					}
				}))
				//.pipe(sourcemaps.write())
				.pipe(dest('dist/'));
}

function watchFiles() {
	watch('dev/sass/**/*.sass', toCSS);
	watch('dev/js/**/*.js', babelJS);
}

function browserSync() {
	sync.init( {
		server: {
			baseDir: "./"
		}
	});
	sync.watch('dist/**/*.*').on('change', sync.reload);
}

exports.build = series(cleanDist, toCSS, babelJS );
exports.start = series(cleanDist, toCSS, babelJS, parallel(watchFiles, browserSync));