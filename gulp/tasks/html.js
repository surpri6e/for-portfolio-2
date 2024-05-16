import include from 'gulp-file-include';
import versionNumber from 'gulp-version-number';

export const html = () => {
    return app.gulp
        .src(app.path.source.html)
        .pipe(
            app.plugins.plumber(
                app.plugins.notify.onError({
                    title: 'HTML',
                    message: 'Error: <%= error.message %>',
                }),
            ),
        )
        .pipe(include())
        .pipe(app.plugins.replace(/@images\//g, 'images/'))
        .pipe(
            versionNumber({
                value: '%DT%',
                append: {
                    key: '_v',
                    cover: 0,
                    to: ['css', 'js'],
                },
                output: {
                    file: 'gulp/version.json',
                },
            }),
        )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browserSync.stream());
};
