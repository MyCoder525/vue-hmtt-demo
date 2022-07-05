module.exports = {
  plugins: {
    'autoprefixer': {
      Browserslist: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      // 根据设计稿的尺寸设置的rootValue大小
      //自己的设计稿应该是75
      //vant 组件的rootValue 应该设置为37.5
      // rootValue: 37.5,
      rootValue:(arg)=>{
        return arg.file.includes("vant") ? 37.5 :75;
      },
      propList: ['*'] 
    }
  }
}

