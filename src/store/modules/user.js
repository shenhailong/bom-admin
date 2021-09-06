import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '', 
    userid: null,
    pkCorp: null,
	pkPsndoc:null,
    unitname: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERID: (state, userid) => {
      state.userid = userid
    },
    SET_PKCORP: (state, pkCorp) => {
      state.pkCorp = pkCorp
    },
	SET_PKPSNDOC: (state, pkPsndoc) => {
      state.pkPsndoc = pkPsndoc
    },
    SET_UNITNAME: (state, unitname) => {
      state.unitname = unitname
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      // console.log(roles);
      if (roles == null) {
        state.roles = []
      } else {
        for(let i of roles){
          // console.log(i.roleName);
          state.roles.push(i.roleName)
        }
        // state.roles = roles
      }
      
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.object
		  // console.log("我在登录")
		  // console.log(data)
		  localStorage.setItem('pkPsndoc',data.pkPsndoc)
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.userName)
          commit('SET_USERID', data.userid)
          commit('SET_PKCORP', data.pkCorp)
          commit('SET_UNITNAME', data.corpName)
          commit('SET_PKPSNDOC', data.pkPsndoc)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.object
		  // console.log("我是roles")
		  // console.log(data)
          if (data) {
            if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roles)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }
            commit('SET_NAME', data.userName)
            commit('SET_USERID', data.userid)
            commit('SET_PKCORP', data.pkCorp)
            commit('SET_UNITNAME', data.corpName)
            commit('SET_AVATAR', data.avatar)
            commit('SET_PKPSNDOC',data.pkPsndoc)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
