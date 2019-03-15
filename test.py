import pymysql  # 操作mysql的库
from urllib import request, parse  # 请求需要的库
import json  # 处理参数需要的库

# https://xiaoce-timeline-api-ms.juejin.im/v1/getRecommendBooks?
# uid=59ee9e885188250989514375&
# client_id=1552290924099&
# token=
# &src=web&category=5562b428e4b00c57d9b94b9d

import re

import requests
import bs4


def juejin_sql(sql_data):
    print('连接数据库')
    db = pymysql.connect(
        host='localhost',
        port=3306,  # 端口号
        user='root',
        password='123456',  # 密码
        database='block')  # 数据库
    cursor = db.cursor()  # 建立一个游标对象
    try:
        # 判断表是否存在，若不存在则新建
        cursor.execute("""CREATE TABLE  IF NOT EXISTS `juejin`(
                    `_id`  TEXT,
                    `section`  TEXT,
                    `desc`  TEXT,
                    `user` TEXT,
                    `price`  TEXT,
                    `title`  TEXT,
                    `buyCount`  TEXT,
                    `viewCount`  TEXT,
                    `contentSize`  TEXT,
                    `img`  TEXT,
                    `category`  TEXT,
                    `createdAt`  TEXT,
                    `updatedAt`  TEXT,
                    `profile`  TEXT,
                    `wechatSignal`  TEXT,
                    `lastSectionCount`  TEXT,
                    `wechatImg`  TEXT,
                    `wechatImgDesc`  TEXT,
                    `url`  TEXT)""")

    except:
        print("Table 'juejins' already exists")
        return False
    sql = """insert into juejin(`_id`, `section`, `desc`, `user`, `price`, `title`, `buyCount`, `viewCount`, `contentSize`, `img`, `category`, `createdAt`, `updatedAt`, `profile`, `wechatSignal`, `lastSectionCount`, `wechatImg`, `wechatImgDesc`,`url`)
            values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""  # sql语句
    print('正在批量添加')
    cursor.executemany(sql, sql_data)  # 批量添加
    cursor.execute('select count(*) from juejin')
    results = cursor.fetchall()  # 查询全部总条数
    print('数据库目前有%d条数据' % results[0][0])
    db.commit()  # 对于数据增删改之后一定要提交操作
    cursor.close()  # 关闭游标
    print('操作完成关闭数据库关闭游标')
    db.close()  # 关闭数据库连接


def query_data():
    url = "https://xiaoce-timeline-api-ms.juejin.im/v1/getListByLastTime?uid=&client_id=&token=&src=web&pageNum=1"
    resp = requests.get(url=url)
    # json_data = resp.loads(resp)
    json_data = resp.json()['d']
    sql_data = []  # 最后储存到数据的变量
    print(json_data)

    for item in json_data:  # 循环遍历列表提取需要的数据
        sql_data.append(
            (item['_id'], item['isPublish'], item['desc'], item['user'],
             item['price'], item['title'], item['buyCount'], item['viewCount'],
             item['contentSize'], item['img'], item['category'],
             item['createdAt'], item['updatedAt'], item['profile'],
             item['wechatSignal'], item['lastSectionCount'], item['wechatImg'],
             item['wechatImgDesc'], item.get('url', "")))

    print('一共有%s条数据' % len(sql_data))
    return sql_data


juejin_sql(query_data())
