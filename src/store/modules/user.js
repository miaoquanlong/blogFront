import Cookies from 'js-cookie';
import { reject } from 'q';

const user = {
    state: {
        userName: '',
        userID: ''
    },
    mutations: {
        SET_USER_NAME: (state, userName) => {
            state.userName = userName;
        },
        SET_USER_ID: (state, userID) => {
            state.userID = userID;
        }
    },
    actions: {
        //用户登陆
        LoginByUsername ({ commit }, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                commit('SET_USER_NAME', userInfo.userName);
                commit('SET_USER_ID', userInfo.userID);
                Cookies.set('name', userInfo.userName);
                Cookies.set('Uid', userInfo.userID);
                resolve();
            })

        }

    }
}
export default user;
