var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache'),
    minifyHtml = require('gulp-minify-html'),
    del = require('del')
    inject = require('gulp-inject')
    watch = require('gulp-watch')
    htmlreplace = require('gulp-html-replace');
    runSequence = require('run-sequence');

    //配置js压缩顺序
    var jsrules = [
      './www/js/*.js',
      './www/js/service/service.js',
      './www/js/directive/defineDirectiveModule.js',
      './www/js/filter/defineFilterModule.js',
      './www/js/**/*.js',
      './www/templates/tabs.js',
      './www/templates/**/*.js'
    ]
    //配置一些路径
    var paths = {
      html:'./www/index.html',
      dist:'./www',
      minify:[
        './www/minify/js/*.js',
        './www/minify/js/*.css'
     ]
    };

    var devTask = ['copy-src-to-dest', 'watch-src-folder']
    var buildTask =['minifycss', 'minifyjs','templates','index']

//压缩css
//==================================================================
gulp.task('minifycss', function () {
  return gulp.src('./www/css/*.css')    //需要操作的文件
    // .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
    .pipe(minifycss())   //执行压缩
    .pipe(gulp.dest('./www/minify/css'));   //输出文件夹
});
//压缩，合并 js
//压缩js
//==================================================================
gulp.task('minifyjs', function () {
  // return gulp.src(['./www/js/router.js','./www/js/**/*.js','./www/templates/**/*.js'])
  return gulp.src(jsrules) 
  .pipe(sourcemaps.init())     //需要操作的文件
    .pipe(concat('app.js'))    //合并所有js到 app.js(合并后的文件)
    .pipe(gulp.dest('./www/concat'))
    .pipe(rename({ suffix: '.min' }))   //rename压缩后的文件名
    .pipe(uglify())   //压缩
    .pipe(sourcemaps.write('./map'))
    //跳过 压缩语法错误 同时显示出来 错误行号
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('./www/minify/js'));  //输出
});

//把Html压缩成js
//==================================================================
gulp.task('templates', function() {
  gulp.src('./www/templates/**/*.html')
    .pipe(minifyHtml({empty: true}))
    .pipe(templateCache({
      standalone: true,
      root: 'templates'
    }))
    .pipe(gulp.dest( './www/minify/js'));
});
　　
//注入引用
//==================================================================
gulp.task('inject-into-index',function() {
  var target = gulp.src('./www/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(paths.minify, {read: false}); 

  return target.pipe(inject(sources,{relative: true}))
    .pipe(gulp.dest('./www'));  //还要有文件的人家才会加
})

// copy all files under the SRC to the WWW directory
// =================================================================
gulp.task('copy-src-to-dest', function() {
  gulp.src(['./src/**/*','./src/index.html'])
    .pipe(gulp.dest('./www'));
});

// watch SRC folder
// =================================================================
gulp.task('watch-src-folder', function() {
  gulp.src(['./src/*','./src/**/*'], {base: './src'})
    .pipe(watch('./src', {base: './src'}))
    .pipe(gulp.dest('./www'));
});

// clean task
// =================================================================
gulp.task('clean', function (cb) {
  return del([
    paths.dist + '/**/*'
  ], cb);
});

//replace
//==================================================================
// prepare Index.html for dist - ie. using min files
// =================================================================
gulp.task('index', function() {
  gulp.src(paths.html)
    .pipe(htmlreplace({
      'js': ['minify/js/app.min.js','minify/js/templates.js'],
      'css':'minify/css/style.min.css'
    }))
    .pipe(gulp.dest(paths.dist + '/.'));
});

//build task
// =================================================================
gulp.task('build', function () {
  runSequence('clean',
  'copy-src-to-dest',
  buildTask,
  function(){
   setTimeout(() => {
     gulp.start(buildTask)
   },500); //先这样解决吧
  })
　});


//dev task 
//==================================================================
gulp.task('dev', function () {
  runSequence('clean',
    devTask,
    function(){
       console.log('dev done!')
    });
　});