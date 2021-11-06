// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: "my_company.html",
      filename: 'my_company.html'
    }),
    new HtmlWebpackPlugin({
      template: "team_reports.html",
      filename: 'team_reports.html'
    }),
    new HtmlWebpackPlugin({
      template: "team_members.html",
      filename: 'team_members.html'
    }),
    new HtmlWebpackPlugin({
      template: "weekly_report_history.html",
      filename: 'weekly_report_history.html'
    }),
    new HtmlWebpackPlugin({
      template: "inviteYourTeam.html",
      filename: 'inviteYourTeam.html'
    }),
    new HtmlWebpackPlugin({
      template: "yourTeamMember.html",
      filename: 'yourTeamMember.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'edit_member_dialog.html',
      template: './edit_member_dialog.html'}),
    new HtmlWebpackPlugin({
      filename: 'fill_out_report.html',
      template: './fill_out_report.html'}),
    new HtmlWebpackPlugin({
      filename: 'my_reports.html',
      template: './my_reports.html'}),
    new HtmlWebpackPlugin({
      filename: 'edit_member_information.html',
      template: './edit_member_information.html'}),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(jpg|png|svg|jpeg|gif)$/,
        type: 'src/images'
      },
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;

};
