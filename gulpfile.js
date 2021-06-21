const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const imageMin = require('gulp-imagemin');

// Sass Task
function scssTask(){
  return src('src/scss/styles.scss', { sourcemaps: true })
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css', { sourcemaps: '.' }));
}

// Image Task
function imageTask(){
  return src('src/assets/*.png')
  .pipe(imageMin())
  .pipe(dest('dist/assets'));
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
  watch(['src/scss/styles.scss'], series(scssTask, imageTask, browserSyncReload));
}

// Default Gulp task
exports.default = series(
  scssTask,
  imageTask,
  browserSyncServe,
  watchTask
);
