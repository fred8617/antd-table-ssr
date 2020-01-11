const App = require("./App").default;
const Koa = require("koa");
const React = require("react");
const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
const koaStatic = require("koa-static");
const { renderToString } = require("react-dom/server");
const { ApolloServer, gql } = require("apollo-server-koa");
const { renderToStringWithData } = require("@apollo/react-ssr");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Person {
    id: Int
    name: String
    age: Int
    gender: String
  }
  type Query {
    dataSource: [Person]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    dataSource: () => [
      { id: 1, name: "张三", age: 35, gender: "男" },
      { id: 2, name: "张四", age: 25, gender: "男" }
    ]
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
// 配置文件
const config = {
  port: 3030
};

// 实例化 koa
const app = new Koa();
server.applyMiddleware({ app });
// 静态资源
app.use(
  koaStatic(path.join(__dirname, "../build"), {
    maxage: 365 * 24 * 60 * 1000,
    index: "root"
    // 这里配置不要写成'index'就可以了，因为在访问localhost:3030时，不能让服务默认去加载index.html文件，这里很容易掉进坑。
  })
);

// 设置路由
app.use(
  new Router()
    .get("*", async (ctx, next) => {
      ctx.response.type = "html"; //指定content type
      let shtml = "";
      await new Promise((resolve, reject) => {
        fs.readFile(
          path.join(__dirname, "../build/index.html"),
          "utf8",
          function(err, data) {
            if (err) {
              reject();
              return console.log(err);
            }
            shtml = data;
            resolve();
          }
        );
      });
      const renderString = await renderToStringWithData(
        React.createElement(App)
      );
      console.log(renderString);
      
      // 替换掉 {{root}} 为我们生成后的HTML
      ctx.response.body = shtml.replace("{{root}}", renderString);
    })
    .routes()
);

app.listen(config.port, function() {
  console.log("服务器启动，监听 port： " + config.port + "  running~");
});
