
import SocketServer

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print ("serving at port"), PORT
httpd.serve_forever()
