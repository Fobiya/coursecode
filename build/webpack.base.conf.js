const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const { VueLoaderPlugin } = require('vue-loader')



const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: ''
}

module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src
  },
  output: {
    filename: `${PATHS.assets}js/main.min.js?v=[hash]`,
    path: PATHS.dist,
    publicPath: ''
  },
  module: {

    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, 
//    {
//      test: /\.vue$/,
//      loader: 'vue-loader',
//      options: {
//        loader: {
//          scss: 'vue-style-loader!css-loader!sass-loader'
//        }
//      }
//    }, 
            
     {
        test: /\.(png|jp(e*)g)$/,  
        use: [{
            loader: 'url-loader',
            loader: 'file-loader',
            options: { 
                limit: 8000, // Convert images < 8kb to base64 strings
//                name: 'img/[hash].[ext]'
                name: 'img/[name].[ext]',
             publicPath: '../',
          outputPath:'',
          useRelativePath: true
            } 
        },
         {
          loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 80
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.80, 0.90],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                }
          }
         }]
      },
      //File loader used to load fonts
            
      {
        test: /\.(svg)$/,  
        use: [{
//          loader: 'file-loader',
          loader: 'image-webpack-loader',
            options: { 

//                name: 'img/[hash].[ext]'
                name: 'img/[name].[ext]',

            } 
        }]
      },    

    {
      // Match woff2 in addition to patterns like .woff?v=1.1.1.
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: "url-loader",
//        loader: "file-loader",
        options: {
          // Limit at 50k. Above that it emits separate files
          limit: 5000,

          // url-loader sets mimetype if it's passed.
          // Without this it derives it from the file extension
//          mimetype: "application/font-woff",

          // Output below fonts directory
            
//          name: "[name].[ext]",
//            publicPath: "../fonts/[name]/[name].[ext]", // Take the directory into account
             filename: `${PATHS.assets}fonts/[name]/[name].[ext]`,
             name: "fonts/[name]/[name].[ext]",
             publicPath: '../',
          outputPath:'',
          useRelativePath: true

        }
      },
    },{
        test: /\.pug$/,
     
          loader: 'pug-loader',
          options: {
            pretty: true,
            self: true,
          },
    
      },

    {
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true  /* , url: false  */ }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` }  }
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true /* , url: false  */ }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } }
        }
      ]
    }]
  },
//  resolve: {
//    alias: {
//      'vue$': 'vue/dist/vue.js'
//    }
//  },
  plugins: [
//    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
        
 
    filename: `${PATHS.assets}css/min.css?v=[hash]`,
   
        
    publicPath: '../'
    }),
//    new MiniCssExtractPlugin({
//      filename: `${PATHS.src}/css/fonts.css`,
//    }),
    // Copy HtmlWebpackPlugin and change index.html for another html page
    new HtmlWebpackPlugin({

//      hash: false,
      template: `${PATHS.src}/index.pug`,
      filename: './index.html',
    
    }),    
//    new HtmlWebpackPlugin({
//      hash: false,
//      template: `${PATHS.src}/home.pug`,
//      filename: './home.html'
//    }),        
//    new HtmlWebpackPlugin({
//      hash: false,
//      template: `${PATHS.src}/single.pug`,
//      filename: './single.html'
//    }),          
//    new HtmlWebpackPlugin({
//      hash: false,
//      template: `${PATHS.src}/user.pug`,
//      filename: './user.html'
//    }),            
//    new HtmlWebpackPlugin({
//      hash: false,
//      template: `${PATHS.src}/signup.pug`,
//      filename: './signup.html'
//    }),               
//    new HtmlWebpackPlugin({
//      hash: false,
//      template: `${PATHS.src}/login.pug`,
//      filename: './login.html'
//    }),    
    
    
//    new HtmlWebpackPlugin({
//      hash: false,
//      template: `${PATHS.src}/500.html`,
//      filename: './500.html'
//    }),
    new CopyWebpackPlugin([
//      { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/static`, to: '' },
      { from: `${PATHS.src}/img`, to: 'img' },
//      { from: `${PATHS.src}/css`, to: 'css' }
//      { from: `${PATHS.src}/fonts`, to: 'fonts' }        
    ])
  ],
};
