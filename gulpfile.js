/*| Path de entrada : ./source
* | Path de saida 	: ./dist
*/

// SHABLAU

// Gulp e outros
var gulp 		= require('gulp');
var rename 	= require("gulp-rename");
var connect 	= require('gulp-connect-multi')();
var autoprefixer 	= require('gulp-autoprefixer');

// templates
var jade 		= require('gulp-jade');
var prettify 		= require('gulp-prettify');

// styles
var sass 		= require('gulp-sass');
var minifyCss 	= require('gulp-minify-css');

// IMAGENS
var imagemin 	= require('gulp-imagemin');
var pngquant 	= require('imagemin-pngquant');
var gulpif 		= require('gulp-if');
// var sprity 		= require('sprity');

// JS
var concat 		= require('gulp-concat');
var uglify 		= require('gulp-uglify');

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
gulp.task('jade', function() {

  gulp.src('source/jade/*.jade')
    .pipe(jade({
      locals: 'source/jade/*.jade'
    }))
    .pipe(prettify({indent_size: 4}))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('jade-watch', function() {

  gulp.src('source/jade/*.jade')
    .pipe(jade({
      locals: 'source/jade/*.jade'
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
		browsers: ['last 2 versions'],
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
// gulp.task('sprites', function () {
// 	sprity.src({
// 		src: 'source/sprites/**/*.{png,jpg}',
// 		style: './_sprites.scss',
// 		// ... other optional options
// 		// for example if you want to generate scss instead of css
// 		processor: 'sass', // make sure you have installed sprity-sass
// 	})
// 	.pipe(gulpif('*.png', gulp.dest('source/imagens/estrutural/'), gulp.dest('source/styles/components/elements/')));
// });

// gulp.task('sprites-watch', function () {
// 	sprity.src({
// 		src: 'source/sprites/**/*.{png,jpg}',
// 		style: './_sprites.scss',
// 		// ... other optional options
// 		// for example if you want to generate scss instead of css
// 		processor: 'sass', // make sure you have installed sprity-sass
// 	})
// 	.pipe(gulpif('*.png', gulp.dest('source/imagens/estrutural/'), gulp.dest('source/styles/components/elements/')))
// 	.pipe(connect.reload());
// });

// IMGS -----------------------------------
gulp.task('imagens', function () {
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
	// JADE =================================
	gulp.watch(['source/jade/**/*.jade'],['jade-watch']);

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
	gulp.watch(['source/sprites/**/*'],['sprites-watch']);

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
		browser: 'chromium-browser' // Para o Google chrome no linux - google-chrome-stable
	}
}));

// DEFAULT ----------------------------
gulp.task('dev',['imagens','json', 'jade', 'sass', 'libs', 'scripts', 'tipografia']);

gulp.task('default',['watch']);