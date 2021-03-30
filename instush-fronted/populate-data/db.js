const user = {
    "_id": "AAAA22",
    "username": "yossi.tik",
    "password": "123",
    "fullname": "yossi tik",
    "imgUrl": "https:https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615984358/instagram/users-pic/user1_yqme7r.jpg",
    "createdAt": 12122134434,
    "following": [
        {
            "_id": "SSS22",
            "fullname": "danny levi",
            "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615984344/instagram/users-pic/user3.jpg_clzrsm.jpg",
        },
        {
            "_id": "QQQ123",
            "fullname": "Roni Mizrahi",
            "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615985058/instagram/users-pic/user5_vtz4w4.jpg",
        },
    ],
    "followers": [
        {
            "_id": "EEE22",
            "fullname": "Benny Orenshtein",
            "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615984358/instagram/users-pic/user1_yqme7r.jpg",
        },
        {
            "_id": "YYYY23",
            "fullname": "Gal Dvori",
            "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615984349/instagram/users-pic/user2.jpg_muesqu.jpg",
        },
    ],
    "savedPosts": ["FFF234", "ad24si9eu", "ewwoei2e29e"]
}

const posti = { 
    "_id": "FFF234",
    "description": "nice picture",
    "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/v1615979293/instagram/story-pic/pic2_ngjwmi.jpg",
    "loc": {
        "name": "Tel Aviv",
        "lat": 35.42,
        "lng": 34.22,
    },
    "createdAt": 12122212134,
    "creator": { // mini-user
        "_id": "EEE22",
        "fullname": "Benny Orenshtein",
        "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615984358/instagram/users-pic/user1_yqme7r.jpg",
    },
    "comments": [
        {
            "id": "disud3786er3",
            "txt": "awesome picture",
            "by": {
                "_id": "EEE22",
                "fullname": "Benny Orenshtein",
                "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615984358/instagram/users-pic/user1_yqme7r.jpg",
            },
            "likedBy": [
                {
                    "_id": "EEE22",
                    "fullname": "Leni Bright",
                    "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615984344/instagram/users-pic/user3.jpg_clzrsm.jpg",
                }
            ]
        },
        {
            "id": "dis23232s3786er3",
            "txt": "Im lovin it",
            "by": {
                "_id": "OOO987",
                "username": "Yoni Bar",
                "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615984338/instagram/users-pic/user4_p6n68b.jpg",
            },
            "likedUsers": []
        },
    ],
    "likedBy": [
        {
            "_id": "EEE22",
            "fullname": "Benny Orenshtein",
            "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615984358/instagram/users-pic/user1_yqme7r.jpg",
        },
        {
            "_id": "YYYY23",
            "fullname": "Gal Dvori",
            "imgUrl": "https://res.cloudinary.com/carmitvk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1615984349/instagram/users-pic/user2.jpg_muesqu.jpg",
        },
    ],
    "tags": ["animals", "nature"]
}