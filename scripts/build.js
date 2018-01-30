const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const { rmdir } = require('./shell');
const { generate } = require('./rollup/build');

const ProjectRoot = path.resolve(__dirname, '..');
const argv = process.argv.slice(2);
const distPackagesDir = path.resolve(ProjectRoot, 'dist/packages');
const packages = ['reconciler'];

const getPackagePath = (pkg) => {
	return path.resolve(ProjectRoot, `packages/${pkg}/`);
}

const clear = () => {
	packages.forEach(p => {
		rmdir(path.resolve(distPackagesDir, p));
	});
}

const getCommand = () => {
	let tsc = path.resolve(ProjectRoot, 'node_modules/typescript/bin/tsc');
	return `node ${tsc}`;
};

const getArgs = () => {
	let args = ['-p'];
	packages.forEach(p => args.push(getPackagePath(p)));
	return args;
};

const copyRests = () => {
	packages.forEach(p => {
		let dest = path.resolve(distPackagesDir, p, 'package.json');
		let src = path.resolve(ProjectRoot, 'packages', p, 'package.json');
		fs.copyFileSync(src, dest);
	});
}

const run = () => {
	let command = getCommand();
	let args = getArgs();
	try {
		execSync(`${command} ${args.join(' ')}`);
	} catch (err) {
		console.log(err);
	}
	copyRests();
	console.log(`[success]`);
}

clear();
run();
packages.forEach(p => {
	generate({
		input: path.resolve(distPackagesDir, p, 'index.js')
	}, {
		file: path.resolve(distPackagesDir, p + '.js'),
		format: 'iife',
		name: p
	});
});