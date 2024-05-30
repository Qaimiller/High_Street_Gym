import { db } from "../database.js"

export function newClass(
    id,
    datetime,
    location_id,
    activity_id,
    trainer_user_id
) {
    return {
        id,
        datetime,
        location_id,
        activity_id,
        trainer_user_id
    }
}



export async function getAll() {
    const [allClassResults] = await db.query("SELECT * FROM classes")
    return await allClassResults.map(
        classResult => newClass(
            classResult.id,
            classResult.datetime,
            classResult.location_id,
            classResult.activity_id,
            classResult.trainer_user_id
        )
    )
}



export async function getById(classId) {
    const [queryResult] = await db.query(`SELECT * FROM classes WHERE id = ?`, [classId])
    if (queryResult.length > 0) {
        const result = queryResult[0]
        return newClass(
            result.id,
            result.datetime,
            result.location_id,
            result.activity_id,
            result.trainer_user_id
        )
    } else {
        return Promise.reject("No classes matched.")   // Will go to .catch() in controller
    }
}



export async function getActivityIdsByTimeRange(start, end) {
    const [queryResult] = await db.query(`SELECT DISTINCT activity_id FROM classes
        WHERE datetime BETWEEN ? AND ?
        `, [start, end])
    if (queryResult.length > 0) {
        const activityIds = queryResult.map(item => item.activity_id)  // Convert array of objects into array of ints
        return activityIds
    } else {
        return []   // for future mapping, cannot return null
    }
}



export async function getByTimeRangeAndActivityId(start, end, activityId) {
    const [queryResult] = await db.query(`SELECT * FROM classes 
        WHERE datetime BETWEEN ? AND ?
        AND activity_id = ?`, 
        [start, end, activityId])
    if (queryResult.length > 0) {
        return queryResult
    } else {
        return []
    }
}



export async function getByTrainerId(trainerId) {
    const [queryResult] = await db.query(`SELECT * FROM classes WHERE trainer_user_id = ? ORDER BY datetime ASC`, [trainerId])
    if (queryResult.length > 0) {
        return queryResult
    } else {
        return []
    }
}



// TODO: test this method
export async function create(classSession) {
    return db.query(`
        INSERT INTO classes (
            datetime,
            location_id,
            activity_id,
            trainer_user_id   
        ) VALUES (?, ?, ?, ?)`, 
        [
            classSession.datetime,
            classSession.location_id,
            classSession.activity_id,
            classSession.trainer_user_id
        ]
    ).then(result => {
        return {...classSession, id: result[0].insertId}
    })
}



export async function update(classSession) {
    return db.query(`
        UPDATE classes SET
        datetime = ?,
        location_id = ?,
        activity_id = ?,
        trainer_user_id = ?
        WHERE id = ?
    `, [
        classSession.datetime,
        classSession.location_id,
        classSession.activity_id,
        classSession.trainer_user_id,
        classSession.id
    ]).then(([result]) => {
        return classSession
    })
}