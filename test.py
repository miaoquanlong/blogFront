import pymysql  # 操作mysql的库
from urllib import request, parse  # 请求需要的库
import json  # 处理参数需要的库

# https://xiaoce-timeline-api-ms.juejin.im/v1/getRecommendBooks?
# uid=59ee9e885188250989514375&
# client_id=1552290924099&
# token=
# &src=web&category=5562b428e4b00c57d9b94b9d


def juejin_req(data_num):  # data_num是请求的条数
    url = 'https://xiaoce-timeline-api-ms.juejin.im/v1/getRecommendBooks'  # 请求的url
    req_data = {  # 请求需要携带的参数
        'src': 'web',
        'uid': '5b5ebcd1f265da0f60132076',
        'device_id': 1533608440568,
        'token': 'eyJhY2Nlc3NfdG9rZW4iOiJOUG5Gekh6cGpyc3JLSVA0IiwicmVmcmVzaF90b2tlbiI6Ijk2OHVYb2tHOFJ3YU9zQ1AiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ%3D%3D',
        'limit': data_num,
        'category': "all",
        'recomment': 1
    }
    # 由于是get请求所以我们在使用parse.urlencode()方法转换编码格式后还需要使用str()方法转换为字符串
    req_data = str(parse.urlencode(req_data, 'utf-8'))
    json_data = request.urlopen(url+'?'+req_data)  # 拼凑url发送请求
    print('数据请求成功')
    json_data = json_data.read().decode('utf-8')  # 拿到数据转换编码格式
    json_data = json.loads(json_data)  # 使用json.loads()将字符串序列化
    print(json_data)

    json_data = json_data['d']['data']  # 获取到数据列表
    print(json_data)
    sql_data = []  # 最后储存到数据的变量
    for item in json_data:  # 循环遍历列表提取需要的数据
        tag = []
        for aa in item['tags']:  # 提取标签
            tag.append(aa)
        sql_data.append((item['category'],  item['title'], item['desc'],
                         item['wechatImg'], str(tag), item['user'],))
    print('一共有%s条数据' % len(sql_data))
    return sql_data


def juejin_sql(sql_data):
    print('连接数据库')
    db = pymysql.connect(host='localhost',
                         port=3306,  # 端口号
                         user='root',
                         password='123456',  # 密码
                         database='block')  # 数据库
    cursor = db.cursor()  # 建立一个游标对象
    try:
        # 判断表是否存在，若不存在则新建
        cursor.execute("""CREATE TABLE IF NOT EXISTS juejin(
                    category  TEXT,
                    title  TEXT,
                    content  TEXT,
                    originalUrl  TEXT,
                    tags  TEXT,
                    username TEXT)""")
    except:
        print("Table 'juejin' already exists")
        return False
    sql = """insert into juejin(category, title, content, originalUrl, tags, username)
            values (%s, %s, %s, %s, %s, %s)"""  # sql语句
    print('正在批量添加')
    cursor.executemany(sql, sql_data)  # 批量添加
    cursor.execute('select count(*) from juejin')
    results = cursor.fetchall()  # 查询全部总条数
    print('数据库目前有%d条数据' % results[0][0])
    db.commit()  # 对于数据增删改之后一定要提交操作
    cursor.close()  # 关闭游标
    print('操作完成关闭数据库关闭游标')
    db.close()  # 关闭数据库连接


juejin_sql(juejin_req(100))
