const gulp 				= require('gulp');
const runSequence		= require('run-sequence');
const del 				= require('del');
const rename 			= require('gulp-rename');
const browserSync		= require('browser-sync');
const reload	 		= browserSync.reload;

const sass 				= require('gulp-sass');
const autoprefixer 		= require('gulp-autoprefixer');
const sourcemaps   		= require('gulp-sourcemaps');

// MODULES ==========================================================
// STYLES
const sassTask 		= require('./tasks/styles/sass.js');
const sassWatch 	= require('./tasks/styles/sassWatch.js');
const minifyCss 	= require('./tasks/styles/minifyCss.js');
// SCRIPTS
const scripts 		= require('./tasks/js/scripts.js');
const scriptsWatch 	= require('./tasks/js/scriptsWatch.js');
const minifyJs 		= require('./tasks/js/minifyJs.js');
// FONTS
const fonts 		= require('./tasks/fonts/fonts.js');
const fontsWatch 	= require('./tasks/fonts/fontsWatch.js');
// IMAGENS
const imgs 			= require('./tasks/imgs/imgs.js');
const imgWatch 		= require('./tasks/imgs/imgWatch.js');
// JSON
const json 			= require('./tasks/json/json.js');
const jsonWatch 	= require('./tasks/json/jsonWatch.js');
// Template
const pug 			= require('./tasks/pug/pug.js');
const pugWatch 		= require('./tasks/pug/pugWatch.js');
const prettifyHTML 	= require('./tasks/pug/prettifyHTML.js');
// Sprites
const spritePNG 	= require('./tasks/sprites/spritePng.js');
const spriteSVG 	= require('./tasks/sprites/spriteSvg.js');
// COPY
const copyTask 		= require('./tasks/copy/copyAll.js');
// VUE
// const vueTask		= require('./tasks/vue/vueWebpack.js');

// TASKS =================================================
// DELL
gulp.task('del', ()=>{
	return del(['dist'])
})

gulp.task('copy', copyTask);

// Styles
gulp.task('sass', sassTask)
gulp.task('sass:watch', sassWatch)
gulp.task('minify:css', minifyCss);
// Scripts
gulp.task('scripts', scripts);
gulp.task('scripts:watch', scriptsWatch);
gulp.task('minify:js', minifyJs);
// FONTS
gulp.task('fonts', fonts);
gulp.task('fonts:watch', fontsWatch);
// IMGS
gulp.task('imgs', imgs);
// JSON
gulp.task('json', json);
gulp.task('json:watch', jsonWatch);
// PUG
gulp.task('pug', pug);
gulp.task('pug:watch', pugWatch);
gulp.task('prettify:html', prettifyHTML);
// SPRITES
gulp.task('spritePNG', spritePNG);
gulp.task('spriteSVG', spriteSVG);
// VUE
// gulp.task('vue:dev', vueTask('dev'));
// gulp.task('vue:build', vueTask('build'));

//===============================================================
gulp.task('watch', ()=>{
	// FONTS
	gulp.watch(['source/fonts/**/*'], ['fonts']);

	// JS
	gulp.watch(['source/js/*'], ['scripts']);

	// IMGS
	gulp.watch(['source/images/**/*']).on('change', function(file){
		return imgWatch(file);
	});

	// JSON
	gulp.watch(['source/json/*'], ['json']);

	// TEMPLATE
	gulp.watch(['source/pug/**/*'], ['pug']);

	// SPRITES
	gulp.watch(['source/sprites/*.png'], ['spritePNG']);
	gulp.watch(['source/sprites/*.svg'], ['spriteSVG']);

	// SERVER
	browserSync({
		notify: false,
		logPrefix: 'Dev Server',
		scrollElementMapping: ['main', '.wrapper','#app'],
		server: ['dist'],
		port: 9000,
		open: false
	});

	gulp.watch(['dist/**/**/*'], reload);

	gulp.watch(['source/styles/**/**/*']).on('change', function(){
		gulp.src('source/styles/estilos.scss')
			.pipe(sourcemaps.init())
			.pipe(sass())
			.pipe(autoprefixer({
				browsers: ['last 4 versions', '> 1%', 'ie 8','ie 7'],
				cascade: false
			}))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('dist/styles/'))
			.pipe(browserSync.stream())
	});
});

gulp.task('start', () =>{
	runSequence(
		'sass',
		'pug',
		['spritePNG', 'spriteSVG'],
		'json',
		'scripts',
		'copy',
		'fonts',
		'imgs');
});

gulp.task('build', ['minify:css', 'minify:js', 'prettify:html']);

gulp.task('dev', ['watch'])

gulp.task('default', ()=>{
	runSequence('del','start', 'build');
})
