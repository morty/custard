fs = require 'fs'
which = require 'which'
{spawn, exec} = require 'child_process'
async = require 'async'

pkg = JSON.parse fs.readFileSync('./package.json')
testCmd = pkg.scripts.test
startCmd = pkg.scripts.start
 
log = (message, explanation) ->
  console.log "#{message} #{explanation or ''}"

compile = (outputDir, inputDir, watch, callback) ->
  options = ['-c','-b']
  options.push('-w') if watch is true
  options = options.concat ['-o', outputDir, inputDir]
  cmd = which.sync 'coffee'
  coffee = spawn cmd, options
  coffee.stdout.pipe process.stdout
  coffee.stderr.pipe process.stderr
  coffee.on 'exit', (status) -> callback?()
  coffee

# Compiles app.coffee and src directory to the app directory
build = (watch, callback) ->
  async.parallel [
    (cb) -> compile('server/js', 'server/code', watch, cb),
    (cb) -> compile('shared/js', 'shared/code', watch, cb)
  ]

task 'clean', ->
  console.log "Cleaning database and inserting fixtures"
  cp = require 'child_process'
  cp.exec 'test/cleaner.coffee'
   
  

task 'build', ->
  build false, ->
    process.exit 0

task 'test', 'Run unit tests', ->
  build -> test process.argv[3..]

task 'dev', 'start dev env', ->
  log 'Watching coffee files'
  supervisor = spawn 'node', ['./node_modules/supervisor/lib/cli-wrapper.js','-w','server/js,server/template,shared/js', '-e', 'js|html', 'server']
  supervisor.stdout.pipe process.stdout
  supervisor.stderr.pipe process.stderr
  log 'Watching js files and running server'
  build true, ->
    # watch_js

Selenium = ->
  se = spawn 'java', ['-jar', 'selenium-server-standalone-2.29.0.jar',
    '-Dwebdriver.chrome.driver=chromedriver']
  se.stdout.pipe process.stdout
  se.stderr.pipe process.stderr
  log 'Selenium started'

task 'se', 'start selenium', Selenium
task 'Se', 'start Selenium', Selenium
