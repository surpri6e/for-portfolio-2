import SASS from 'sass';
import gulpSASS from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import webpCSS from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import media from 'gulp-group-css-media-queries';

const sass = gulpSASS(SASS);

export const scss = () => {
    return app.gulp
        .src(app.path.source.scss, { sourcemaps: true })
        .pipe(
            app.plugins.plumber(
                app.plugins.notify.onError({
                    title: 'SCSS',
                    message: 'Error: <%= error.message %>',
                }),
            ),
        )
        .pipe(app.plugins.replace(/@img\//g, '../images/'))
        .pipe(
            sass({
                outputStyle: 'expanded',
            }),
        )
        .pipe(media())
        .pipe(
            webpCSS({
                webpClass: '.webp',
                noWebpClass: '.no-webp',
            }),
        )
        .pipe(
            autoprefixer({
                grid: true,
                overrideBrowserslist: ['last 3 versions'],
                cascade: true,
            }),
        )
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(cleanCSS())
        .pipe(
            rename({
                extname: '.min.css',
            }),
        )
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browserSync.stream());
};
