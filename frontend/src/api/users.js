import { API_URL } from "./api";

export async function registerUser(userData) {
    const response = await fetch(
        API_URL + "/users/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"                
            },
            body: JSON.stringify(userData)
        }
    )
    const APIResponseObject = await response.json()
    return APIResponseObject
}



export async function getUserNameById(userId) {
    const response = await fetch(
        API_URL + `/users/id/${userId}`,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        }
    )
    const APIResponseObject = await response.json()
    const user = APIResponseObject.user
    if (user) {
        const name = user.last_name ? user.first_name + " " + user.last_name : user.first_name
        return name
    } else {
        return null
        // throw new Error("404 NOT FOUND")
    }    
}



export async function getUserById(userId) {
    const response = await fetch(
        API_URL + `/users/id/${userId}`,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        }
    )
    const APIResponseObject = await response.json()
    const user = APIResponseObject.user
    if (user) {
        return user
    } else {
        return null
    }    
}



export async function login(email, password) {
    const response = await fetch(
        API_URL + "/users/login",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    )
    const APIResponseObject = await response.json()
    return APIResponseObject

    /* Before using the auth wrap, use the method below
    if (APIResponseObject.status == 200) {
        return APIResponseObject.authenticationKey
    } else {
        return null
    } */
}


// TODO: TEST THIS METHOD
export async function logout(authenticationKey) {
    const response = await fetch(
        API_URL + "/users/logout",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'X-AUTH-KEY': authenticationKey
            },
            body: JSON.stringify({})  // why need this?
        }
    )
    const APIResponseObject = await response.json()
    return APIResponseObject
    // if (APIResponseObject.status == 200) {
    //     return APIResponseObject.user
    // } else {
    //     return APIResponseObject.message
    // }
}



export async function getUserByAuthenticationKey(authKey) {
    const response = await fetch(
        API_URL + `/users/authentication/${authKey}`,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        }
    )
    const APIResponseObject = await response.json()
    if (APIResponseObject.status == 200) {
        return APIResponseObject.user
    } else {
        return null
    }
}



export async function updateUser(user) {
    const response = await fetch(
        API_URL + `/users/${user.id}`,
        {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({user})
        }
    )
    const APIResponseObject = await response.json()
    console.log(APIResponseObject)
    return APIResponseObject
    // if (APIResponseObject.status == 200) {
    //     return APIResponseObject.user
    // } else {
    //     return null
    // }
}