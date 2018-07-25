const gulp 				= require('gulp');
const imagemin 			= require('gulp-imagemin');
const config 			= require('../../tasks.config.js');


module.exports = (file)=>{
	var path = file.path.split('/source');
	var currentFile = 'source'+path[1];

	var subPath = currentFile.split('images/')[1];

	subPath = subPath.split('/');

	if(subPath.length > 1){
		subPath = subPath[0];
	}else{
		subPath ='';
	}

	gulp.src(currentFile)
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
		        plugins: [
					{optimizationLevel: 3 },
					{progessive: true },
					{interlaced: true },
					{removeViewBox: false},
					{removeUselessStrokeAndFill: false },
					{cleanupIDs: false}
		        ]
	      	})
	    ]))
	    .pipe(gulp.dest(config.imgs.dist+subPath))
}