const {src, dest, series, watch} = require('gulp')
const concat = require('gulp-concat')
const del = require('del')
const sync = require('browser-sync').create()

function html() {
    return src('src/index.html')
        .pipe(dest('dist'))
}

function css() {
    return src('src/css/**.css')
        .pipe(concat('index.css'))
        .pipe(dest('dist/style'))
}

function img() {
    return src('src/img/**/*.{png,svg}')
        .pipe(dest('dist/img'))
}

function clear() {
    return del('dist')
}

function serve() {
    sync.init({
        server: './dist'
    })

    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/**.css', series(css)).on('change', sync.reload)
    watch('src/**.{png,svg}', series(img)).on('change', sync.reload)
}



exports.build = series(clear, css, img, html)
exports.serve = series(clear, css, img, html, serve)