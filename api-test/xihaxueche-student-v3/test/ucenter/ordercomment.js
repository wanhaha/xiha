'use strict';

/**
 * 评价订单
 */

const envs = require('envs');
const prefix = envs('prefix');
const assert = require('assert');
const qs = require('qs');
var chakram = require('chakram'),
    expect = chakram.expect;

describe('/student/order/comment', function () {
    const api = prefix + '/student/order/comment';

    //  测试是否为正常的接口
    describe('should be an callable api', function () {
        it('should return status 200 in headers', function () {
            var response = chakram.post(api);
            expect(response).to.have.status(200);
            return chakram.wait();
        });

        it('should return correct JSON response', function () {
            var response = chakram.post(api);
            expect(response).to.have.header("content-type", "application/json");
            expect(response).to.have.schema({
                "type": "object",
                "properties": {  //此关键字确定子实例如何验证对象，并且不直接验证直接实例本身。
                    "code": {
                        "title": "状态码",
                        "type": "number"
                    },
                    "msg": {
                        "title": "提示信息",
                        "type": "string"
                    },
                    "data": {
                        "title": "数据对象",
                        "type": "object",
                    }
                },
                "required": ["code", "msg", "data"]
            });
            return chakram.wait();
        });

        it('should not return 404 code in JSON response', function () {
            var response = chakram.post(api);
            expect(response).to.not.have.json("code", 404);
            return chakram.wait();
        });
    });


    describe('business here', function () {

        // 1.登录获取token
        var loginApi = prefix + '/student/ucenter/login';
        var token = "";
        before('request token first', function () {
            var loginArgs = {phone:'18656999023',pass:'123456'};
            var response = chakram.post(loginApi, loginArgs);
            return response.then(function (obj) {
               token = obj.body.data.token;
            });
        });

        it('login successful access a token should not be an empty string', function () {
            expect(token).to.be.an('string').that.is.not.empty;
        });

    	it('should match correct json schema', function () {
    		var order_type = 'appoint';
    		var order_id = 29511;
            var order_no = '2017091356531009';
            var comment_star = '4';
            var comment_content = '不错，服务态度非常好';
            var args = {token:token,order_type:order_type,order_id:order_id,order_no:order_no,comment_star:comment_star,comment_content:comment_content};
            var response = chakram.post(api, args);
            return response.then(function (obj) {
                console.log(obj.body.msg)
            	expect(obj).to.have.schema({
                    "type": "object",
                    "properties": {
                        "code": {
                            "title": "状态码",
                            "type": "number"
                        },
                        "msg": {
                            "title": "提示信息",
                            "type": "string"
                        },
                        "data": {
                            "title": "数据对象",
                            "type": "object",
                            "properties":{}
                        }
                    },
                    "required": ["code", "msg", "data"]
                });
            });
        });
    });
});