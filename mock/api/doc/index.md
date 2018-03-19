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

### 1.4 清理指定用户权限
请求：
```
POST /admin/clearAuth
```
参数：
```
name: "leaf"
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
  "result": false
}
```

### 1.5 强制注销指定用户
请求：
```
POST /admin/forceLogout
```
参数：
```
name: "leaf"
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
  "result": false
}
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
GET /user/online/getAll
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
GET /user/online/getPage
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
### 3.3 查看指定用户信息
请求：
```
GET /user/getInfo
```
参数：
```
id: "544213131354582"
```
响应：
```
正确:
{
  "status": 1,
  "message": "success",
  "result": {
    "id": "544213131354582",
    "name": "leaf”,
    "avatar": "http://dummyimage.com/50x50/f2e779&text=leaf",
    "age": 18,
    "sex": "男",
    "desc": "为了王者的荣耀!!!",
  }
}
错误:
参见第0条
```

### 3.4 获取指定用户角色列表
请求:
```
GET /user/getRoles
```
参数:
```
id: "544213131354582"
```
响应：
```
正确:
{
  "status": 1,
  "message": "success",
  "result": [
    {
      "id": "544213131354582",
      "name": "新用户",
      "desc": "新注册用户角色集合",
      "type": 1
    },
    {
      "id": "544213131354583",
      "name": "老用户",
      "desc": "老用户角色集合",
      "type": 1
    },
    {
      "id": "544213131354584",
      "name": "未知用户",
      "desc": "未知用户角色集合",
      "type": 1
    },
  ]
}
错误:
参见第0条
```

### 3.5 获取指定用户权限列表
请求:
```
GET /user/getPerms
```
参数:
```
id: "544213131354582"
```
响应：
```
正确:
{
  "status": 1,
  "message": "success",
  "result": [
    {
      "id": "544213131354582",
      "name": "测试权限1",
      "desc": "测试权限1",
      "type": 1
    },
    {
      "id": "544213131354583",
      "name": "测试权限2",
      "desc": "测试权限2",
      "type": 1
    },
    {
      "id": "544213131354584",
      "name": "测试权限3",
      "desc": "测试权限3",
      "type": 1
    }
  ]
}
错误:
参见第0条
```

### 3.6 获取指定用户资源列表
请求:
```
GET /user/getRoles
```
参数:
```
id: "544213131354582"
```
响应：
```
正确:
{
  "status": 1,
  "message": "success",
  "result": [
    {
      "id": "544213131354582",
      "path": "/user/login",
      "name": "用户登录",
      "desc": "用户登录请求接口",
      "type": 1
    },
    {
      "id": "544213131354583",
      "path": "/user/register",
      "name": "用户注册",
      "desc": "用户注册请求接口",
      "type": 1
    }
  ]
}
错误:
参见第0条
```

### 3.7 移除用户指定角色

请求:
```
DELETE /user/removeRole
```
参数:
```
userId: "544212342423434"
roleId: "544213131354582"
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
  "result": false
}
```

### 3.8 指定用户添加角色信息
请求:
```
PUT /user/addRole
```
参数:
```
userId: "544212342423434"
roleId: "544213131354582"
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
  "result": false
}
```

## 4. 角色相关请求
### 4.1 加载全部角色列表
请求:
```
GET /role/getAll
```
参数:
```
无
```
响应：
```
正确:
{
  "status": 1,
  "message": "success",
  "result": [
    {
      "id": "544213131354582",
      "name": "新用户",
      "desc": "新注册用户角色集合",
      "type": 1
    },
    {
      "id": "544213131354583",
      "name": "老用户",
      "desc": "老用户角色集合",
      "type": 1
    },
    {
      "id": "544213131354584",
      "name": "未知用户",
      "desc": "未知用户角色集合",
      "type": 1
    },
  ]
}
错误:
参见第0条
```

### 4.2 加载指定类型角色列表
请求:
```
GET /role/getList
```
参数:
```
type: "1"
```
响应：
```
正确:
{
  "status": 1,
  "message": "success",
  "result": [
    {
      "id": "544213131354582",
      "name": "新用户",
      "desc": "新注册用户角色集合",
      "type": 1
    },
    {
      "id": "544213131354583",
      "name": "老用户",
      "desc": "老用户角色集合",
      "type": 1
    },
    {
      "id": "544213131354584",
      "name": "未知用户",
      "desc": "未知用户角色集合",
      "type": 1
    },
  ]
}
错误:
参见第0条
```

