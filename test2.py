import scrapy


class JJspider(scrapy.Spider):
    name = "mainrecommend"
    allowed_domains = ["juejin.im"]
    start_urls = [
        "https://juejin.im/",
        # "https://juejin.im/welcome/frontend"
    ]

    def parse(self, response):
        print "-----------"
        print response.xpath('//*[@id="juejin"]/div[2]/main/div/div[1]/ul')

        for li in response.xpath('//*[@id="juejin"]/div[2]/main/div/div[1]/ul/li'):
            # title = sel.xpath('a/text()').extract()
            # link = sel.xpath('a/@href').extract()
            # desc = sel.xpath('text()').extract()
            username = li.xpath(
                'div/div/a/div/div/div[1]/ul/li[2]/div/a/text()').extract()
            tag =li.xpath(
                'div/div/a/div/div[1]/div[1]/ul/li[4]/a[1]/text()').extract()
            title = li.xpath(
                'div/div/a/div/div/div[2]/a/text()').extract()
            post_time = li.xpath(
                'div/div/a/div/div[1]/div[1]/ul/li[3]/text()').extract()
            link = li.xpath(
                'div/div/a/div/div[1]/div[2]/a/@href').extract()
            j8="fuckyou"
            print username, tag, title, post_time, link,j8
        print "-----------"



