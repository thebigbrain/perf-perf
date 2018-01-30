// const MemoryFileSystem = require("memory-fs");
// const fs = new MemoryFileSystem();
const fs = require('fs');
const path = require('path');

const noop = () => {};

const isFile = (p) => {
  let stats = fs.lstatSync(p);
  return stats.isFile();
}

const isDir = (p) => {
  let stats = fs.lstatSync(p);
  return stats.isDirectory();
}

exports.fs = fs;

exports.delFile = (file) => {
  fs.unlinkSync(file);
}

exports.rmdir = (dir) => {
  if(!fs.existsSync(dir)) return;
  let remove = (d, cb) => {
    let files = fs.readdirSync(d);
    for (let i = 0; i < files.length; i++) {
      let p = path.resolve(d, files[i]);
      if (isDir(p)) {
        remove(p);
      } else {
        exports.delFile(p);
      }
    }
    fs.rmdirSync(d);
  }
  remove(dir);
}
