import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = `./dist`;
const sourceFolder = `./src`;

//! Paths

export const path = {
    build: {
        fonts: `${buildFolder}/fonts/`,
        images: `${buildFolder}/images/`,
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        files: `${buildFolder}/other/`,
    },
    source: {
        svgicons: `${sourceFolder}/svgicons/*.svg`,
        images: `${sourceFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${sourceFolder}/images/**/*.svg`,
        js: `${sourceFolder}/js/app.js`,
        scss: `${sourceFolder}/scss/style.scss`,
        html: `${sourceFolder}/*.html`,
        files: `${sourceFolder}/other/**/*.*`,
    },
    watch: {
        images: `${sourceFolder}/images/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
        js: `${sourceFolder}/**/*.js`,
        scss: `${sourceFolder}/**/*.scss`,
        html: `${sourceFolder}/**/*.html`,
        files: `${sourceFolder}/other/**/*.*`,
    },

    clean: buildFolder,

    buildFolder: buildFolder,
    sourceFolder: sourceFolder,
    rootFolder: rootFolder,

    ftp: ``,
};
