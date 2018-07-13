/*| Path de entrada : ./source
* | Path de saida 	: ./dist
*/

// SHABLAU

// Gulp e outros
const gulp 					= require('gulp');
const rename 				= require("gulp-rename");
const connect 				= require('gulp-connect-multi')();
const autoprefixer 			= require('gulp-autoprefixer');
const sourcemaps   			= require('gulp-sourcemaps');

// templates
const pug 					= require('gulp-pug');
const prettify 				= require('gulp-prettify');

// styles
const sass 					= require('gulp-sass');
const minifyCss 			= require('gulp-clean-css');

// IMAGENS
const imagemin 				= require('gulp-imagemin');
const gulpif 				= require('gulp-if');

const spritesmith 			= require('gulp.spritesmith');
const svgstore 				= require('gulp-svgstore');
const svgmin 				= require('gulp-svgmin');
const path 					= require('path');

// JS
const concat 				= require('gulp-concat');
const uglify 				= require('gulp-uglify');
const babel					= require('gulp-babel');

//======================================

const libsJs 		= [
	'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
	'source/libs/*.js'
];

const lightbox 	= [
	'node_modules/jquery/dist/jquery.min.js',
	'node_modules/lightbox2/dist/js/lightbox.min.map',
	'node_modules/lightbox2/dist/js/lightbox.min.js'
];

const tipografia = [
	'node_modules/font-awesome/fonts/*',
	// 'bower_components/bootstrap-sass/assets/fonts/**/*',
	'source/fonts/**/*'
];

// TEMPLATE ---------------------------------|
gulp.task('pug', function() {

  gulp.src('source/pug/*.pug')
    .pipe(pug({
      locals: 'source/pug/*.pug'
    }))
    .pipe(prettify({indent_size: 4}))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('pug-watch', function() {

  gulp.src('source/pug/*.pug')
    .pipe(pug({
      locals: 'source/pug/*.pug'
    }))
    .pipe(prettify({indent_size: 4}))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

gulp.task('lightboxcss', () => {
	gulp.src('node_modules/lightbox2/dist/css/lightbox.css')
		.pipe(rename('_lightbox.scss'))
		.pipe(gulp.dest('source/styles/components/vendor/'));

	gulp.src('node_modules/lightbox2/dist/images/*')
		.pipe(gulp.dest('source/imagens/estrutural/'));
});

//SASS --------------------------------------|
gulp.task('sass', function () {
  	gulp.src('source/styles/**/**/**/*.scss')
	.pipe(sourcemaps.init())
    .pipe(sass({
    	styleOutput : 'compressed'
    }))
	.pipe(autoprefixer({
		browsers: ['last 4 versions', '> 1%', 'ie 8','ie 7'],
		cascade: false
	}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('dist/styles'))
	.pipe(rename('estilos.min.css'))
	.pipe(gulp.dest('dist/styles'));
});

// JS ---------------------------------------|
gulp.task('libs',function(){
	gulp.src(libsJs)
		.pipe(concat('starter.js'))
		.pipe(gulp.dest('dist/js'));

	gulp.src(lightbox)
		.pipe(gulp.dest('dist/js'));
});

gulp.task('libs-watch',function(){
	gulp.src(libsJs)
		.pipe(concat('starter.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(connect.reload());

	gulp.src(lightbox)
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts',function(){
	gulp.src('source/js/**/*.js')
		.pipe(sourcemaps.write('./'))
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('dist/js'));

	gulp.src('source/js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.min.js'))
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-watch',function(){
	gulp.src('source/js/**/*.js')
		.pipe(concat('scripts.js'))
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('dist/js'))
		.pipe(uglify())
		.pipe(rename('scripts.min.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(connect.reload());
});

// JSON ---------------------------------------|
gulp.task('json',function(){
	gulp.src('source/json/*.json')
		.pipe(gulp.dest('dist/json'));
});

gulp.task('json-wath',function(){
	gulp.src('source/json/*.json')
		.pipe(gulp.dest('dist/json'))
		.pipe(connect.reload());
});

// WATCH ------------------------------------|
gulp.task('sass-watch', function () {
  	gulp.src('source/styles/**/**/**/*.scss')
    	.pipe(sass({
    		styleOutput: 'compressed'
    	}))
		.pipe(autoprefixer({
			browsers: ['last 4 versions', '> 1%', 'ie 8','ie 7'],
			cascade: false
		}))
    	.pipe(gulp.dest('dist/styles'))
    	.pipe(rename('estilos.min.css'))
    	.pipe(gulp.dest('dist/styles'))
    	.pipe(connect.reload());
});

// FONTS ------------------------------------|
gulp.task('tipografia',function(){
	gulp.src(tipografia)
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('tipografia-watch',function(){
	gulp.src(tipografia)
		.pipe(gulp.dest('dist/fonts'))
		.pipe(connect.reload());
});


// SPRITES --------------------------------------------------------
let configSpritsmith = {
	imgName: 'sprite.png',
	imgPath: 'imagens/estrutural/sprite.png',
	cssName: '_sprites.scss',
	cssTemplate: 'source/sprites/handlebarsInheritance.scss.handlebars',
	padding: 10
};

gulp.task('sprites', function () {
	let spriteData = gulp.src('source/sprites/*.png').pipe(spritesmith(configSpritsmith));

	spriteData.img.pipe(gulp.dest('source/imagens/estrutural/'));
	spriteData.css.pipe(gulp.dest('source/styles/components/elements/'));
});

gulp.task('sprites-watch', function () {
	let spriteData = gulp.src('source/sprites/*.png').pipe(spritesmith(configSpritsmith));

	spriteData.img.pipe(gulp.dest('source/imagens/estrutural/'));
	spriteData.css.pipe(gulp.dest('source/styles/components/elements/'));
	spriteData.pipe(connect.reload());
});

gulp.task('svgstore', function () {
    return gulp
        .src('source/sprites/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('dist/imagens/estrutural'));
});

gulp.task('svgstore-watch', function () {
    return gulp
        .src('source/sprites/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('dist/imagens/estrutural'));
        connect.reload();
});


// IMGS -----------------------------------

gulp.task('imagens', ['sprites'], function () {
	gulp.src('source/imagens/**/*')
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			// imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
		        plugins: [
					{optimizationLevel: 3},
					{progessive: true},
					{interlaced: true},
					{removeViewBox: false},
					{removeUselessStrokeAndFill: false},
					{cleanupIDs: false}
		        ]
	      	})
	    ]))
	    .pipe(gulp.dest('dist/imagens/'))
});

// WATCH -------------------------------
gulp.task('watch',['dev','server'],function(){
	// pug =================================
	gulp.watch(['source/pug/**/*.pug'],['pug-watch']);

	// SASS =================================
	gulp.watch(['source/styles/**/**/**/*.scss'],['sass-watch']);

	// JAVASCRIPTS ============================
	gulp.watch(['source/js/**/*.js'],['scripts-watch']);

	// TIPOGRAFIA =============================
	gulp.watch(['source/fonts/**/*'],["tipografia-watch"]);

	// IMAGENS ===============================
	gulp.watch(['source/imagens/**/*']).on('change',function(file){
		let urlRelativa = file.path.split('imagens/')[1];
		let pasta = urlRelativa.split('/')[0];
		let fileExtension = urlRelativa.split('.')[1];
		
		gulp.src(file.path)
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			// imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
		        plugins: [
					{optimizationLevel: 3},
					{progessive: true},
					{interlaced: true},
					{removeViewBox: false},
					{removeUselessStrokeAndFill: false},
					{cleanupIDs: false}
		        ]
	      	})
	    ]))
	    .pipe(gulp.dest('dist/imagens/'))
	});

	// SPRITES ================================
	gulp.watch(['source/sprites/*.png'],['sprites-watch']);
	gulp.watch(['source/sprites/*.svg'],['svgstore-watch']);

	// JSON ==================================
	gulp.watch(['source/json/*.json']).on('change',function(file){

		gulp.src(file.path)
		.pipe(gulp.dest('dist/json'))
		.pipe(connect.reload());
	});

	gulp.watch(libsJs, ['libs-watch']);
});

// SERVER ------------------------------
gulp.task('server', connect.server({
	root: ['dist'],
	port: 9000,
	livereload: true,
	open: {
		browser: 'safari' // Para o Google chrome no linux - google-chrome-stable
	}
}));

// DEFAULT ----------------------------
gulp.task('dev',['lightboxcss','imagens','svgstore','json', 'pug', 'sass', 'libs', 'scripts', 'tipografia']);

gulp.task('default',['watch']);