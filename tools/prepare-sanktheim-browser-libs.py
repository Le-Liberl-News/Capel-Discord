"""Prepare private Chromium libraries for older shared Linux hosts; no root changes."""
import hashlib, pathlib, subprocess, tempfile, urllib.request
root = pathlib.Path(__file__).resolve().parent.parent
output = root / 'prototypes/sanktheim/assets/browser-libs'
packages = [
 ('nspr', 'libnspr4_4.20-1_amd64.deb', 'e6188fdd91ec215d12d4eca5211c2406874eb17f5b1c09d6355641a349adcec0'),
 ('nss', 'libnss3_3.42.1-1+deb10u5_amd64.deb', '665a09fc51d273fc71abcda80abcae1c50f380b2d5e660c908b729aeaf6fb6c1'),
]
with tempfile.TemporaryDirectory(prefix='capel-browser-libs-') as work:
 for folder, name, checksum in packages:
  url = 'https://archive.debian.org/debian/pool/main/n/' + folder + '/' + name
  with urllib.request.urlopen(url, timeout=60) as response: data = response.read()
  if hashlib.sha256(data).hexdigest() != checksum: raise RuntimeError('Library checksum mismatch: ' + name)
  package = pathlib.Path(work) / name
  package.write_bytes(data)
  subprocess.run(['dpkg-deb', '-x', str(package), str(output)], check=True)
print('Private NSS/NSPR libraries prepared and verified.')
