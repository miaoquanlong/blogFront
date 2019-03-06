module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 3001,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3303',
                changeOrigin: true,
                pathRewrite: {
                    '^/api/': ''
                }
            }
        }
    },
    
    // rules: [{
    //     test: /\.scss$/,
    //     use: [{
    //         loader: "style-loader" // 将 JS 字符串生成为 style 节点
    //     }, {
    //         loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
    //     }, {
    //         loader: "sass-loader" // 将 Sass 编译成 CSS
    //     }]
    // }]
}
