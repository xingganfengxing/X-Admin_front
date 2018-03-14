# X-Admin后台管理系统API文档(v1.0)

## 0. 全局异常响应信息
```
{
  "status": 0,
  "message": "fail",
  "result": {
    "code": "0001",
    "error": "自定义异常名字",
    "message": "异常详细信息",
    "detail": "系统解决异常途径",
    "exception": "系统异常名称",
    "path": "异常发生位置" 
  }
}
```

> 此适用于全部

## 1. 管理员相关请求

### 1.1 管理员登录
请求：
```
POST /admin/login
```
参数：
```
username: "leaf"
password: "123456"
``` 
响应：
```
正确:
{
  "status": 1,
  "message": "success",
  "result": {
    "id": "410962076853338112",
    "name": "leaf",
    "pass": "2942ac7f99804ca7",
    "token": "管理员请求token"    
  }
}
错误:
参见第0条
```
### 1.2 获取在线管理员列表
请求：
```
GET /admin/getAll
```
参数：
```
current: 1
size: 8
```
响应：
```
正确:
{
  "status": 1,
  "message": "success",
  "result": [
    {
       "sessionId": "54213464321321",
       "name": "张三",
       "loginTime": 1520934108,
       "recentRequestTime": 1520934108,
       "loginIP": "192.168.1.1",
       "isForceLogout": true
    },
    {
      "sessionId": "54213464545123",
      "name": "李四",
      "loginTime": 1520934108,
      "recentRequestTime": 1520934108,
      "loginIP": "192.168.1.1",
      "isForceLogout": false
    }
  ]
}
错误:
参见第0条
```

### 1.3 获取在线管理员分页信息
请求：
```
GET /admin/getAllPageInfo
```
参数：
```
无
```
响应：
```
正确:
{
  "status": 1,
  "message": "success",
  "result": {
    "size": 12,
    "total": 20,
    "page": 2
  }
}
错误:
参见第0条
```

## 2. 验证相关请求

### 2.1 图片验证码
请求：
```
POST /verify/generate
```
参数：
```
无
```
响应：
```
正确:
{
  "status": 1,
  "message": "success",
  "result": "图片验证码Base64编码"
}
错误:
参见第0条
```

### 2.2 图片验证码验证
请求：
```
POST /verify/valid
```
参数：
```
code: "S4du"
```
响应：
```
正确:
{
  "status": 1,
  "message": "success",
  "result": true 
}
错误:
{
  "status": 0,
  "message": "fail",
  "result": fail
}
```
## 3. 用户相关请求

### 3.1 获取在线用户列表
请求：
```
GET /user/getAll
```
参数：
```
current: 1
size: 8
```
响应：
```
正确:
{
  "status": 1,
  "message": "success",
  "result": [
    {
       "sessionId": "54213464321321",
       "name": "张三",
       "loginTime": 1520934108,
       "recentRequestTime": 1520934108,
       "loginIP": "192.168.1.1",
       "isForceLogout": true
    },
    {
      "sessionId": "54213464545123",
      "name": "李四",
      "loginTime": 1520934108,
      "recentRequestTime": 1520934108,
      "loginIP": "192.168.1.1",
      "isForceLogout": false
    }
  ]
}
错误:
参见第0条
```

### 3.2 获取在线用户分页信息
请求：
```
GET /user/getAllPageInfo
```
参数：
```
无
```
响应：
```
正确:
{
  "status": 1,
  "message": "success",
  "result": {
    "size": 12,
    "total": 20,
    "page": 2
  }
}
错误:
参见第0条
```


