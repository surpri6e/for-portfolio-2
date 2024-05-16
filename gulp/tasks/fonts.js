import fs from 'fs';
import fonter from 'gulp-fonter';
import ttfwoff from 'gulp-ttf2woff2';

export const toTTF = () => {
    return app.gulp
        .src(`${app.path.sourceFolder}/fonts/*.otf`, {})
        .pipe(
            app.plugins.plumber(
                app.plugins.notify.onError({
                    title: 'FONTS',
                    message: 'Error: <%= error.message %>',
                }),
            ),
        )
        .pipe(
            fonter({
                formats: ['ttf'],
            }),
        )
        .pipe(app.gulp.dest(`${app.path.sourceFolder}/fonts/`));
};

export const toWOFF = () => {
    return app.gulp
        .src(`${app.path.sourceFolder}/fonts/*.ttf`, {})
        .pipe(
            app.plugins.plumber(
                app.plugins.notify.onError({
                    title: 'FONTS',
                    message: 'Error: <%= error.message %>',
                }),
            ),
        )
        .pipe(
            fonter({
                formats: ['woff'],
            }),
        )
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        .pipe(app.gulp.src(`${app.path.sourceFolder}/fonts/*.ttf`))
        .pipe(ttfwoff())
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};

export const fonstStyle = () => {
    let fontsFile = `${app.path.sourceFolder}/scss/fonts.scss`;

    fs.readdir(app.path.build.fonts, (err, fontsFiles) => {
        if (fontsFiles) {
            if (!fs.existsSync(fontsFiles)) {
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;

                for (var i = 0; i < fontsFiles.length; i++) {
                    let fontFileName = fontsFiles[i].split('.')[0];

                    if (fontFileName !== newFileOnly) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;

                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }

                        fs.appendFile(
                            fontsFile,
                            `@font-face {
                                font-family: ${fontName};
                                font-display: swap;
                                src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
                                font-weight: ${fontWeight};
                                font-style: normal;
                            }\r\n`,
                            cb,
                        );
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                console.log('Для обновления шрифтов, следует вручную удалить файл fonts.scss');
            }
        }
    });

    return app.gulp.src(`${app.path.sourceFolder}`);

    function cb() {}
};
