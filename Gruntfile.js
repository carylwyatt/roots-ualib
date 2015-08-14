'use strict';
module.exports = function(grunt) {
    // Load all tasks
    require('load-grunt-tasks')(grunt);
    // Show elapsed time
    require('time-grunt')(grunt);

    var jsFileList = [
        '<%= bower.directory %>/angular-filter/dist/angular-filter.js',
        '<%= bower.directory %>/angular-ui-utils/ui-utils.js',
        '<%= bower.directory %>/ng-file-upload/ng-file-upload-all.js',
        '<%= bower.directory %>/angular-carousel/dist/angular-carousel.js',
        '<%= bower.directory %>/angular-touch/angular-touch.js',
        '<%= bower.directory %>/angular-scroll/angular-scroll.js',
        '<%= bower.directory %>/lodash/lodash.js',
        '<%= bower.directory %>/angular-google-maps/dist/angular-google-maps.js',
        '<%= bower.directory %>/ualib-ui/dist/ualib-ui-templates.js',
        '<%= bower.directory %>/ualib-ui/dist/ualib-ui.js',
        '<%= bower.directory %>/onesearch/dist/onesearch-templates.js',
        '<%= bower.directory %>/onesearch/dist/onesearch.js',
        '<%= bower.directory %>/ualib-hours/dist/hours-templates.js',
        '<%= bower.directory %>/ualib-hours/dist/hours.js',
        '<%= bower.directory %>/manage/dist/manage-templates.js',
        '<%= bower.directory %>/manage/dist/manage.js',
        '<%= bower.directory %>/databases/dist/databases-templates.js',
        '<%= bower.directory %>/databases/dist/databases.js',
        '<%= bower.directory %>/musicSearch/dist/musicSearch-templates.js',
        '<%= bower.directory %>/musicSearch/dist/musicSearch.js',
        '<%= bower.directory %>/ualib_staffdir/dist/staffdir-templates.js',
        '<%= bower.directory %>/ualib_staffdir/dist/staffdir.js',
        '<%= bower.directory %>/ualib-softwareList/dist/ualib.softwareList-templates.js',
        '<%= bower.directory %>/ualib-softwareList/dist/ualib.softwareList.js',
        '<%= bower.directory %>/ualib-news/dist/ualib.news-templates.js',
        '<%= bower.directory %>/ualib-news/dist/ualib.news.js',
        'assets/js/ualib-templates.js',
        'assets/js/plugins/*.js',
        'assets/js/_*.js'
    ];

    var lessFileList = [
        '<%= bower.directory %>/angular-carousel/dist/angular-carousel.css',
        'assets/less/main.less',
        '<%= bower.directory %>/onesearch/src/**/*.less',
        '<%= bower.directory %>/ualib-ui/dist/*.css',
        '<%= bower.directory %>/ualib-hours/dist/*.css',
        '<%= bower.directory %>/ualib_staffdir/dist/staffdir.css',
        '<%= bower.directory %>/ualib-softwareList/dist/ualib.softwareList.css',
        '<%= bower.directory %>/ualib-news/dist/ualib.news.css',
        '<%= bower.directory %>/manage/dist/manage.css',
        '<%= bower.directory %>/databases/dist/databases.css'
    ];


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: grunt.file.readJSON('.bowerrc'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'assets/js/*.js',
                '!assets/js/scripts.js',
                '!assets/**/*.min.*'
            ]
        },
        less: {
            dev: {
                files: {
                    'assets/css/main.css': [lessFileList]
                },
                options: {
                    compress: false,
                    // LESS source map
                    // To enable, set sourceMap to true and update sourceMapRootpath based on your install
                    sourceMap: true,
                    sourceMapFilename: 'assets/css/main.css.map',
                    sourceMapRootpath: '/wp-content/themes/roots/'
                }
            },
            build: {
                files: {
                    'assets/css/main.min.css': [lessFileList]
                },
                options: {
                    compress: true
                }
            }
        },
        html2js:{
            dev: {
                src: 'assets/js/**/*.tpl.html',
                dest: 'assets/js/ualib-templates.js',
                module: 'ualib.templates'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [jsFileList],
                dest: 'assets/js/scripts.js'
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= bower.directory %>/fontawesome/fonts',
                    src: ['**'],
                    dest: 'assets/fonts',
                    filter: 'isFile'
                }]
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: [
                    {
                        'assets/src/scripts.js': ['assets/src/scripts.js']
                    }
                ]
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'assets/js/scripts.min.js': [jsFileList]
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
            },
            dev: {
                options: {
                    map: {
                        prev: 'assets/css/'
                    }
                },
                src: 'assets/css/main.css'
            },
            build: {
                src: 'assets/css/main.min.css'
            }
        },
        modernizr: {
            build: {
                devFile: '<%= bower.directory %>/modernizr/modernizr.js',
                outputFile: 'assets/js/vendor/modernizr.min.js',
                files: {
                    'src': [
                        ['assets/js/scripts.min.js'],
                        ['assets/css/main.min.css']
                    ]
                },
                extra: {
                    shiv: false
                },
                uglify: true,
                parseFiles: true
            }
        },
        version: {
            default: {
                options: {
                    format: true,
                    length: 32,
                    manifest: 'assets/manifest.json',
                    querystring: {
                        style: 'roots_css',
                        script: 'roots_js'
                    }
                },
                files: {
                    'lib/scripts.php': 'assets/{css,js}/{main,scripts}.min.{css,js}'
                }
            }
        },
        replace: {
            devToLive: {
                src: ['assets/js/scripts.min.js'],
                dest: 'assets/js/',
                replacements: [{
                    from: /(wwwdev2?)/g,
                    to: 'www'
                }]
            }
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ['pkg'],
                commit: false,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json', 'bower.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        },
        watch: {
            less: {
                files: [
                    'assets/less/*.less',
                    'assets/less/**/*.less'
                ],
                tasks: ['less:dev', 'autoprefixer:dev']
            },
            js: {
                files: [
                    jsFileList,
                    '<%= jshint.all %>'
                ],
                tasks: ['jshint', 'concat']
            },
            livereload: {
                // Browser live reloading
                // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
                options: {
                    livereload: false
                },
                files: [
                    'assets/css/main.css',
                    'assets/js/scripts.js',
                    'templates/*.php',
                    '*.php'
                ]
            }
        },
        lessToSass: {
            lessVars: {
                files: [{
                    expand: true,
                    cwd: 'assets/less',
                    src: ['_variables.less'],
                    ext: '.scss',
                    dest: 'assets/sass'
                }]
            }
        }
    });

    // Register tasks
    grunt.registerTask('default', [
        'dev'
    ]);
    grunt.registerTask('dev', [
        'html2js:dev',
        'jshint',
        'less:dev',
        'autoprefixer:dev',
        'concat'
    ]);
    grunt.registerTask('live-build', [
        'html2js',
        'jshint',
        'copy',
        'less:build',
        'autoprefixer:build',
        'concat',
        'ngAnnotate',
        'uglify',
        'modernizr',
        'version',
        'replace:devToLive'
    ]);
    grunt.registerTask('lessVarsToSass', ['lessToSass:lessVars']);
};