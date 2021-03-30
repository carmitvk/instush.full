// import { storageService } from './async-storage.service'
import {httpService} from './http.service.js'

const USER_DB = 'user';

// const loggedinUser = {
//       _id: "EEE22",
//       fullname: "Benny Orenshtein",
//       imgUrl:
//         "https://res.cloudinary.com/carmitvk/image/upload/v1615984358/instagram/users-pic/user1_yqme7r.jpg",
//     };
// _saveLocalUser(loggedinUser)
_createUsers()

export const userService = {
    getUsers,
    getById,
    getLoggedinUser,
    remove,
    update,
    login,
    signup,
    logout,
}

function getUsers() {
    // return storageService.query(USER_DB)
    return httpService.get(`user`)
}

function getById(userId) {
    // return storageService.get(USER_DB, userId)
    return httpService.get(`user/${userId}`)
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    // return storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser'))
}


async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    // return _saveLocalUser(user)

    const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}
async function logout() {
    sessionStorage.clear()
    return await httpService.post('auth/logout')
}


function _createUsers() {
    var users = JSON.parse(localStorage.getItem(USER_DB))
    if (!users || !users.length) {
        users =
        [
            {
                "_id": "eeAA22",
                "username": "yossi.tik",
                "password": "123",
                "fullname": "yossi tik",
                "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984344/instagram/users-pic/user3.jpg_clzrsm.jpg",
                "createdAt": 12122134434,
                "following": [
                    {
                        "_id": "aar4577",
                        "fullname": "Gal Dvori",
                        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984349/instagram/users-pic/user2.jpg_muesqu.jpg"
                    },
                    {
                        "_id": "ccr4577",
                        "fullname": "Roni Mizrahi",
                        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615985058/instagram/users-pic/user5_vtz4w4.jpg"
                    }
                ],
                "followers": [
                    {
                        "_id": "EEE22",
                        "fullname": "Benny Orenshtein",
                        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984358/instagram/users-pic/user1_yqme7r.jpg"
                    },
                    {
                        "_id": "aar4577",
                        "fullname": "Gal Dvori",
                        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984349/instagram/users-pic/user2.jpg_muesqu.jpg"
                    }
                ],
                "savedPosts": ["FFF234", "ad24si9eu", "ewwoei2e29e"]
            },
            {
                "_id": "OOO987",
                "username": "Yoni.Doy",
                "password": "123",
                "fullname": "Yoni Doy",
                "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615984338/instagram/users-pic/user4_p6n68b.jpg",
                "createdAt": 12122134434,
                "following": [
                    {
                        "_id": "eeAA22",
                        "fullname": "yossi tik",
                        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984344/instagram/users-pic/user3.jpg_clzrsm.jpg"
                    },
                    {
                        "_id": "ccr4577",
                        "fullname": "Roni Mizrahi",
                        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615985058/instagram/users-pic/user5_vtz4w4.jpg"
                    }
                ],
                "followers": [
                    {
                        "_id": "EEE22",
                        "fullname": "Benny Orenshtein",
                        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984358/instagram/users-pic/user1_yqme7r.jpg"
                    },
                    {
                        "_id": "aar4577",
                        "fullname": "Gal Dvori",
                        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984349/instagram/users-pic/user2.jpg_muesqu.jpg"
                    }
                ],
                "savedPosts": ["FFF234", "ad24si9eu", "ewwoei2e29e"]
            },
            {
                "_id": "ccr4577",
                "username": "Roni.Mizrahi",
                "password": "123",
                "fullname": "Roni Mizrahi",
                "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615985058/instagram/users-pic/user5_vtz4w4.jpg",
                "createdAt": 12122134434,
                "following": [
                    {
                        "_id": "EEE22",
                        "fullname": "Benny Orenshtein",
                        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615984358/instagram/users-pic/user1_yqme7r.jpg"
                    }
                ],
                "followers": [
                    {
                        "_id": "EEE22",
                        "fullname": "Benny Orenshtein",
                        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984358/instagram/users-pic/user1_yqme7r.jpg"
                    },
                    {
                        "_id": "aar4577",
                        "fullname": "Gal Dvori",
                        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984349/instagram/users-pic/user2.jpg_muesqu.jpg"
                    }
                ],
                "savedPosts": ["FFF234", "ad24si9eu", "ewwoei2e29e"]
            },
            {
                "_id": "EEE22",
                "username": "Benny.Orenshtein",
                "password": "123",
                "fullname": "Benny Orenshtein",
                "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984358/instagram/users-pic/user1_yqme7r.jpg",
                "createdAt": 12122134434,
                "following": [
                    {
                        "_id": "ccr4577",
                        "fullname": "Roni Mizrahi",
                        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615985058/instagram/users-pic/user5_vtz4w4.jpg"
                    }
                ],
                "followers": [
                    {
                        "_id": "ccr4577",
                        "fullname": "Roni Mizrahi",
                        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615985058/instagram/users-pic/user5_vtz4w4.jpg"
                    },
                    {
                        "_id": "aar4577",
                        "fullname": "Gal Dvori",
                        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615984349/instagram/users-pic/user2.jpg_muesqu.jpg"
                    }
                ],
                "savedPosts": ["FFF234", "ad24si9eu", "ewwoei2e29e"]
            },
            {
                "_id": "aar4577",
                "username": "Gal.Dvori",
                "password": "123",
                "fullname": "Gal Dvori",
                "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984349/instagram/users-pic/user2.jpg_muesqu.jpg",
                "createdAt": 12122134434,
                "following": [
                    {
                        "_id": "EEE22",
                        "fullname": "Benny Orenshtein",
                        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984358/instagram/users-pic/user1_yqme7r.jpg"
                    },
                    {
                        "_id": "eeAA22",
                        "fullname": "yossi tik",
                        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984344/instagram/users-pic/user3.jpg_clzrsm.jpg"
                    }
                ],
                "followers": [
                    {
                        "_id": "EEE22",
                        "fullname": "Benny Orenshtein",
                        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984358/instagram/users-pic/user1_yqme7r.jpg"
                    }
                ],
                "savedPosts": ["FFF234", "ad24si9eu", "ewwoei2e29e"]
            }
        ]
        
        localStorage.setItem(USER_DB, JSON.stringify(users))
    }
    return users;
}
