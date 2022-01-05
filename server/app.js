const express = require('express');
const app = express();
const fs = require('fs');

//分页
/**
 *
 * @param {*当前页的数量} pageSize
 * @param {*当前页} currentPage
 * @param {*当前数组} arr
 *
 * 总32条
 * 8
 * 1 2
 */
function pagination(pageSize, currentPage, arr) {
    let skipNum = (currentPage - 1) * pageSize;
    let newArr = (skipNum + pageSize >= arr.length) ? arr.slice(skipNum, arr.length) : arr.slice(skipNum, skipNum + pageSize);
    return newArr;
}

// 升序还是降序
/**
 *
 * @param {*排序的属性} attr
 * @param {*true表示升序排序 false表示降序排序} rev
 */

function sortBy(attr, rev) {
    if (rev === undefined) {
        rev = 1;
    } else {
        rev = rev ? 1 : -1;
    }
    return function (a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
            return rev * -1;
        }
        if (a > b) {
            return rev * 1;
        }
        return 0;
    }
}
// 范围（价格区间）
function range(arr, gt, lte) {
    return arr.filter(item => item.salePrice >= gt && item.salePrice <= lte)
}

const cors = require('cors');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const cartListJSON = require('./db/cartList.json');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/api/goods/home', (req, res) => {
    fs.readFile('./db/home.json', 'utf8', (err, data) => {
        if (!err) {
            res.json(JSON.parse(data));
        }
    })
})
//商品页面数据
app.get('/api/goods/allGoods', (req, res) => {
    //  获取的是前端地址上的查询参数
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const sort = parseInt(req.query.sort);
    const gt = parseInt(req.query.gt);
    const lte = parseInt(req.query.priceLte);
    const cid = req.query.cid;
    let newData = []
    fs.readFile('./db/allGoods.json', 'utf8', (err, data) => {
        let {result} = JSON.parse(data);
        let allData = result.data;
        //  分页显示
        newData = pagination(size, page, allData);
        if (cid === '1184') { //品牌周边
            newData = allData.filter((item) => item.productName.match(RegExp(/Smartisan/)))
            if (sort === 1) {//价格由低到高
                newData = newData.sort(sortBy('salePrice', true))
            } else if (sort === -1) {//价格由高到低
                newData = newData.sort(sortBy('salePrice', false))
            }
        } else {
            if (sort === 1) {  //价格由低到高
                newData = newData.sort(sortBy('salePrice', true))
            } else if (sort === -1) {//价格由高到低
                newData = newData.sort(sortBy('salePrice', false))
            }
            if (gt && lte) {
                //  过滤
                newData = range(newData, gt, lte)
            }
        }
        if (newData.length < size) {
            res.json({
                data: newData,
                total: newData.length
            })
        } else {
            res.json({
                data: newData,
                total: allData.length
            })
        }
    })
})
// 商品详情的数据
app.get('/api/goods/productDet', (req, res) => {
    const productId = req.query.productId;
    console.log(productId);
    fs.readFile('./db/goodsDetail.json', 'utf8', (err, data) => {
        if (!err) {
            let { result } = JSON.parse(data);
            let newData = result.find(item => item.productId == productId)
            res.json(newData)
        }
    })
})

// 模拟一个登陆的接口
app.post('/api/login', (req, res) => {
    console.log(req.body.user);
    // 登录成功获取用户名
    let username = req.body.user
    //一系列的操作
    res.json({
        // 进行加密的方法
        // sing 参数一：加密的对象 参数二：加密的规则 参数三：对象
        token: jwt.sign({ username: username }, 'abcd', {
            // 过期时间
            expiresIn: "3000s"
        }),
        username,
        state: 1,
        file: '/static/images/1570600179870.png',
        code: 200,
        address: null,
        balance: null,
        description: null,
        email: null,
        message: null,
        phone: null,
        points: null,
        sex: null,
        id: 62
    })
})

// 登录持久化验证接口 访问这个接口的时候 一定要访问token（前端页面每切换一次，就访问一下这个接口，问一下我有没有登录/登陆过期）
// 先访问登录接口，得到token，在访问这个，看是否成功
app.post('/api/validate', function (req, res) {
    let token = req.headers.authorization;
    console.log(token);

    // 验证token合法性 对token进行解码
    jwt.verify(token, 'abcd', function (err, decode) {
        if (err) {
            res.json({
                token:token,
                msg: '当前用户未登录'
            })
        } else {
            // 证明用户已经登录
            res.json({
                token: jwt.sign({ username: decode.username }, 'abcd', {
                    // 过期时间
                    expiresIn: "3000s"
                }),
                username: decode.username,
                msg: '已登录',
                address: null,
                balance: null,
                description: null,
                email: null,
                file: "/static/images/1570600179870.png",
                id: 62,
                message: null,
                phone: null,
                points: null,
                sex: null,
                state: 1,
            })
        }
    })
})


app.post('/api/addCart', (req, res) => {
    let { userId, productId, productNum } = req.body;
    fs.readFile('./db/allGoods.json', (err, data) => {
        let { result } = JSON.parse(data);
        if (productId && userId) {
            let { cartList } = cartListJSON.result.find(item => item.id == userId)
            // 找到对应的商品
            let newData = result.data.find(item => item.productId == productId);
            // newData.limitNum = 100;

            let falg = true;
            if (cartList && cartList.length) {
                cartList.forEach(item => {
                    if (item.productId == productId) {
                        if (item.productNum >= 1) {
                            falg = false;
                            item.productNum += parseInt(productNum);
                        }
                    }
                })
            }
            if (!cartList.length || falg) {  //购物车为空
                newData.productNum = parseInt(productNum)
                cartList.push(newData);
            }

            // 序列化

            fs.writeFile('./db/cartList.json', JSON.stringify(cartListJSON), (err) => {
                if (!err) {
                    res.json({
                        code: 200,
                        message: "success",
                        result: 1,
                        success: true,
                        timestamp: 1571296313981,
                    })
                }
            })
        }

    })

})

app.post('/api/rtmp://172.27.154.246:1935/live/home', (req, res) => {
    let { userId } = req.body;
    fs.readFile('./db/cartList.json', (err, data) => {
        let { result } = JSON.parse(data);
        let newData = result.find(item => item.id == userId);
        res.json({
            code: 200,
            cartList: newData,
            success: true,
            message: 'success'
        })
    })
})

// app.listen(3000);
app.listen(3000, () => {
    console.log('服务器已启动，监听的端口是：' + 3000);
});