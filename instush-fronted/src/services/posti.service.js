
import { userService } from './user.service.js';
import { utilService } from './util.service.js'
import {httpService} from './http.service.js'
// import { storageService } from './async-storage.service.js'
// import axios from 'axios'

// const KEY = 'posti';
const POSTI_URL = 'posti/';

export const postiService = {
    query,
    getById,
    remove,
    save,
    getEmptyPosti,
    getEmptyComment,
}

// _createPostis()

// async function query(filter = '') {
//     try {
//         const postis = await storageService.query(KEY);
//         if (!postis || postis.length === 0) {
//             return postis;
//         }

//         var sortPostis = postis.sort((posti1, posti2) => {
//             return posti2.createdAt - posti1.createdAt;
//         });

//         if (filter){
//             sortPostis = sortPostis.filter((posti) => {
//                 return (posti.creator.fullname.toLowerCase().includes(filter.toLowerCase()))
//             })
//         }

//         return sortPostis;
//     } catch (err) {
//         console.log('postiService: Error in query function...', err);
//         throw new Error('Error in query function...');
//     } 
// }


async function query(filter = '') {
        try {
        const postis = await httpService.get(POSTI_URL);
        if (!postis || postis.length === 0) {
            return postis;
        }

        var sortPostis = postis.sort((posti1, posti2) => {
            return posti2.createdAt - posti1.createdAt;
        });

        if (filter){
            sortPostis = sortPostis.filter((posti) => {
                return (posti.creator.fullname.toLowerCase().includes(filter.toLowerCase()))
            })
        }

        return sortPostis;
    } catch (err) {
        console.log('postiService: Error in query function...', err);
        throw new Error('Error in query function...');
    } 
}


function getById(id) {
    // return storageService.get(KEY, id)
    return httpService.get(POSTI_URL+ id)
}

function remove(id) {
    // return storageService.remove(KEY, id)
    return httpService.delete(POSTI_URL+ id)
}

function save(posti) {
    if (posti._id) {
        return httpService.put(POSTI_URL+ posti._id , posti) //edit
        // return storageService.put(KEY, posti) //edit
    } else {
        // posti._id = utilService.makeId(); //temp until mongo DB gives id //carmit
        // return storageService.post(KEY, posti) //new
        return httpService.post(POSTI_URL , posti)
    }
}

function getEmptyComment(txt) {
    return {
        "id": utilService.makeId(),
        "txt": txt,
        "by": userService.getLoggedinUser(),
        "likedBy": []
    }
}


function getEmptyPosti() {
    return {
        // "_id": utilService.makeId(),
        "description": "",
        "imgUrl": "",
        "loc": {
            "name": "",
            "lat": 0,
            "lng": 0
        },
        // "createdAt": Date.now(), //temp. will be done by server side
        // "creator": userService.getLoggedinUser(),
        "comments": [],
        "likedBy": [],
        "tags": []
    }
}

// function _createPostis() {
//     var postis = JSON.parse(localStorage.getItem(KEY))
//     if (!postis || !postis.length) {
//         postis =
//             [
//                 {
//                     "_id": "YUD234",
//                     "description": "nature in his best",
//                     "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1616094177/instagram/story-pic/pic5_nhi8gi.jpg",
//                     "loc": {
//                         "name": "Piliphins",
//                         "lat": 35.42,
//                         "lng": 34.22
//                     },
//                     "createdAt": 1616019494151,
//                     "creator": {
//                         "_id": "EEE22",
//                         "fullname": "Benny Orenshtein",
//                         "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984358/instagram/users-pic/user1_yqme7r.jpg"
//                     },
//                     "comments": [
//                         {
//                             "id": "dis34ws3786er3",
//                             "txt": "I like the sea",
//                             "by": {
//                                 "_id": "OOO987",
//                                 "fullname": "Yoni Doy",
//                                 "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615984338/instagram/users-pic/user4_p6n68b.jpg"
//                             },
//                             "likedBy": []
//                         }
//                     ],
//                     "likedBy": [
//                         {
//                             "_id": "aar4577",
//                             "fullname": "Gal Dvori",
//                             "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984349/instagram/users-pic/user2.jpg_muesqu.jpg"
//                         }
//                     ],
//                     "tags": [
//                         "nature"
//                     ],
//                     "isSaved": true
//                 },
//                 {
//                     "_id": "FFF234",
//                     "description": "nice picture",
//                     "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1616094169/instagram/story-pic/pic1_rxlgjs.jpg",
//                     "loc": {
//                         "name": "Tel Aviv",
//                         "lat": 35.42,
//                         "lng": 34.22
//                     },
//                     "createdAt": 1616019495151,
//                     "creator": {
//                         "_id": "EEE22",
//                         "fullname": "Benny Orenshtein",
//                         "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984358/instagram/users-pic/user1_yqme7r.jpg"
//                     },
//                     "comments": [
//                         {
//                             "id": "disud3786er3",
//                             "txt": "awesome picture",
//                             "by": {
//                                 "_id": "ccr4577",
//                                 "fullname": "Roni Mizrahi",
//                                 "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615985058/instagram/users-pic/user5_vtz4w4.jpg"
//                             },
//                             "likedBy": [
//                                 {
//                                     "_id": "EEE22",
//                                     "fullname": "Benny Orenshtein",
//                                     "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984358/instagram/users-pic/user1_yqme7r.jpg"
//                                 }
//                             ]
//                         },
//                         {
//                             "id": "dis23232s3786er3",
//                             "txt": "great!!!",
//                             "by": {
//                                 "_id": "OOO987",
//                                 "fullname": "Yoni Doy",
//                                 "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615984338/instagram/users-pic/user4_p6n68b.jpg"
//                             },
//                             "likedBy": []
//                         }
//                     ],
//                     "likedBy": [
//                         {
//                             "_id": "EEE22",
//                             "fullname": "Benny Orenshtein",
//                             "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984358/instagram/users-pic/user1_yqme7r.jpg"
//                         },
//                         {
//                             "_id": "aar4577",
//                             "fullname": "Gal Dvori",
//                             "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984349/instagram/users-pic/user2.jpg_muesqu.jpg"
//                         }
//                     ],
//                     "tags": [
//                         "animals",
//                         "nature"
//                     ],
//                     "isSaved": true
//                 },
//                 {
//                     "_id": "AAH234",
//                     "description": "nature is amazing",
//                     "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1616094178/instagram/story-pic/pic7_slvlmn.jpg",
//                     "loc": {
//                         "name": "Italy",
//                         "lat": 35.42,
//                         "lng": 34.22
//                     },
//                     "createdAt": 12122212134,
//                     "creator": {
//                         "_id": "aar4577",
//                         "fullname": "Gal Dvori",
//                         "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984349/instagram/users-pic/user2.jpg_muesqu.jpg"
//                     },
//                     "comments": [
//                         {
//                             "id": "disud3786er3",
//                             "txt": "want to travell to itally!",
//                             "by": {
//                                 "_id": "EEE22",
//                                 "fullname": "Benny Orenshtein",
//                                 "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984358/instagram/users-pic/user1_yqme7r.jpg"
//                             },
//                             "likedBy": [
//                                 {
//                                     "_id": "eeAA22",
//                                     "fullname": "yossi tik",
//                                     "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984344/instagram/users-pic/user3.jpg_clzrsm.jpg"
//                                 }
//                             ]
//                         },
//                         {
//                             "id": "dis23232s3786er3",
//                             "txt": "Im lovin it",
//                             "by": {
//                                 "_id": "OOO987",
//                                 "fullname": "Yoni Doy",
//                                 "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615984338/instagram/users-pic/user4_p6n68b.jpg"
//                             },
//                             "likedBy": []
//                         },
//                         {
//                             "id": "rrrr3786er3",
//                             "txt": "wow!!! really like this one!",
//                             "by": {
//                                 "_id": "EEE22",
//                                 "fullname": "Gal Dvori",
//                                 "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984349/instagram/users-pic/user2.jpg_muesqu.jpg"
//                             },
//                             "likedBy": [
//                                 {
//                                     "_id": "eeAA22",
//                                     "fullname": "yossi tik",
//                                     "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984344/instagram/users-pic/user3.jpg_clzrsm.jpg"
//                                 }
//                             ]
//                         },
//                     ],
//                     "likedBy": [
//                         {
//                             "_id": "aar4577",
//                             "fullname": "Gal Dvori",
//                             "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984349/instagram/users-pic/user2.jpg_muesqu.jpg"
//                         }
//                     ],
//                     "tags": [
//                         "animals",
//                         "nature"
//                     ],
//                     "isSaved": false
//                 },
//                 {
//                     "_id": "IUE567",
//                     "description": "best picture i took ever",
//                     "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1616094177/instagram/story-pic/pic4_jr0wfn.jpg",
//                     "loc": {
//                         "name": "Tel Aviv",
//                         "lat": 35.42,
//                         "lng": 34.22
//                     },
//                     "createdAt": 1616019195151,
//                     "creator": {
//                         "_id": "EEE22",
//                         "fullname": "Benny Orenshtein",
//                         "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984358/instagram/users-pic/user1_yqme7r.jpg"
//                     },
//                     "comments": [
//                         {
//                             "id": "disud3786er3",
//                             "txt": "awesome picture",
//                             "by": {
//                                 "_id": "ccr4577",
//                                 "fullname": "Roni Mizrahi",
//                                 "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615985058/instagram/users-pic/user5_vtz4w4.jpg"
//                             },
//                             "likedBy": [
//                                 {
//                                 "_id": "ccr4577",
//                                 "fullname": "Roni Mizrahi",
//                                 "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615985058/instagram/users-pic/user5_vtz4w4.jpg"
//                                 }
//                             ]
//                         },
//                         {
//                             "id": "dis23232s3786er3",
//                             "txt": "good one!!!",
//                             "by": {
//                                 "_id": "OOO987",
//                                 "fullname": "Yoni Doy",
//                                 "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615984338/instagram/users-pic/user4_p6n68b.jpg"
//                             },
//                             "likedBy": []
//                         }
//                     ],
//                     "likedBy": [
//                         {
//                             "_id": "EEE22",
//                             "fullname": "Benny Orenshtein",
//                             "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984358/instagram/users-pic/user1_yqme7r.jpg"
//                         },
//                         {
//                             "_id": "aar4577",
//                             "fullname": "Gal Dvori",
//                             "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615984349/instagram/users-pic/user2.jpg_muesqu.jpg"
//                         }
//                     ],
//                     "tags": [
//                         "animals",
//                         "nature"
//                     ],
//                     "isSaved": false
//                 }
//             ]
//         localStorage.setItem(KEY, JSON.stringify(postis))
//     }
//     return postis;
// }

