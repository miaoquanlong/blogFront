module.exports = {
        devServer :{
            host: '0.0.0.0',
            port: 3001,
            proxy: {
                '/api': {
                    target: 'http://localhost:3000/',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api/': ''
                    }
                }
            }
        }
}

// let devServer = {
//     host: '0.0.0.0',
//     port: 3001,
//     proxy: {
//         '/api': {
//             target: 'http://localhost:3000/',
//             changeOrigin: true,
//             pathRewrite: {
//                 '^/api/': ''
//             }
//         }
//     }
// }
// // }
// export default devServer