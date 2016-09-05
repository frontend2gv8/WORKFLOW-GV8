/*| Path de entrada : ./source
* | Path de saida 	: ./dist
*/

// SHABLAU

// Gulp e outros
var gulp 			= require('gulp');
var rename 			= require("gulp-rename");
var connect 		= require('gulp-connect-multi')();
var autoprefixer 	= require('gulp-autoprefixer');
var postcss     	= require('gulp-postcss');
var sourcemaps   	= require('gulp-sourcemaps');

// templates
var pug 			= require('gulp-pug');
var prettify 		= require('gulp-prettify');

// styles
var sass 			= require('gulp-sass');
var minifyCss 		= require('gulp-minify-css');

// IMAGENS
var imagemin 		= require('gulp-imagemin');
var pngquant 		= require('imagemin-pngquant');
var gulpif 			= require('gulp-if');
var nsg 			= require('node-sprite-generator');
var svgstore 		= require('gulp-svgstore');
var svgmin 			= require('gulp-svgmin');
var path 			= require('path');

// JS
var concat 			= require('gulp-concat');
var uglify 			= require('gulp-uglify');

//======================================

var libsJs 		= [
	'bower_components/jquery/dist/jquery.min.js',
	'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
	'source/libs/*.js'
];

var lightbox 	= [
	'bower_components/lightbox/dist/js/lightbox.min.map',
	'bower_components/lightbox/dist/js/lightbox.min.js'
];

var tipografia = [
	'bower_components/fontawesome/fonts/*',
	'bower_components/bootstrap-sass/assets/fonts/**/*',
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

//SASS --------------------------------------|
gulp.task('sass', function () {
  	gulp.src('source/styles/**/**/**/*.scss')
    	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 4 versions', '> 1%', 'ie 8','ie 7'],
		cascade: false
	}))
    	.pipe(gulp.dest('dist/styles'))
    	.pipe(minifyCss())
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

gulp.task('scripts',function(){
	gulp.src('source/js/**/*.js')
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(uglify())
		.pipe(rename('scripts.min.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-watch',function(){
	gulp.src('source/js/**/*.js')
		.pipe(concat('scripts.js'))
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
    	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 4 versions', '> 1%', 'ie 8','ie 7'],
		cascade: false
	}))
    	.pipe(gulp.dest('dist/styles'))
    	.pipe(minifyCss())
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
gulp.task('sprites', function () {
	nsg({
	    src: [
	        'source/sprites/*.png'
	    ],
	    spritePath: 'source/imagens/estrutural/sprite.png',
	    stylesheet: 'source/sprites/sprite.tlp',
	    stylesheetPath: 'source/styles/components/elements/_sprites.scss'
	});
});

gulp.task('sprites-watch', function () {
	nsg({
	    src: [
	        'source/sprites/*.png'
	    ],
	    spritePath: 'source/imagens/estrutural/sprite.png',
	    stylesheet: 'source/sprites/sprite.tlp',
	    stylesheetPath: 'source/styles/components/elements/_sprites.scss'
	});
	connect.reload();
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
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            optimizationLevel:7,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/imagens'));
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
		var urlRelativa = file.path.split('imagens/')[1];
		var pasta = urlRelativa.split('/')[0];

		gulp.src(file.path)
		.pipe(imagemin({
	            	progressive: true,
	            	svgoPlugins: [{removeViewBox: false}],
	            	optimizationLevel:7,
	            	use: [pngquant()]
	        	}))
	        	.pipe(gulp.dest('dist/imagens/'+pasta))
	        	.pipe(connect.reload());
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
});

// SERVER ------------------------------
gulp.task('server', connect.server({
	root: ['dist'],
	port: 9000,
	livereload: true,
	open: {
		browser: 'google-chrome-stable' // Para o Google chrome no linux - google-chrome-stable
	}
}));

// DEFAULT ----------------------------
gulp.task('dev',['imagens','svgstore','json', 'pug', 'sass', 'libs', 'scripts', 'tipografia']);

gulp.task('default',['watch']);