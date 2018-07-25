module.exports = {
	sass : {
		src : 'source/styles/estilos.scss',
		dist: 'dist/styles/'
	},
	css : {
		src: 'dist/styles/estilos.css',
		dist: 'dist/styles/'
	},
	js : {
		src :  'source/js/*',
		dist: 'dist/js',
		build: 'dist/js/scripts.js'
	},
	fonts : {
		src : 'source/fonts/**/*',
		dist: 'dist/fonts/'
	},
	imgs : {
		src : 'source/images/**/*',
		dist: 'dist/images/'
	},
	json : {
		src : 'source/json/*',
		dist: 'dist/json'
	},
	pug : {
		src : 'source/pug/*.pug',
		dist : 'dist/'
	},
	html : {
		src : 'dist/*.html',
		dist : 'dist/'
	},
	sprites : {
		png : {
			src : 'source/sprites/*.png',
			dist: {
				css : 'source/styles/components/elements/',
				img : 'source/images/'
			},
			template: 'tasks/sprites/handlebarsInheritance.scss.handlebars'
		},
		svg : {
			src : 'source/icons/svg/*.svg',
			dist: 'source/images/'
		}
	},
	vue : {
		src : 'source/vue/**/**/*',
		dist: 'dist/js'
	},
	vendorsCopy: {
		fontAwesome : {
			scss : {
				src  : 'node_modules/font-awesome/css/font-awesome.css',
				dist : 'source/styles/components/vendor/',
				rename: '_font-awesome.scss'
			},
			variaveis : {
				src : 'node_modules/font-awesome/scss/_variables.scss',
				dist: 'source/scss/vendor/',
				rename: '_fontAwesome-variables.scss'
			},
			fonts: {
				src  : 'node_modules/font-awesome/fonts/*',
				dist : 'dist/fonts/'
			}
		},
		lightbox : {
			js : {
				src : [
					'node_modules/lightbox2/dist/js/lightbox.min.js',
					'node_modules/lightbox2/dist/js/lightbox.min.map'
				],
				dist : 'dist/js/'
			},
			imgs : {
				src : 'node_modules/lightbox2/dist/images/*',
				dist: 'source/images/'
			},
			css : {
				src: 'node_modules/lightbox2/dist/css/lightbox.min.css',
				dist: 'dist/css/'
			}
		},
		bootstrap: {
			js : {
				src: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
				dist: 'dist/js',
				rename : 'bootstrap.min.js'
			}
		},
		owlCarousel : {
			js : {
				src: 'node_modules/owl.carousel2/dist/owl.carousel.min.js',
				dist: 'dist/js'
			},
			css : {
				src : 'node_modules/owl.carousel2/dist/owl.carousel.css',
				dist: 'source/scss/vendor/',
				rename: '_owl-carousel.scss'
			}
		},
		jquery : {
			js : {
				src : 'node_modules/jquery/dist/jquery.min.js',
				dist: 'dist/js' 
			}
		}
	}
}