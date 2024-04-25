import { db } from "../database.js"

export function newUser(
    id,
    email,
    password,
    role,
    phone,
    first_name,
    last_name,
    address,
    authentication_key
) {
    return {
        id,
        email,
        password,
        role,
        phone,
        first_name,
        last_name,
        address,
        authentication_key
    }
}



export async function create(user) {
    return db.query(`
        INSERT INTO users (email, password, role, phone, first_name, last_name, address)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
            user.email,
            user.password,
            user.role,
            user.phone,
            user.first_name,
            user.last_name,
            user.address
        ]
    ).then(result => {
        // console.log(result)
        return {...user, id: result[0].insertId}
    })
}



export async function getById(userId) {
    const [queryResult] = await db.query(`SELECT * FROM users WHERE id = ?`, [userId])

    if (queryResult.length > 0) {
        const result = queryResult[0]
        return newUser(
            result.id,
            result.email,
            result.password,
            result.role,
            result.phone,
            result.first_name,
            result.last_name,
            result.address,
            result.authentication_key
        )
    } else {
        return null
    }

    // return queryResult.length > 0 ? queryResult[0] : null
}


export async function getByEmail(email) {
    const [queryResult] = await db.query(`SELECT * FROM users WHERE email = ?`, [email])
    return queryResult.length > 0 ? queryResult[0] : null
}



export async function getByAuthenticationKey(authenticationKey) {
    const [queryResult] = await db.query(`SELECT * FROM users WHERE authentication_key = ?`, 
        [authenticationKey])
    // if (queryResult.length > 0) {
    //     const userResult = queryResult[0]
    //     return Promise.resolve(
    //         newUser(
    //             userResult.id.toString(),
    //             userResult.email,
    //             userResult.password,
    //             userResult.role,
    //             userResult.phone,
    //             userResult.first_name,
    //             userResult.last_name,
    //             userResult.address,
    //             userResult.authentication_key
    //         )
    //     )
    // } else {
    //     return Promise.reject("No results found")
    // }
    return queryResult.length > 0 ? queryResult[0] : null
}



export async function update(user) {
    return db.query(`UPDATE users SET 
        email = ?,
        password = ?,
        role = ?,
        phone = ?,
        first_name = ?,
        last_name = ?,
        address = ?,
        authentication_key = ?
        WHERE id = ?
        `, [
            user.email,
            user.password,
            user.role,
            user.phone,
            user.first_name,
            user.last_name,
            user.address,
            user.authentication_key,
            user.id
        ]
    ).then(([result]) => {
        console.log(result)
        return user
    })
}