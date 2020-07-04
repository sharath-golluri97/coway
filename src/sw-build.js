const workboxBuild = require('workbox-build');
// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
    // This will return a Promise
    return workboxBuild.injectManifest({
        swSrc: 'src/sw.js', // this is your sw template file
        swDest: 'build/sw.js', // this will be created in the build step
        globDirectory: 'build',
        globPatterns: [
            '**\/*.{js,css,html,png}',
        ]
    }).then(({count, size, warnings}) => {
        // Optionally, log any warnings and details.
        warnings.forEach(console.warn);
        console.log(`${count} files will be precached, totaling ${size} bytes.`);
    });
}
buildSW();
//
// const buildSW = () => {
//     // The build is expected to fail if the
//     // sw install rules couldn't be generated.
//     // Add a catch block to handle this scenario.
//     return workboxBuild
//         .injectManifest({
//             swSrc: "src/sw-custom.js", // custom sw rule
//
//             swDest: "build/sw.js", // sw output file (auto-generated
//
//             globDirectory: "build",
//
//             globPatterns: ["**/*.{js,css,html,png,svg}"],
//             // globPatterns: ["**/!(service-worker|precache-manifest.*).{js,css,html,png,svg}"],
//
//             maximumFileSizeToCacheInBytes: 30 * 1024 * 102,
//         })
//         .then(({ count, size, warnings }) => {
//             warnings.forEach(console.warn);
//             console.info(`${count} files will be precached,
//                   totaling ${size / (1024 * 1024)} MBs.`);
//         });
// };

