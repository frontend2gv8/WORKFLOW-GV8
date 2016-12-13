/*| Path de entrada : ./source
* | Path de saida 	: ./dist
*/

// SHABLAU

// Gulp e outros
const gulp 					= require('gulp');
const rename 				= require("gulp-rename");
const connect 				= require('gulp-connect-multi')();
const autoprefixer 			= require('gulp-autoprefixer');
const postcss     			= require('gulp-postcss');
const sourcemaps   			= require('gulp-sourcemaps');

// templates
const pug 					= require('gulp-pug');
const prettify 				= require('gulp-prettify');

// styles
const sass 					= require('gulp-sass');
const minifyCss 			= require('gulp-minify-css');

// IMAGENS
const imagemin 				= require('imagemin');
const imageminWebp 			= require('imagemin-webp');
const imageminJpegoptim 	= require('imagemin-jpegoptim');
const imageminPngquant 		= require('imagemin-pngquant');
const imageminSvgo 			= require('imagemin-svgo');
const gulpif 				= require('gulp-if');
const nsg 					= require('node-sprite-generator');
const svgstore 				= require('gulp-svgstore');
const svgmin 				= require('gulp-svgmin');
const path 					= require('path');

// JS
const concat 				= require('gulp-concat');
const uglify 				= require('gulp-uglify');

//======================================

const libsJs 		= [
	'bower_components/jquery/dist/jquery.min.js',
	'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
	'source/libs/*.js'
];

const lightbox 	= [
	'bower_components/lightbox/dist/js/lightbox.min.map',
	'bower_components/lightbox/dist/js/lightbox.min.js'
];

const tipografia = [
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
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('dist/styles'))
	.pipe(minifyCss())
	.pipe(rename('estilos.min.css'))
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write('./'))
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
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/js'));

	gulp.src('source/js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
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
function runIMages(dirIn,dirOut,conf){
	return imagemin([dirIn], dirOut,conf);
};

const imgsCfg = {
	use: [
		imageminPngquant({
			quality: '65-80'
		}),
		imageminJpegoptim({
			max: 80,
			progressive: true
		})
	]
};

const svgConf = {
	use: [
		imageminSvgo({
            plugins: [
                {removeViewBox: false}
            ]
        })
	]
};

const webpConf = {
	use: [
		imageminWebp({quality:80})
	]
};

gulp.task('imagens', ['sprites'], function () {
	runIMages('source/imagens/estrutural/*.{jpg,png,ico}','dist/imagens/estrutural',imgsCfg);
	runIMages('source/imagens/conteudo/*.{jpg,png,ico}','dist/imagens/conteudo',imgsCfg);
	runIMages('source/imagens/banners/*.{jpg,png,ico}','dist/imagens/banners',imgsCfg);
	
	runIMages('source/imagens/estrutural/*.svg','dist/imagens/estrutural',svgConf);
	runIMages('source/imagens/conteudo/*.svg','dist/imagens/conteudo',svgConf);
	runIMages('source/imagens/banners/*.svg','dist/imagens/banners',svgConf);

	runIMages('source/imagens/estrutural/*.{jpg,png}','dist/imagens/estrutural',webpConf);
	runIMages('source/imagens/conteudo/*.{jpg,png}','dist/imagens/conteudo',webpConf);
	runIMages('source/imagens/banners/*.{jpg,png}','dist/imagens/banners',webpConf);
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

		if(fileExtension == 'svg'){
			runIMages(file.path,'dist/imagens/'+pasta,svgConf);
			console.log('O arquivo '+urlRelativa+' foi compilado com sucesso!')
		}else{
			runIMages(file.path,'dist/imagens/'+pasta,imgsCfg);
			runIMages(file.path,'dist/imagens/'+pasta,webpConf);
			console.log('O arquivo '+urlRelativa+' foi compilado com sucesso!')
		}

		// conect.reload();
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
		browser: 'safari' // Para o Google chrome no linux - google-chrome-stable
	}
}));

// DEFAULT ----------------------------
gulp.task('dev',['imagens','svgstore','json', 'pug', 'sass', 'libs', 'scripts', 'tipografia']);

gulp.task('default',['watch']);