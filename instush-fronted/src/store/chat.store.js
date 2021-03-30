import {chatService} from '../services/chat.service.js'

export const chatStore = {
    state: {
        chatUsers:['benny vaknin','Dani','ron'],
        chatMsgs:[{from:'Dani',to:'oren', toId:'60620138a129e770940bf6b4', type:'txt',content:'you have great posts',createdAt:1614035176612,fromId:'6062190520d7a4536cf18baf',id:'23'},
                  {from:'benny vaknin',to:'oren', toId:'60620138a129e770940bf6b4', type:'txt',content:'are you here?',createdAt:1615033576612,fromId:'606233ac570327603c42baac',id:'24'},
                  {from:'oren',to:'Dani', toId:'6062190520d7a4536cf18baf', type:'txt',content:'thanks',createdAt:1616036576512,fromId:'60620138a129e770940bf6b4',id:'25'}
             ],
        typers:[],
    },
    getters: {
        chatUsers(state){
            return state.chatUsers;
            // return this.$store.getters.users;
        },
        chatMsgs(state){
            return state.chatMsgs;
        },
        typers(state){
            return state.typers;
        },

    },
    mutations: {
        addMsg(state, {msg}) {
            state.chatMsgs.push(msg);
        },

        setUsers(state, {data}) {//set all the users from the server
            state.chatUsers = data;
        },

        addTyping(state, {data}) {//set all the users from the server
            state.typers.push(data.fromId);
        },

        removeTyping(state, {data}) {
            const index = state.typers.indexOf(data.fromId);
            if (index > -1) {
                state.typers.splice(index, 1);
            }
        }
    },

    actions: {
        async sendMsg({commit}, {message}) {
            try {
                await chatService.sendMsg(message);
                console.log(commit);
            } catch (err) {
                console.log('chatStore: Error in sendMsg', err)
                throw err
            }
        },

        async userTyping({commit}, {data}) {
            try {
                console.log(commit);
                await chatService.userTyping(data);
            } catch (err) {
                console.log('chatStore: Error in userTyping', err)
                throw err
            }
        },

        async setUserId({commit}, {data}) {
            try {
                console.log('userId', data.userId)
                console.log(commit);
                await chatService.setUserId(data);
            } catch (err) {
                console.log('chatStore: Error in setUserId', err)
                throw err
            }
        },

        async initListeners({commit}) {
            try {
                console.log('initListeners')
                console.log(commit);
                await this.dispatch({ type: 'setMsgListener'});
                // await this.dispatch({ type: 'setUsersListener'});
                await this.dispatch({ type: 'setTypingListener'});
                
            } catch (err) {
                console.log('chatStore: Error in initListeners', err)
                throw err
            }
        },

        async setMsgListener({commit}) {
            try {
                console.log('setMsgListener')
                await chatService.getMsgListener(msg=>{
                 // emits only to sockets in the same room
                commit({ type: 'addMsg', msg })
                });
            } catch (err) {
                console.log('chatStore: Error in setMsgListener', err)
                throw err
            }
        },

        // async setUsersListener({commit}) {
        //     try {
        //         console.log('setUsersListener')
        //         await chatService.getUsersListener(dataValue=>{
        //             if(Object.keys(dataValue).length === 0){
        //                 dataValue = undefined
        //             }
        //             commit({ type: 'setUsers', data: dataValue })
        //         });
        //     } catch (err) {
        //         console.log('chatStore: Error in setUsersListener', err)
        //         throw err
        //     }
        // },

        async setTypingListener({commit}) {
            try {
                console.log('setTypingListener')
                await chatService.getTypingListener(data=>{
                 // emits only to sockets in the same room
                commit({ type: 'addTyping', data })
                setTimeout(() => {
                    commit({ type: 'removeTyping', data })
                  }, 3000);
                });
            } catch (err) {
                console.log('chatStore: Error in setTypingListener', err)
                throw err
            }
        },

    }

}