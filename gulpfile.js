var gulp = require('gulp');
var gls = require('gulp-live-server');
var browserSync = require('browser-sync');

gulp.task('default', function() {
	console.log('gulp default task');
});

// watch files for changes and reload
gulp.task('serve', function() {
  var server = gls.new('api.js');
  server.start();
  browserSync.init({
    proxy: 'localhost:8000',
  });
  gulp.watch([ 'app/**/*js', 'app/*.js', 'app/**/*html'], function (file) {
    server.notify.apply(server, [file]);
  });
  gulp.watch('api.js', function(){
    server.start.bind(server)();
  });
  browserSync.watch('api.js').on('change', function(){
    setTimeout(function () {
      browserSync.reload();
    }, 1000);
    });
});
