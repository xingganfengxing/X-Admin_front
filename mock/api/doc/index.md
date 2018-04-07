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
GET /admin/online/getAll
```
参数：
```
current: "1"
size: "8"
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
GET /admin/online/getPage
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
### 1.4 查看指定管理员信息
请求：
```
GET /admin/getInfo
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

### 1.5 获取指定管理员角色列表
请求:
```
GET /admin/getRoles
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
      "name": "新管理员",
      "desc": "新注册管理员角色集合",
      "type": 1
    },
    {
      "id": "544213131354583",
      "name": "老管理员",
      "desc": "老管理员角色集合",
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

### 1.6 获取指定管理员权限列表
请求:
```
GET /admin/getPerms
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

### 1.7 获取指定管理员资源列表
请求:
```
GET /admin/getRoles
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
      "name": "管理员登录",
      "desc": "管理员登录请求接口",
      "type": 1
    },
    {
      "id": "544213131354583",
      "path": "/user/register",
      "name": "管理员注册",
      "desc": "管理员注册请求接口",
      "type": 1
    }
  ]
}

错误:
参见第0条
```

### 1.8 移除管理员指定角色

请求:
```
DELETE /admin/removeRole
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

### 1.9 指定管理员添加角色信息
请求:
```
PUT /admin/addRole
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

### 1.10 清理指定管理员权限
请求：
```
POST /admin/clearAuth
```
参数：
```
id: "544212342423434"
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

### 1. 强制注销指定管理员
请求：
```
POST /admin/forceLogout
```
参数：
```
id: "544212342423434"
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
current: "1"
size: "8"
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
    }
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

### 3.9 清理指定用户权限
请求：
```
POST /user/clearAuth
```
参数：
```
id: "544212342423434"
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

### 3.10 强制注销指定用户
请求：
```
POST /user/forceLogout
```
参数：
```
id: "544212342423434"
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
current: "1"
size: "8"
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
    }
  ]
}

错误:
参见第0条
```

### 4.2 加载全部角色分页信息
请求:
```
GET /role/getPage
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
  "result": {
    "size": 12,
    "total": 20,
    "page": 2
  }
}

错误:
参见第0条
```

### 4.3 加载指定类型角色列表
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
    }
  ]
}

错误:
参见第0条
```

### 4.4 修改指定角色
请求:
```
POST /role/update
```
参数:
```
id: "23413131354582"
name: "角色1"
type: "1"
desc: "角色集合1"
perms: ["1", "2", "4", "100"]
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
### 4.5 删除指定角色
请求:
```
DELETE /role/delete
```
参数:
```
id: "23413131354582"
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

### 4.6 添加指定角色
请求:
```
PUT /role/add
```
参数:
```
name: "角色1"
type: "1"
desc: "角色集合1"
perms: ["1", "2", "4", "100"]
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



## 5. 资源相关请求
### 5.1 获取全部资源列表
请求:
```
GET /resource/getAll
```
参数:
```
current: "1"
size: "8"
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
      "type": "post"
      "name": "用户登录",
      "path": "/user/login",
      "desc": "用户登录请求"
    },
    {
      "id": "544213131354583",
      "type": "post"
      "name": "用户退出",
      "path": "/user/logout",
      "desc": "用户退出请求"
    }
  ]
}

错误:
参见第0条
```

### 5.2 获取全部资源分页信息
请求:
```
GET /resource/getPage
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
  "result": {
    "size": 12,
    "total": 20,
    "page": 2
  }
}

错误:
参见第0条
```

### 5.3 获取指定资源角色和权限列表
请求:
```
GET /resource/getInfoRoleAndPerm
```
参数:
```
resourceId: "544213131354582"
```
响应：
```
正确:
{
  "status": 1,
  "message": "success",
  "result": {
    "resourceInfo": {
      "id": "544213131354583",
      "type": "post"
      "name": "用户退出",
      "path": "/user/logout",
      "desc": "用户退出请求"
    },
    "roleList": [
      {
        "id": "544213131354584",
        "name": "角色1",
        "desc": "角色1集合",
        "type": 1
      },
      {
        "id": "544213131354585",
        "name": "角色2",
        "desc": "角色2集合",
        "type": 1
      },
      {
        "id": "544213131354586",
        "name": "角色3",
        "desc": "角色3集合",
        "type": 2
      }
    ],
    "permList": [
      {
        "id": "544213131346584",
        "name": "权限1",
        "desc": "权限1",
        "type": 2
      },
      {
        "id": "544873131354585",
        "name": "权限2",
        "desc": "权限2",
        "type": 1
      },
      {
        "id": "544213631354586",
        "name": "权限",
        "desc": "权限3",
        "type": 1
      }
    ]
  }
}

错误:
参见第0条
```

### 5.4 获取指定资源信息
请求:
```
GET /resource/getInfo
```
参数:
```
resourceId: "544213131354582"
```
响应：
```
正确:
{
  "status": 1,
  "message": "success",
  "result": {  
    "id": "544213131354583",
    "type": "post"
    "name": "用户退出",
    "path": "/user/logout",
    "desc": "用户退出请求"
  }
}
  
错误:
参见第0条     
```

### 5.5 添加指定资源权限或角色
请求:
```
PUT /resource/addRoleOrPerm
```
参数:
```
resourceId: "544213131354582"
roleId: "124213131354565"
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

### 5.6 删除指定资源权限或角色
请求:
```
DELETE /resource/removeRoleOrPerm
```
参数:
```
resourceId: "544213131354582"
roleId: "124213131354565"
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

## 6. 权限相关请求
### 6.1 加载全部权限列表
请求:
```
GET /perm/getAll
```
参数:
```
current: "1"
size: "8"
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
      "name": "权限1",
      "desc": "权限1",
      "type": 1
    },
    {
      "id": "544213131354583",
      "name": "权限2",
      "desc": "权限2",
      "type": 2
    },
    {
      "id": "544213131354584",
      "name": "权限3",
      "desc": "权限3",
      "type": 1
    }
  ]
}

错误:
参见第0条
```

### 6.2 加载全部权限分页信息
请求:
```
GET /perm/getPage
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
  "result": {
    "size": 12,
    "total": 20,
    "page": 2
  }
}

错误:
参见第0条
```

### 6.3 添加新权限
请求:
```
PUT /perm/add
```
参数:
```
name: "权限1"
type: "1"
desc: "权限1"
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

### 6.4 修改指定权限
请求:
```
POST /perm/update
```
参数:
```
id: "23413131354582"
name: "权限1"
type: "1"
desc: "权限1"
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
### 6.5 删除指定权限
请求:
```
DELETE /perm/delete
```
参数:
```
id: "23413131354582"
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

