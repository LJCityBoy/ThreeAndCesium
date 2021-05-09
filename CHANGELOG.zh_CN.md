# dev 分支新建，主要是用于本人开发
> 安装依赖过程遇到的报错
    > gifsicle@5.2.0 postinstall /usr/local/lib/node_modules/miniprogram-slim/node_modules/gifsicle
> node lib/install.js
 
  ⚠ connect ECONNREFUSED 0.0.0.0:443
  ⚠ gifsicle pre-build test failed
  ℹ compiling from source
  ✖ Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/miniprogram-slim/node_modules/gifsicle/14acef94-4a69-4709-887f-16c28fb0a7b4'
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! gifsicle@5.2.0 postinstall: `node lib/install.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the gifsicle@5.2.0 postinstall script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
 
npm ERR! A complete log of this run can be found in:

* 解决办法：npm install --ignore-scripts


* 如果还是没解决问题，可以设置一下host文件，在git上有个开源的host文件 [https://github.com/googlehosts/hosts]

* 如果浏览器运行一直卡在启动页，并且报persistent.ts:21 Uncaught SyntaxError: Unexpected token .绝大多数原因是浏览器版本过低问题