import gulp from 'gulp';

import { plugins } from './gulp/config/plugins.js';
import { path } from './gulp/config/path.js';

//! Import tasks
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import * as fontsFormater from './gulp/tasks/fonts.js';
import { zip } from './gulp/tasks/zip.js';

const fonts = gulp.series(fontsFormater.toTTF, fontsFormater.toWOFF, fontsFormater.fonstStyle);

const tasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

//! Export scripts
export { deployZIP };

global.app = {
    gulp: gulp,
    path: path,
    plugins: plugins,
};

const watcher = () => {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
};

const watchers = gulp.parallel(watcher, server);

const dev = gulp.series(reset, tasks, watchers);
const deployZIP = gulp.series(reset, tasks, zip);

gulp.task('default', dev);
