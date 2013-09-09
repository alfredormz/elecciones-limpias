require 'rake/testtask'

Rake::TestTask.new do |t|
  t.libs.push "test"
  t.libs.push "lib"
  t.libs.push "app/models"
  t.test_files = FileList['test/**/*_test.rb']
  t.verbose = true
end
