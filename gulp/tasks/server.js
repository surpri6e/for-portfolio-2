export const server = () => {
    app.plugins.browserSync.init({
        server: {
            baseDir: `${app.path.build.html}`,
        },
        browser: 'chrome',
        notify: false,
        port: 3000,
    });
};
