exports.onPostBootstrap =  ({ graphql }, pluginOptions) => {
    console.log('In custom plugin post bootstrap');
    console.log(graphql);
    console.log(pluginOptions);
    return Promise.resolve();
};

exports.onPostBuild =  ({ graphql }, pluginOptions) => {
    console.log('In custom plugin post bootstrap');
    console.log(graphql);
    console.log(pluginOptions);
    return Promise.resolve();
};
