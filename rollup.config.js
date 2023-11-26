import babel from 'rollup-plugin-babel'
export default {
  input: './src/index.js',
  output: {
    file: './dist/vue.js',
    name: 'Vue',//全局挂载
    // 打包格式
    format: 'umd',
    sourcemap: true
  },
  plugins:[
    babel({
      // 排除文件夹
      exclude: 'node_modules'
    })
  ]
}