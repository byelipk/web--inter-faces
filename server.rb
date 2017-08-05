require 'webrick'

server = WEBrick::HTTPServer.new(
  :BindAddress => "192.168.0.16",
  :Port => 8000,
  :DocumentRoot => Dir.pwd)

trap 'INT' do server.shutdown end

server.start
