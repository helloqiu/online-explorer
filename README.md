# Online Explorer
An online file explorer.
# Install
Use npm:
```
npm i online-explorer
```
`Note: Please do not use the git version directly. Remember to build fist.`
# Usage
```
Usage: online-explorer [options]

  Options:

    -h, --help        output usage information
    -V, --version     output the version number
    --host <host>     host on which to listen to (default 127.0.0.1)
    -p --port <port>  port on which to listen to (default 3000)
```
Or try docker:
```
docker run -d \
  --name online-explorer \
  --restart always \
  -p 3000:3000\
  -v path-you-want-to-explore:/web-files helloqiu95/online-explorer
```
# ScreenShot
![screenshot-1](/screenshot/screenshot.png?raw=true "screenshot-1")
![screenshot-2](/screenshot/screenshot-search.png?raw=true "screenshot-2")  
# License
MIT
