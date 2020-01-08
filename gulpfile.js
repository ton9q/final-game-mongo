const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const { reload } = browserSync;

const baseDir = './landing';
const customHTMLWatchFiles = `${baseDir}/**/*.html`;
const customJSWatchFiles = `${baseDir}/**/*.js`;
const customCSSWatchFiles = `${baseDir}/**/*.css`;

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir,
      open: true,
      watchOptions: {
        debounceDelay: 1000,
      },
    },
  });

  gulp.watch(customHTMLWatchFiles, done => {
    reload();
    done();
  });

  gulp.watch(customCSSWatchFiles, done => {
    reload();
    done();
  });

  gulp.watch(customJSWatchFiles, done => {
    reload();
    done();
  });
});
