//引入jwt做token验证
const jwt = require('jsonwebtoken')

//统一设置token有效时间24h
const expireTime = '24h'
const secret = 'qweasd789456'

//引入encrypt
const crypt = require('../public/encrypt')

//引入model
const user = require('../model/user')
const collection = require('../model/collection')
const article = require('../model/article')

//引入Op
const { Op } = require("sequelize")

class adminController {
  // 刷新token
  static async refreshToken(ctx) {
    try {
      let payload = await tools.verifyToken(token)
      jwt.sign({
        username: payload.username,
        password: payload.password
      }, secret, { expiresIn: longExpire })
      return ctx.body = {
        code: '0',
        token: token,
        expire: 24,
        desc: '刷新token成功'
      }
    } catch(err) {
      return ctx.body = {
        code: '-44',
        desc: '请求返回错误'
      }
    }
  }
  // 管理员登录
  static async adminLogin(ctx) {
    try {
      const req = ctx.request.body;
      if (!req.username || !req.password) {
        return ctx.body = {
          code: '-1',
          msg: '用户名或密码不能为空'
        }
      } else {
        const data = await user.findOne({
          where: {
            username: req.username
          }
        })
        if (data) {
            if (crypt.decrypt(req.password, data.password)) {
              //判断是否是管理员
              if(data.type === 'admin') {
              //生成token，验证登录有效期
                const token = jwt.sign({
                  username: req.username,
                  password: req.password
                }, secret, { expiresIn: expireTime })
                return ctx.body = {
                  code: '0',
                  token: token,
                  expire: 2,
                  adminInfo: JSON.stringify(data),
                  desc: '登陆成功，欢迎回来~'
                }
              } else {
                return ctx.body = {
                  code: '-1',
                  desc: '暂无权限登陆~'
                }
              }
            }
          } else {
            return ctx.body = {
              code: '-1',
              desc: '该管理员不存在'
            }
          }
      };
    } catch(err) {
      return ctx.body = {
        code: '-44',
        desc: '请求返回错误'
      }
    }
  }
  // 管理员登出
  static async adminLogout(ctx) {
  }

  // 获取所有用户
  static async getUsers(ctx) {
    try {
      const req = ctx.request.body
      //构造搜索条件
      let conditions = {}
      if(req.searchForm) {
        if(!!req.searchForm.username) {
          conditions.username = {[Op.startsWith]: req.searchForm.username}
        } 
        if(!!req.searchForm.nickname) {
          conditions.nickname = {[Op.startsWith]: req.searchForm.nickname}
        }
        if(!!req.searchForm.type) {
          conditions.type = req.searchForm.type
        } 
        if(!!req.searchForm.phone) {
          conditions.phone = req.searchForm.phone
        }
        //status只有"true"、"false"、undefined，注意字符串
        if(!!req.searchForm.status) {
          conditions.status = req.searchForm.status === 'true' ? 1 : 0
        }
      } else {
        conditions = {}
      }
      const offset = parseInt((req.page - 1) * req.limit)
      const limit = parseInt(req.limit)
      
      const users = await user.findAndCountAll({
        // attributes: { exclude: ['password'] },
        where: conditions,
        limit,
        offset
      })
      return ctx.body = {
        code: '0',
        desc: '获取用户列表成功',
        users: JSON.stringify(users.rows),
        count: users.count
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '获取用户列表失败'
      }
    }
  }
  // 获取所有管理员
  static async getAdminUsers(ctx) {
    try {
      const req = ctx.request.body
      const offset = parseInt((req.page - 1) * req.limit)
      const limit = parseInt(req.limit)
      const users = await user.findAndCountAll({
        attributes: { exclude: ['password'] },
        where: {
          type: 'admin'
        },
        limit,
        offset
      })
      return ctx.body = {
        code: '0',
        desc: '获取管理员列表成功',
        users: JSON.stringify(users.rows),
        count: users.count
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '获取管理员列表失败'
      }
    }
  }
  //添加用户
  static async createUser(ctx) {
    try {
      const req = ctx.request.body
      req.password = crypt.encrypt(req.password)
      const users = await user.create(req)
      return ctx.body = {
        code: '0',
        desc: '用户添加成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '用户添加失败'
      }
    }
  }
  //编辑用户
  static async editUser(ctx) {
    try {
      const req = ctx.request.body
      const users = await user.update(req.userForm, {
        where: {
          id: req.id
        }
      })
      return ctx.body = {
        code: '0',
        desc: '用户修改成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '用户修改失败'
      }
    }
  }
  //删除用户
  static async deleteUser(ctx) {
    try {
      const req = ctx.request.body
      const users = await user.destroy({
        where: {
          id: req.id
        }
      })
      return ctx.body = {
        code: '0',
        desc: '用户删除成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '用户删除失败'
      }
    }
  }
  //批量删除用户
  static async batchDeleteUsers(ctx) {
    try {
      const req = ctx.request.body
      const users = await user.destroy({
        where: {
          id: {
            [Op.in]: req.ids
          }
        }
      })
      return ctx.body = {
        code: '0',
        desc: '用户批量删除成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '用户批量删除失败'
      }
    }
  }

  // 获取所有文章
  static async getArticles(ctx) {
    try {
      const req = ctx.request.body
      //构造搜索条件
      let conditions = {}
      if(req.searchForm) {
        if(!!req.searchForm.title) {
          conditions.title = {[Op.startsWith]: req.searchForm.title}
        } 
        if(!!req.searchForm.status) {
          conditions.status = req.searchForm.status
        }
      } else {
        conditions = {}
      }
      const offset = parseInt((req.page - 1) * req.limit)
      const limit = parseInt(req.limit)
      
      const articles = await article.findAndCountAll({
        // attributes: { exclude: ['password'] },
        include:[{
          model: user,
          attributes:['username','avatar']
        }, {
          model: collection,
          attributes:['title']
        }],
        where: conditions,
        limit,
        offset
      })
      return ctx.body = {
        code: '0',
        desc: '获取文章列表成功',
        articles: JSON.stringify(articles.rows),
        count: articles.count
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '获取文章列表失败'
      }
    }
  }
  //获取指定文章
  static async getArticle(ctx) {
    try {
      const req = ctx.request.body
      const id = req.id
      const detail = await article.findByPk(id)
      return ctx.body = {
        code: '0',
        desc: '获取文章成功',
        detail: JSON.stringify(detail)
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '获取文章失败'
      }
    }
  }
  //添加文章
  static async createArticle(ctx) {
    try {
      const req = ctx.request.body
      const title = req.articleForm.title
      const content = req.articleForm.content
      const picture = req.articleForm.imageUrl
      const category = req.category
      const article = await article.create({
        title,
        content,
        picture,
        category
      })
      return ctx.body = {
        code: '0',
        desc: '文章提交成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '文章提交失败'
      }
    }
  }
  //编辑文章
  static async editArticle(ctx) {
    try {
      const req = ctx.request.body
      // 待做：需更新updatedAt
      const users = await article.update(req.userForm, {
        where: {
          id: req.id
        }
      })
      return ctx.body = {
        code: '0',
        desc: '文章修改成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '文章修改失败'
      }
    }
  }
  //删除文章
  static async deleteArticle(ctx) {
    try {
      const req = ctx.request.body
      const article = await article.destroy({
        where: {
          id: req.id
        }
      })
      return ctx.body = {
        code: '0',
        desc: '用户删除成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '用户删除失败'
      }
    }
  }
  //批量删除文章
  static async batchDeleteArticles(ctx) {
    try {
      const req = ctx.request.body
      const article = await article.destroy({
        where: {
          id: {
            [Op.in]: req.ids
          }
        }
      })
      return ctx.body = {
        code: '0',
        desc: '文章批量删除成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '文章批量删除失败'
      }
    }
  }
}

module.exports = adminController