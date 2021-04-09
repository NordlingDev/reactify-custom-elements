const gulp = require("gulp");
const ts = require("gulp-typescript");
const del = require("del");

const SRC_PATH = "./src/package";
const DIST_PATH = "./dist";
const SRC_FILES = [
    `${SRC_PATH}/**/!(*.spec).{ts,tsx}`,
];

const tsProject = ts.createProject("./tsconfig.package.json");
const tasks = {
    clean: () => {
        return del(DIST_PATH + "/**/*");
    },
    transpile: () => {
        return gulp.src(SRC_FILES)
            .pipe(tsProject())
            .pipe(gulp.dest(DIST_PATH));
    },
};

module.exports = {
    build: gulp.series(tasks.clean, tasks.transpile),
};
