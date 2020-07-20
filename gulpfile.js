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
const css2js = require('gulp-css2js')
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

function cssJS() {
	return src('dist/*.css')
	.pipe(css2js({
        prefix: "export let cssText = \"",
        suffix: "\";\n"
    }))
	.pipe(dest('dev/js/styles/'))
}

function babelJS() {
	return src(['dev/js/**/*.js', '!dev/js/styles'])
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
	watch('dist/*.css', cssJS);
}

function browserSync() {
	sync.init( {
		server: {
			baseDir: "./"
		}
	});
	sync.watch('dist/**/*.*').on('change', sync.reload);
}

exports.build = series(cleanDist, toCSS, babelJS, cssJS);
exports.start = series(cleanDist, toCSS, babelJS, cssJS, parallel(watchFiles, browserSync));