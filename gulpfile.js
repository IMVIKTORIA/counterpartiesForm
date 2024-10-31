const gulp = require('gulp')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs') 

const rollup = require('gulp-better-rollup')
const rollupTypescript = require('rollup-plugin-typescript')

const browsersync = require('browser-sync') // liveserver
const fileinclude = require('gulp-file-include') //импорт html с помощью @@
const del = require('del') // очищение папки
const autoprefixer = require('gulp-autoprefixer') // простановка префиксов
const group_media = require('gulp-group-css-media-queries') //группировка медиазапросов в конце файла
const cssimport = require('gulp-cssimport') //импорт в css
const minifyCss = require('gulp-clean-css')
const minifyHtml = require('gulp-htmlmin')
const sass = require('gulp-sass')(require('sass')) // scss
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')

const inlinesource = require('gulp-inline-source') //сборка в один файл
const replace = require('gulp-replace') //замена строк в файле
const replaceRollup = require('@rollup/plugin-replace') //замена строк через rollup

let path = {
  build: {
    html: 'dist/',  
    css: 'dist/',
    js: 'dist/',
  },
  src: {
    html: 'src/index.html',
    // scss: ['src/**/*.css', 'src/**/*.scss'],
    scss: 'src/style.scss',
    ts: 'src/main.tsx',
    scripts: 'src/**/*.{ts,tsx}',
    js: 'src/main.js',
  },
  watch: {
    html: 'src/**/*.html',
    scss: ['src/**/*.css', 'src/**/*.scss'],
    ts: 'src/**/*.tsx',
    js: 'src/**/*.js',
  },
  cleanDist: './dist/',
  cleanDeploy: './deploy/',
  deploy: 'deploy/',
  bundle: 'dist/index.html',
}

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: './dist/',
    },
    port: 8000,
    notify: false,
  })
}

function html() {
  return gulp
    .src(path.src.html)
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(minifyHtml({ collapseWhitespace: true }))
    .pipe(gulp.dest(path.build.html))
    .pipe(browsersync.stream())
}

function css() {
  return gulp
    .src(path.src.scss)
    .pipe(concat('style.scss'))
    .pipe(cssimport())
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserlist: ['last 15 versions'],
        cascade: false,
      })
    )
    .pipe(group_media())
    .pipe(minifyCss())
    .pipe(gulp.dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
  return gulp
    .src(path.src.ts, path.src) 
    .pipe(
      rollup(
        {
          plugins: [
            resolve(),
            commonjs({
              namedExports: {
                'node_modules/react/index.js': ['useState', 'useRef', 'useEffect','useContext'],
                extensions: ['.js', '.ts','tsx','jsx']
              },
            }),
            replaceRollup({
              'process.env.NODE_ENV': JSON.stringify( 'production' ),
            }),
            rollupTypescript({include: '**/*.{ts,tsx,jsx,js}', lib: ['es5', 'es6', 'dom', "es2016", "es2017"],"jsx": "react", target: 'es5',noEmitHelpers:false, }),
            babel({compact: false}),
          ],
        },
        'umd',
        )
        
    )
    .pipe(uglify({ keep_fargs: true, keep_fnames: true, mangle: false }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(path.build.js))
    .pipe(browsersync.stream())
}

function watchFiles() {
  gulp.watch([path.watch.html], html)
  gulp.watch(path.watch.scss, css)
  gulp.watch([path.watch.ts,path.watch.js], js)
}

function bundle() {
  return gulp
    .src(path.bundle)
    .pipe(
      inlinesource({
        compress: false,
      })
    )
    .pipe(gulp.dest(path.deploy))
}

function cleanDist() {
  return del(path.cleanDist)
}

function cleanDeploy() {
  return del(path.cleanDeploy)
}

function replaceFuncNames() {
  return gulp
    .src(path.deploy + '/index.html')
    .pipe(replace('Scripts', '<%= Scripts%>'))
    .pipe(gulp.dest(path.deploy))
}

function deleteImport() {
  return gulp
    .src([path.src.scripts])
    .pipe(replace('import Scripts', '//import Scripts'))
    .pipe(gulp.dest('src'))
  }
  
function returnImport() {
    return gulp
    .src([path.src.scripts])
    .pipe(replace('//import Scripts', 'import Scripts'))
    .pipe(gulp.dest('src'))
}

const build = gulp.series(cleanDist, gulp.parallel(html, css, js))
const watch = gulp.parallel(build, watchFiles, browserSync)
const deploy = gulp.series(deleteImport, build, cleanDeploy, bundle, replaceFuncNames, returnImport)

exports.build = build
exports.deploy = deploy
exports.watch = watch
exports.default = watch
