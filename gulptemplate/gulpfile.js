var gulp =require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
notify = require('gulp-notify'),
connect   = require('gulp-connect')
//原版的gulp 的 watch 不会监控文件的添加
watch = require('gulp-watch')
babel = require('gulp-babel')
plumber = require('gulp-plumber')


function handleError (error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('sass',function(){
 gulp.src('./sass/*.scss')
 .pipe(sass()).on('error', notify.onError( (error) => { return `SASS went wrong, ${error}`} )) 
 .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
 .pipe(gulp.dest('./css'));
})

//默认任务
gulp.task('default', function(){
 gulp.run('sass','server');
    // 监听文件变化
    watch('./sass/*.scss', function(){
     gulp.run('sass');
    });
    watch('./*.html',function(){
        gulp.run('reload')
    })
    watch('./es6/*.js',function(){
        gulp.src('./es6/*.js')
        .pipe(plumber(
            {}, true, function(err){
                console.log('ERROR!!!!');
                console.log(err);
            }
        ))
        .pipe(babel())
        // .on('error', notify.onError( (error) => { return `js went wrong, ${error}`} ))
        // .on('error', handleError)
        .pipe(gulp.dest('./js'))
        // gulp.run('reload')
    })
    gulp.watch('./css/*.css',['reload'])
   });
// 创建热加载任务
gulp.task('reload',function(){
    gulp.src('./*')
     .pipe(connect.reload())
    console.log('html change')
})

//开启服务器
gulp.task('server',function(){
    connect.server({
        root:'./',
        livereload:true
    })
})