const rollup = require('rollup');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const { rmdir } = require('./shell');

// see below for details on the options
const inputOptions = {
	input: null
};
const outputOptions = {};

async function build() {
	// create a bundle
	const bundle = await rollup.rollup(inputOptions);

	console.log(bundle.imports); // an array of external dependencies
	console.log(bundle.exports); // an array of names exported by the entry point
	console.log(bundle.modules); // an array of module objects

	// generate code and a sourcemap
	const { code, map } = await bundle.generate(outputOptions);

	// or write the bundle to disk
	await bundle.write(outputOptions);
}

// build();

const argv = process.argv.slice(2);
const distPackagesDir = path.resolve(__dirname, '../../dist/packages');

const getPackagePath = (pkg) => {
	return path.resolve(__dirname, `../../packages/${pkg}/`);
}

const clear = (pkg) => {
	rmdir(path.resolve(distPackagesDir, pkg));
}

const getCommand = (pkgp) => {
	let tsc = path.resolve(__dirname, '../../node_modules', 'typescript/bin/tsc');
	return `node ${tsc} -p ${pkgp}`;
};

const run = (pkg) => {
	for (var i = 0; i < argv.length; i++) {
		let pkgp = getPackagePath(pkg);
		let command = getCommand(pkgp);
		let stdout = execSync(command);
			let dist = path.resolve(__dirname, distPackagesDir, pkg, 'package.json');
			fs.copyFileSync(path.resolve(__dirname, pkgp, 'package.json'), dist);
			console.log(`[success]copy ${pkgp}`);
	}
}

clear(argv[0]);
run(argv[0]);
