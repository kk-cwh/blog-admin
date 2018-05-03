import {otherRouter, appRouter} from '@/router/router';

import util from '@/libs/util';
import Cookies from 'js-cookie';
import http from '@/libs/http.js';

const app = {
    state: {
      md:'',
        username:'',
        dashData:{userNumber:11,browNumber:4988,articleNumber:50,discussionNumber:20},
        cachePage: [],
        isFullScreen: false,
        openedSubmenuArr: [], // 要展开的菜单数组
        menuTheme: 'dark', // 主题
        themeColor: '',
        pageOpenedList: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }],
        currentPageName: '',
        currentPath: [
            {
                title: '首页',
                path: '',
                name: 'home_index'
            },
        ], // 面包屑数组
        menuList: [],
        routers: [
            otherRouter,
            ...appRouter
        ],
        tagsList: [...otherRouter.children],
        messageCount: 0,
        dontCache: ['text-editor', 'artical-publish'] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
    },
    mutations: {
        setTagsList (state, list) {
            state.tagsList.push(...list);
        },
        updateMenulist (state) {

            let accessCode = parseInt(Cookies.get('access'));
            let menuList = [];

           appRouter.forEach((item,index)=>{
            // 父级配置了access字段 && accessCode 包含在 父级access中 || 父级未配置access则直接通过
             if ((item.access !== undefined && util.showThisRoute(item.access, accessCode)) || (item.access === undefined)) {
               if (item.children && item.children.length > 0) {
                 let childrenArr = [];
                 childrenArr = item.children.filter(child => {
                   if (child.access !== undefined) {
                     if (util.showThisRoute(child.access, accessCode)) {
                        return child;
                     }
                   } else {
                      return child;
                   }
                 });
                 if (childrenArr !== undefined && childrenArr.length > 0) {
                   let len = menuList.push(item);
                   menuList[len - 1].children = childrenArr;
                 }
               }
             }
           });
            state.menuList = menuList;
        },
        changeMenuTheme (state, theme) {
            state.menuTheme = theme;
        },
        changeMainTheme (state, mainTheme) {
            state.themeColor = mainTheme;
        },
        addOpenSubmenu (state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        closePage (state, name) {
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        initCachepage (state) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        removeTag (state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        pageOpenedList (state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearAllTags (state) {
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags (state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item === currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setOpenedList (state) {
            state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
        },
        setCurrentPath (state, pathArr) {
            state.currentPath = pathArr;
        },
        setCurrentPageName (state, name) {
            state.currentPageName = name;
        },
        setAvator (state, path) {
            localStorage.avatorImgPath = path;
        },
        clearOpenedSubmenu (state) {
            state.openedSubmenuArr.length = 0;
        },

        setMessageCount (state, count) {
            state.messageCount = count;
        },
        increateTag (state, tagObj) {
            if (!util.oneOf(tagObj.name, state.dontCache)) {
                state.cachePage.push(tagObj.name);
                localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            state.pageOpenedList.push(tagObj);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        }
    },
    actions: {
        Login ({ commit }, userInfo) {
          return new Promise((resolve, reject) => {
            http({
              url: '/api/login',
              method: 'post',
              data: userInfo
            }).then(response => {
              if (response.data) {
                const data = response.data
                Cookies.set('token',data.token_type + ' ' + data.access_token)
                Cookies.set('access', 0);
                Cookies.set('user', userInfo.username);
                resolve();
              }
            }).catch(error => {
              reject(error);
            })
          })
        },
        GetUserInfo ({ commit }) {
          return new Promise((resolve, reject) => {
            http({
              url: '/api/user_info',
              method: 'get'
            }).then(response => {
              if (response.data) {
                let data = response.data
                let user = data.data;
                commit('setAvator',"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg")

                this.state.username = user.name

                resolve()
              }
            }).catch(error => {
              reject(error)
            })
          })
        },
        // Logout ({ commit }) {
        //   return new Promise((resolve, reject) => {
        //     http({
        //       url: '/api/logout',
        //       method: 'post'
        //     }).then(response => {
        //       if (response.data) {
        //         // console.log(response.data)

        //         removeToken()
        //         commit('CLEAR_STATE')
        //         console.log(this.state)
        //         resolve()
        //       }
        //     }).catch(error => {
        //       reject(error)
        //     })
        //   })
        // },
        UserList ({ commit }, data) {
          return new Promise((resolve, reject) => {
            http({
              url: `/api/users?page=${data.page}`,
              method: 'get'
            }).then(response => {
              if (response.data) {
                resolve(response.data)
              }
            }).catch(error => {
              reject(error)
            })
          })
        },
        // AddUser ({ commit }, userInfo) {
        //   return new Promise((resolve, reject) => {
        //     http({
        //       url: '/api/users',
        //       method: 'post',
        //       data: userInfo
        //     }).then(response => {
        //       if (response.data) {
        //         resolve(response.data)
        //       }
        //     }).catch(error => {
        //       reject(error)
        //     })
        //   })
        // },
        MenuTree ({ commit }) {
          return new Promise((resolve, reject) => {
            http({
              url: '/api/menus',
              method: 'get'
            }).then(response => {
              if (response.data) {
                resolve(response.data)
              }
            }).catch(error => {
              reject(error)
            })
          })
        },
        // TypeList ({ commit }) {
        //   return new Promise((resolve, reject) => {
        //     http({
        //       url: '/api/types',
        //       method: 'get'
        //     }).then(response => {
        //       if (response.data) {
        //         resolve(response.data)
        //       }
        //     }).catch(error => {
        //       reject(error)
        //     })
        //   })
        // },
        // AddArticle ({ commit }, article) {
        //   return new Promise((resolve, reject) => {
        //     http({
        //       url: '/api/articles',
        //       method: 'post',
        //       data: article
        //     }).then(response => {
        //       if (response.data) {
        //         resolve(response)
        //       }
        //     }).catch(error => {
        //       reject(error)
        //     })
        //   })
        // },
        // UpdateArticle ({ commit }, article) {
        //   return new Promise((resolve, reject) => {
        //     http({
        //       url: `/api/articles/${article.id}`,
        //       method: 'put',
        //       data: article
        //     }).then(response => {
        //       if (response.data) {
        //         resolve(response)
        //       }
        //     }).catch(error => {
        //       reject(error)
        //     })
        //   })
        // },
        // GetArticleDetail ({ commit }, data) {
        //   return new Promise((resolve, reject) => {
        //     http({
        //       url: `/api/articles/${data.id}`,
        //       method: 'get'
        //     }).then(response => {
        //       if (response.data) {
        //         const data = response.data
        //         resolve(data)
        //       }
        //     }).catch(error => {
        //       reject(error)
        //     })
        //   })
        // },
        // ArticleList ({ commit }, data) {
        //   return new Promise((resolve, reject) => {
        //     http({
        //       url: `/api/articles?page=${data.page}`,
        //       method: 'get'
        //     }).then(response => {
        //       if (response.data) {
        //         resolve(response.data)
        //       }
        //     }).catch(error => {
        //       reject(error)
        //     })
        //   })
        // }
      }
};

export default app;
