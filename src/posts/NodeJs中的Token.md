---
id: nodejs-token
title: NodeJs中的Token
date: 2020/7/9
tags:
  - NodeJs
---

## 一、Token

- 什么是 Token？

  Token 指访问资源的凭据，是一种身份认证的方式，它是解决跨域认证的最流行的一种方式。

- 为什么用 Token？

  以前较为流行的是通过 session 去做身份认证，session 是通过服务器中保存会话数据来做身份认证，这种方式会导致在高并发中服务器压力过大的情况，还有就是，如果是服务器集群，那么就需要这些服务器 session 共享。

  Token 不在服务器中保存会话数据，而是保存在客户端。每次请求的 headers 中存入 Token，在服务器中判断 Token 的有效性，是否可以访问资源。

- 传统 Token 和 JWT 的区别

  - 传统 Token

    用户发起登录请求，登录成功之后返回 Token，并且存于数据库，用户访问资源的时候需要携带 Token，服务端获取 Token 之后和数据库中的对比。

  - JWT

    用户发起登录请求，登录成功之后返回 Token，但是不存于数据库，用户访问资源的时候需要携带 Token，服务端获取 Token 之后去校验 Token 的合法性。

<!-- more -->

## 二、JWT 实现过程

- JWT 分为三个部分 header、payload、verify signature

- header

  内部包含有签名算法、Token 类型，然后通过`base64url算法`转成字符串

  ```json
  //明文例子：
  {
    "alg": "HS256",
    "typ": "JWT"
  }
  ```

- payload

  内部包含 JWT 标准数据和自定义数据，然后通过`base64url算法`转成字符串

  JWT 标准数据常见的有：

  - iss：提供方。
  - sub：主题，一般是用户 ID。
  - exp：过期时间。
  - iat：创建时间。
  - jti：token 的唯一标识。

  可选择性使用以上标准数据

  ```json
  //明文例子：
  {
    "id": 3,
    "name": "Bmongo",
    "age": 18,
    "iat": 1588139323,
    "exp": 1588139333
  }
  ```

  注意：由于 JWT 是默认不加密的，所以在这边不要存敏感信息

- verify signature

  这部分是对前两部分的签名，防止数据的篡改

  secret 是服务器端保存的密钥，只有服务器端知道，再使用 header 中所指定的签名算法对上面的俩部分进行签名，按照以下公式生成签名

  ```js
  HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret);
  ```

  算出签名之后，把三部分通过`.`分隔开返回给用户就行了

  JWT 例子：

```
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5hbWUiOiLlvKDkuIkiLCJhZ2UiOjE2LCJpYXQiOjE1ODgxMzkzMjMsImV4cCI6MTU4ODEzOTMzM30.WzZp_aNgiw4iTsX7buxMhZe0z0e94Ve6ImEZ8L8L78c
```

- 客户端请求

  每次客户端的请求都需要带上这个 token，一般是把 token 写入到请求的 headers 中

## 三、Node.js 中使用

Node.js 中使用 JWT

### 1.开始使用

通过 npm 包`jsonwebtoken`来完成 token 的生成和验证

```bash
npm install --save jsonwebtoken
```

### 2.生成、验证 Token

```js
const jwt = require("jsonwebtoken"); // [!code highlight]
//撒盐，加密时候混淆
const secret = "113Bmongojsdalkfnxcvmas";

//生成token
//info也就是payload是需要存入token的信息
function createToken(info) {
  let token = jwt.sign(info, secret, {
    //Token有效时间 单位s
    expiresIn: 60 * 60 * 10,
  });
  return token;
}

//验证Token
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
```

### 3.使用

```js
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
//撒盐，加密时候混淆
const secret = "113Bmongojsdalkfnxcvmas";
const user = {
  id: 10,
  name: "Bmongo",
  age: 16,
};

//生成token
//info也就是payload是需要存入token的信息
function createToken(info) {
  let token = jwt.sign(info, secret, {
    //Token有效时间 单位s
    expiresIn: 60 * 60 * 10,
  });
  return token;
}

//验证Token
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

//设置允许跨域
app.use(function (req, res, next) {
  //指定允许其他域名访问 *所有
  res.setHeader("Access-Control-Allow-Origin", "*");
  //允许客户端请求头中带有的
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
  );
  //允许请求的类型
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", " 3.2.1");
  //让options请求快速返回
  if (req.method == "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
});

//白名单
const whiteList = ["/login"];

app.use((req, res, next) => {
  if (!whiteList.includes(req.url)) {
    verifyToken(req.headers.authorization)
      .then((res) => {
        next();
      })
      .catch((e) => {
        res.status(401).send("invalid token");
      });
  } else {
    next();
  }
});

app.post("/login", (req, res) => {
  let token = createToken(user);
  res.json({ token });
});

app.get("/api/info", (req, res) => {
  res.send({
    result: 1,
    data: {
      name: "Bmongo",
      id: 1,
    },
  });
});
```
