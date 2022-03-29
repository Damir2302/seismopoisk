"use strict";

const {src, dest} = require("gulp");
const gulp = require("gulp");
const pathTo = require("path");
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const removeComments = require('gulp-strip-css-comments');
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const pxtorem = require('gulp-pxtorem');
const plumber = require("gulp-plumber");
const del = require("del");
const notify = require("gulp-notify");
const webpackStream = require('webpack-stream');
const browserSync = require("browser-sync").create();
const pug = require('gulp-pug');
const frontMatter  = require('gulp-front-matter');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

const svgSprite = require('gulp-svg-sprites');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');


/* Paths */
const srcPath = 'src/';
const distPath = 'www/';

const path = {
    build: {
        pughtml:   distPath,
        html:   distPath,
        js:     distPath + "assets/js/",
        css:    distPath + "assets/css/",
        img:    distPath + "assets/images/",
        svg:    distPath + "assets/sprites/",
        fonts:  distPath + "assets/fonts/"
    },
    src: {
        pughtml:   srcPath + "**/*.pug",
        html:   srcPath + "**/*.html",
        js:     srcPath + "assets/js/**/*.js",
        css:    srcPath + "assets/scss/*.{sass,scss}",
        img:    srcPath + "assets/images/**/*.{mp4,cur,jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
        svg:    srcPath + "assets/icons/*.svg",
        fonts:  srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    watch: {
        pughtml:   srcPath + "**/*.pug",
        html:   srcPath + "**/*.html",
        js:     srcPath + "assets/js/**/*.js",
        css:    srcPath + "assets/scss/**/*.{sass,scss}",
        img:    srcPath + "assets/images/**/*.{mp4,cur,jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
        svg:    srcPath + "assets/icons/*.svg",
        fonts:  srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    clean: "./" + distPath
}



/* Tasks */

function serve() {
    browserSync.init({
        server: {
            baseDir: "./" + distPath
        }
    });
}

function pughtml(cb) {
    return src(path.src.pughtml, {base: srcPath})
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(frontMatter({ property: 'data' }))
        .pipe(pug({
                pretty: true
            })
        )
        .pipe(dest(path.build.pughtml))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function html(cb) {
    return src(path.src.html, {base: srcPath})
        .pipe(dest(path.build.html))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function css(cb) {
    return src(path.src.css, {base: srcPath + "assets/scss/"})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "SCSS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(sass({
            includePaths: './node_modules/',
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions', '> 1%', 'ie 9'],
            cascade: true
        }))
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(pxtorem({
			rootValue: 10,
			unitPrecision: 5,
		    propList: ['top', 'left', 'right', 'bottom', 'font', 'font-size', 'line-height', 'letter-spacing', 'margin', 'margin-top', 'padding', 'height', 'min-height', 'max-height', 'width', 'max-width', 'flex'],
		    selectorBlackList: ['.fancybox-button', '.slick-slider', 'slick'],
		    replace: true,
		    mediaQuery: false,
		    minPixelValue: 18
		}))
        .pipe(removeComments())
        .pipe(rename({
            suffix: '.min',
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function cssWatch(cb) {
    return src(path.src.css, {base: srcPath + "assets/scss/"})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "SCSS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: './node_modules/',
            outputStyle: 'compressed'
        }))
        .pipe(rename({
            suffix: '.min',
            extname: ".css"
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function jsPlugins(cb) {
	return gulp.src([
        pathTo.resolve('node_modules', 'jquery/dist/jquery.min.js')
	])
    .pipe(plumber({
		errorHandler: notify.onError("Error: <%= error.message %>")
	}))
    // .pipe(concat('plugins.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
	.pipe(browserSync.reload({ stream: true }))

    cb();
};

function js(cb) {
    return src(path.src.js, {base: srcPath + 'assets/js/'})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "JS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        // .pipe(sourcemaps.init())
        // .pipe(webpackStream({
        //   mode: "production",
        //   output: {
        //     filename: 'app.min.js',
        //   },
        //   module: {
        //     rules: [
        //       {
        //         test: /\.(js)$/,
        //         exclude: /(node_modules)/,
        //         loader: 'babel-loader',
        //         query: {
        //           presets: ['@babel/preset-env']
        //         }
        //       }
        //     ]
        //   }
        // }))
        // .pipe(sourcemaps.write('.'))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function jsWatch(cb) {
    return src(path.src.js, {base: srcPath + 'assets/js/'})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "JS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        // .pipe(webpackStream({
        //   mode: "development",
        //   output: {
        //     filename: 'app.min.js',
        //   }
        // }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function img(cb) {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function svg(cb) {
    return src(path.src.svg)
        .pipe(cheerio({
            // run: function ($) {
            //     $('[fill]').removeAttr('fill');
            //     $('[style]').removeAttr('style');
            // },
            parserOptions: { xmlMode: true }
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
                mode: "symbols",
                preview: false,
                selector: "%f",
                svg: {
                    symbols: 'sprites.svg'
                }
            }
        ))
        .pipe(gulp.dest(path.build.svg));
        cb();
}

function fonts(cb) {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function clean(cb) {
    return del(path.clean);

    cb();
}

function watchFiles() {
    gulp.watch([path.watch.pughtml], pughtml);
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], cssWatch);
    gulp.watch([path.watch.js], jsWatch);
    gulp.watch([path.watch.img], img);
    gulp.watch([path.watch.svg], svg);
    gulp.watch([path.watch.fonts], fonts);
}

const build = gulp.series(clean, gulp.parallel(pughtml, html, css, js, jsPlugins, img, fonts, svg));
const watch = gulp.parallel(build, watchFiles, serve);



/* Exports Tasks */
exports.pughtml = pughtml;
exports.html = html;
exports.css = css;
exports.js = js;
exports.js = jsPlugins;
exports.img = img;
exports.svg = svg;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;