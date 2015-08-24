module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('frontend','Build HTML & CSS for Frontend', function() {
    var
    done = this.async(),
    path = './src/main/frontend';

    grunt.util.spawn({
      cmd: 'npm',
      args: ['install'],
      opts: { cwd: path, stdio: 'inherit' }
    }, function (err, result, code) {
      if (err || code > 0) {
        grunt.fail.warn('Failed installing node modules in "' + path + '".');
      }
      else {
        grunt.log.ok('Installed node modules in "' + path + '".');
      }

      process.chdir(path);
      require(path + '/Gruntfile.js')(grunt);
      grunt.task.run('newer:copy');
      grunt.task.run('newer:less');
      grunt.task.run('newer:svgstore');

      done();
    });
  });


  grunt.registerTask('default', [ 'frontend' ]);

};
