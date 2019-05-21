/*
gulp.task -> Crear una tarea -> gulp.task('nombre de la tarea', ()=>{lo que va a hacer la tarea})
gulp.src -> Origen del documento -> gulp.src('ruta del origen del archivo')
gulp.pipe -> Unión de las diferentes secciones de la tarea -> .pipe(sección)
gulp.dest -> Destino del documento -> gulp.dest('ruta de destino del archivo')
gulp.watch -> Vigilar los cambios en la ruta que le digamos -> gulp.watch ('ruta a vigilar', ['tarea'])
*/

/*outputstyle: nested | compact | expanded | compressed */

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const babel = require('gulp-babel');

const browserSync = require('browser-sync').create();

gulp.task('sass', ()=>{
  gulp.src('./dev/scss/styles.scss')
      .pipe(sass({
          outputStyle:'compact'
      }))
      .pipe(autoprefixer({
          browsers:['last 3 versions']
      }))
      .pipe(gulp.dest('./public/css'))
      .pipe(browserSync.stream())
});

gulp.task('pug', ()=>{
    gulp.src('./dev/*.pug')
        .pipe(pug({
            pretty:true
        }))
        .pipe(gulp.dest('./public/'))
})

gulp.task('es6', ()=>{
    gulp.src('./dev/js/scripts.js')
    .pipe(babel({
        presets:['es2015']
    }))
    .pipe(gulp.dest('./public/js'))
})

/*En la tarea default no hace falta lanzar [sass] porque ya tenemos el vigilante */
gulp.task('default', ()=>{
    browserSync.init({
        server: './public'
    })

    gulp.watch('./dev/scss/styles.scss', ['sass']),
    gulp.watch('./dev/*.pug', ['pug']).on('change', browserSync.reload),
    gulp.watch('./dev/js/*.js', ['es6']).on('change', browserSync.reload)
})