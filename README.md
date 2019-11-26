# 2019-10-24
1. 安装与启动
    1. git clone ...
    2. cd ...
    3. npm i
    4. yarn s
2. 开发
    1. 基础组件已经接近完备，只需要填充业务。
3. 规范
    1. api 请求规范
        1. 请求方式 所有的请求全为post 【推荐】
        2. 入参
            1. 请求参数中含有排序参数时
                1. 要排序的字段 参数key为 sortField，参数值为该字段
                2. 要排序的方式 参数key为 sortOrder，可选值为 ascending descending 和 不传
            2. 请求参数中含有筛选参数时
                1. 要筛选的字段 参数key 为 要筛选的字段
                2. 要筛选的值 单选时为选中的值 多选时 为,分隔的值 都是字符串类型
        3. 返回结果
            1. 返回结构必须是如下格式
            ```
                    {
                      "code": 200,
                      "msg": "",
                      "data": {
                      }
                    }
           ```
           2. code 表示返回状态类型为数字，200表示成功，500表示后台代码错误，其他表示出现可预期的操作错误（如100表示操作失败，101表示重复数据，403表示token失效等等）
           3. msg 表示操作结果的描述，对于 增删改 类型的操作，msg必须给出相应的中文提示（如果提示语为操作成功且code为200，或者提示语为操作失败且code不是200，这两种默认情况可以不传）
           4. data 表示返回数据
               1. 若返回结果是对象数组，则必须是如下格式，若是分页，则加上total
               ```
                        {
                          "code": 200,
                          "msg": "",
                          "data": {
                            "results": [], // 若查询结果为空，则必须是 空数组
                            "total": 100 // 查询结果为空，则必须是 0
                          }
                        }
               ```
               2. 若返回结果是非数组，则必须是如下格式
               ```
                        {
                          "code": 200,
                          "msg": "",
                          "data": {} // 数据在此处
                        }
               ```
        4. 请求头中包含token，key为 x-access-token
        5. 登录成功返回token
        6. 提供一个判断是否已经登录的接口，返回结果如果未登录，则返回一个特定的code，若已登录，返回当前登录者的详情
## 2019-11-26
1. 前端打包部署
    1. 路由模式设置为默认模式
    2. publicPath 设置为默认值
    3. 输出路径设置为工程名称
    4. 执行打包名称 yarn b
    5. 将生成的包放到webapps下
    6. 设置tomcat的根路径 打开 server.xml
    ```
        <Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true">
            <!-- 插入这段代码 start -->
            <Context path="" docBase="工程名称" debug="0" reloadable="true"/>
            <!-- 插入这段代码 end -->
            <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log" suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />
      </Host>
    ```
    7. 由于后端开发接口不一定全部都提供了，所以，前端项目部署上去之后，可能会出现404。可以通过如下操作解决
        1. 方法一：将所有的请求都设置为静态请求
        ```
            localStorage.setItem('BP_FE_OPEN_STATIC', '1')
            // 若要删除此配置，需要执行
            localStorage.removeItem('BP_FE_OPEN_STATIC')
        ```
        2. 方法二：将一部分请求设置为静态请求【注意：两种方法是互斥的】
        ```
            // 比如：若要将以 campus/ 开头 和 以 staff/ 开头的请求设置为静态请求
            localStorage.setItem('BP_FE_STATIC_INCLUDE', '["campus/", "staff/"]')
            // 若要删除此配置，需要执行
            localStorage.removeItem('BP_FE_STATIC_INCLUDE')
        ```
    8. 启动tomcat之后，浏览器访问地址 协议 + 域名（ip） + 端口  + /login
