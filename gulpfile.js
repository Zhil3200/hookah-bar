const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');
// const imagemin = require('gulp-imagemin');
// const webp = require('gulp-webp');
// const webpHTML = require('gulp-webp-html');
// const webpCSS = require('gulp-webp-css');

// задачи по умолчанию при разработке и работе в черновых файлах
gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
});

// задачи для паблика в dist (deploy)
gulp.task('serverdist', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('html', function() {
    return gulp.src("src/*.html")
        // .pipe(webpHTML())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('css', function() {
    return gulp.src("src/css/*.css")
        // .pipe(webpCSS())
        .pipe(cleanCSS({level: {1: { specialComments: 0}}}))
        .pipe(gulp.dest("dist/css"));
});

gulp.task('scripts', function() {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
});

// gulp.task('fonts', function() {
//     return gulp.src("src/fonts/**/*")
//         .pipe(gulp.dest("dist/fonts"));
// });

// gulp.task('icons', function() {
//     return gulp.src(["src/icons/**/*", "!src/icons/favicon/*"])
//         .pipe(webp())
//         .pipe(gulp.dest("dist/icons"))
//         .pipe(gulp.src("src/icons/**/*"))
//         .pipe(gulp.dest("dist/icons"));
// });

gulp.task('mailer', function() {
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest("dist/mailer"));
});

// gulp.task('images', function() {
//     return gulp.src("src/img/**/*")
//         .pipe(webp())
//         .pipe(gulp.dest("dist/img"))
//         .pipe(gulp.src("src/img/**/*"))
//         .pipe(imagemin())
//         .pipe(gulp.dest("dist/img"));
// });

// задача разработка
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));
// задача на деплой проекта
gulp.task('deploy', gulp.parallel('html', 'css', 'scripts', 'mailer', 'serverdist'));