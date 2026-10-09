"""Exercise the real PHP/cURL relay against a local HTTP server."""
import http.server,json,os,shutil,socket,subprocess,tempfile,threading,time,unittest,urllib.request
from pathlib import Path
class ProxyTests(unittest.TestCase):
 def test_menu_get_and_action_post_keep_method_authorization_and_body(self):
  php=shutil.which('php')
  if not php or 'curl' not in subprocess.check_output([php,'-m'],text=True).lower():self.skipTest('PHP cURL unavailable')
  calls=[]
  class Backend(http.server.BaseHTTPRequestHandler):
   def handle_request(self):
    body=self.rfile.read(int(self.headers.get('Content-Length',0)))
    calls.append((self.command,self.path,self.headers.get('Authorization'),body))
    data=json.dumps({'characters':['Joshua']} if self.command=='GET' else {'message':'Partie ouverte.'}).encode()
    self.send_response(200);self.send_header('Content-Type','application/json');self.end_headers();self.wfile.write(data)
   do_GET=do_POST=handle_request
   def log_message(self,*args):pass
  backend=http.server.ThreadingHTTPServer(('127.0.0.1',0),Backend);thread=threading.Thread(target=backend.serve_forever,daemon=True);thread.start()
  with tempfile.TemporaryDirectory()as folder:
   source=Path(__file__).resolve().parents[1]/'activity/deploy/api.php'
   Path(folder,'api.php').write_text(source.read_text().replace('127.0.0.1:3000','127.0.0.1:'+str(backend.server_port)))
   with socket.socket()as sock:sock.bind(('127.0.0.1',0));port=sock.getsockname()[1]
   flags=subprocess.CREATE_NO_WINDOW if os.name=='nt'else 0
   server=subprocess.Popen([php,'-S','127.0.0.1:'+str(port),'-t',folder],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,creationflags=flags)
   try:
    url='http://127.0.0.1:'+str(port)+'/api.php?r=terminal'
    for _ in range(100):
     try:
      with socket.create_connection(('127.0.0.1',port),timeout=.1):break
     except OSError:time.sleep(.05)
    with urllib.request.urlopen(urllib.request.Request(url,headers={'Authorization':'Bearer fixture'}))as r:self.assertEqual(json.load(r),{'characters':['Joshua']})
    data=json.dumps({'action':'hunt_create','request':'request-fixture'}).encode()
    with urllib.request.urlopen(urllib.request.Request(url,data=data,headers={'Authorization':'Bearer fixture','Content-Type':'application/json'}))as r:self.assertEqual(json.load(r),{'message':'Partie ouverte.'})
    self.assertEqual(calls,[('GET','/api/terminal','Bearer fixture',b''),('POST','/api/terminal','Bearer fixture',data)])
   finally:server.terminate();server.wait();backend.shutdown();backend.server_close()
if __name__=='__main__':unittest.main()
