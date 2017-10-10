var gulp = require('gulp');
var ts = require('gulp-typescript');
var cache = require('gulp-cached');
var gutil = require('gulp-util');
var merge = require('merge2');


var tsProject = ts.createProject({
    declaration: false,
    noResolve: true,
    removeComments: false,
    allowJs: true,
    target: "es5"
});



gulp.task('scripts', function () {
    gulp.src(['package.json', '.env', 'process.yml']).pipe(gulp.dest('lib/'));
    gulp.src(['node_modules']).pipe(gulp.dest("lib/"));
    var tsResult = gulp.src(['src/*.ts', 'src/**/*.ts', '!node_modules/**', '!typings/**'])
        .pipe(cache('scripts'))
        //.pipe(ts(tsProject));
        .pipe(tsProject(ts)) 

     return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done. 
        tsResult.dts.pipe(gulp.dest('lib/definitions')),
         tsResult.pipe(gulp.dest('lib/'))
         
     ]);
});

var build = ['scripts'];

gulp.task('default', build, function () {
    gulp.watch(['app.ts', '**/*.ts'], {
        interval: 500
    }, build).on('change', change)

});

function change(file){
  gutil.log(gutil.colors.yellow('File changed' + ' (' + file.path + ')'));
}