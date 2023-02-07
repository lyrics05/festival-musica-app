const { src,dest, watch, parallel} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const avif = require("gulp-avif")

function css(callback){
    src("src/scss/**/*.scss")
     .pipe(plumber())
     .pipe( sass())
     .pipe( dest("build/css"))
    callback();
}

function javascript(callback){
    src("src/js/**/*.js")
    .pipe(dest("build/js"))
    callback()
}

function dev(callback){
    watch("src/scss/**/*.scss",css);
    watch("src/js/**/*.js",javascript);
    callback()
}
function versionwebp(callback){
    const opciones = {
        quality:50
    };
    src("src/img/**/*.{png,jpg}")
      .pipe(webp(opciones))
      .pipe(dest("build/img"))
      callback()
}

function imagenes(callback){
    const opciones={
        optimizationLevel:3
    };
    src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"))
    callback()
}

function versionavif(callback){
    const opciones = {
        quality:50
    };
    src("src/img/**/*.{png,jpg}")
      .pipe(avif(opciones))
      .pipe(dest("build/img"))
      callback()
}
exports.css= css;
exports.versionwebp=versionwebp;
exports.imagenes=imagenes;
exports.versionavif=versionavif;
exports.js= javascript;
exports.dev=parallel(versionwebp,versionavif,dev,javascript,imagenes);