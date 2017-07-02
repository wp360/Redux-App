import path from 'path';

export default{
    devtools: 'evel-source-map',
    entry: path.join(__dirname,'/client/index.js'),
    output:{
        path: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname,'client'),
                loaders: ['babel']
            }
        ]
    },
    resolve: {
        extentions: ['','.js']
    }
}