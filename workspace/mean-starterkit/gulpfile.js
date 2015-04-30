var $ = require('gulp-load-plugins')({ lazy: true });
var _ = require('lodash');
var fs = require('fs');
var gulp = require('gulp');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var merge = require('merge-stream');
var path = require('path');
var pngquant = require('imagemin-pngquant');
var spawn = require('child_process').spawn;
var del = require('del');

var colors = $.util.colors;

gulp.task('build', ['watch'], function() {
	log('Building...');

	var msg = {
        title: 'Gulp Build',
        subtitle: 'Deployed to the build folder',
        message: 'You. are. awesome.'
    };

    log(msg);
    notify(msg);
});

gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src([
        	'./gulpfile.js',
        	'client/src/**/*.js',
        	'client/src/**/**/*.js',
        	'client/src/**/**/**/*.js',
        	'client/src/**/**/**/**/*.js',
        ])
        .pipe($.print())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('clean-copy', function(done) {
    clean('client/dist/*.html', done);
});
gulp.task('copy', ['clean-copy'], function() {
	log('Copying index.html...');

	return gulp
		.src('client/src/app/index.html')
		.pipe(gulp.dest('client/dist/'));
});

gulp.task('bower', function() {
	return $.bower()
		.pipe(gulp.dest('lib/'));
});

// gulp.task('clean-concat', function(done) {
//     clean('client/dist/public/app.js', done);
// });
gulp.task('concat', function() {
	log('Concatinating files...');

	return gulp
		.src([
			'client/src/app/*.js',
			'client/tmp/*.js',
			'client/src/app/**/*.js',
			'client/src/app/**/**/*.js',
			'client/src/app/**/**/**/*.js',
			'client/src/components/**/*.js'
		])
		.pipe($.uglify())
		.pipe($.concat('app.js'))
		.pipe(gulp.dest('client/dist/public'));
});

gulp.task('clean-images', function(done) {
    clean('client/dist/assets/images', done);
});
gulp.task('images',['clean-images'], function() {
	log('Copying images...');
	return gulp
		.src([
			'client/src/assets/images/*',
		])
		.pipe(gulp.dest('client/dist/assets/images'));
});

gulp.task('templatecache', function() {
    log('Creating $templateCache...');

    return gulp
        .src([
        	'client/src/app/**/*.tpl.html',
			'client/src/app/**/**/*.tpl.html',
			'client/src/app/**/**/**/*.tpl.html',
			'client/src/components/**/*.tpl.html'
        ])
    	.pipe($.minifyHtml({ conditional: true, spare: true }))
        .pipe($.angularTemplatecache('templates.js', {
        	module: 'app.core'
        }))
        .pipe(gulp.dest('client/tmp/'));
});

gulp.task('clean-less', function(done) {
    clean('client/dist/public/*.css', done);
});
gulp.task('less', function() {
	log('Compiling less...');

	var main = gulp
		.src('client/src/less/main.less')
		.pipe($.less())
		.pipe($.autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('client/dist/public'));

	var templates = gulp
		.src('client/src/less/templates.less')
		.pipe($.less())
		.pipe($.autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('client/dist/public'));

	return merge(main, templates);
});

gulp.task('serve', function() {
	$.nodemon({ script: 'server/app.js' });
});

gulp.task('watch', ['vet', 'all'],function() {
	gulp.watch('./gulpfile.js', ['all']);

	gulp.watch('client/src/index.html', ['copy'])
		.on('change', changeEvent);

	gulp.watch([
		'client/src/*.js',
		'client/src/**/*.js',
		'client/src/**/**.js',
		'client/src/**/**/**/*.js'
	], ['concat'])
		.on('change', changeEvent);

	gulp.watch([
		'client/src/**/*.less',
		'client/src/**/**/.less',
		'client/src/**/**/**/*.less'
	], ['less'])
		.on('change', changeEvent);

	gulp.watch('client/index.html', ['copy'])
		.on('change', changeEvent);

	gulp.watch([
		'client/**/**/*.tpl.html',
		'client/**/**/*tpl.html',
		'client/**/**/**/*.tpl.html'
	], ['templatecache', 'concat'])
		.on('change', changeEvent);
});

/**
 * Log a message or series of messages using chalk's green color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.green(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.green(msg));
    }
}

/**
 * Show OS level notification using node-notifier
 */
function notify(options) {
    var notifier = require('node-notifier');
    var notifyOptions = {
        sound: 'Bottle',
        contentImage: path.join(__dirname, 'gulp.png'),
        time: 5000,
        icon: path.join(__dirname, 'gulp.png')
    };
    _.assign(notifyOptions, options);
    notifier.notify(notifyOptions);
}

/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent(event) {
    // var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    // log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}


gulp.task('all', ['bower', 'copy', 'templatecache', 'images', 'concat', 'less', 'serve']);
gulp.task('default', ['build']);









