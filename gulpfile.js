const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const files = {
	scssPath: 'src/scss/styles.scss',
	jsPath: 'src/js/main.js',
};

// Sass Task
function scssTask(){
  return src(files.scssPath, { sourcemaps: true })
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask(){
  return src(files.jsPath, { sourcemaps: true })
    .pipe(dest('dist/js', { sourcemaps: '.' }));
}

// BrowserSync Tasks
function browserSyncServe(cb){
  browserSync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browserSyncReload(cb){
  browserSync.reload();
  cb();
}

// Watch Task
function watchTask(){
  watch('*.html', browserSyncReload);
  watch(['src/scss/styles.scss', 'src/js/main.js'], series(scssTask, jsTask, browserSyncReload));
}

// Default Gulp task
exports.default = series(
  scssTask,
  jsTask,
  browserSyncServe,
  watchTask
);
