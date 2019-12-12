var gulp = require('gulp');
var phpspec = require('gulp-phpspec');
var run = require('gulp-run');
var notify = require('gulp-notify');

gulp.task('test', function(done){
    gulp.src('spec/**/*.php')
        .pipe(run('clear').exec())
        .pipe(phpspec('', {notify:true}))
        .on('error', notify.onError({
            'title': 'Crap',
            'message': 'Your tests failed miserably!',
            // 'icon': __dirname + '/fail.png',
        }))
        .pipe(notify({
            'title': 'Success',
            'message': 'All tests have returned green!'
        }));
    done();
});

gulp.task('watch', function(){
    gulp.watch(['spec/**/*.php', 'src/**/*.php'], gulp.series(['test']));
});

gulp.task('default', gulp.series(['test','watch']));
