import * as Users from "../models/users.js"

export default function auth(allowed_roles) {
    return function (req, res, next) {
        const authenticationKey = req.get("X-AUTH-KEY")
        if (authenticationKey) {
            Users.getByAuthenticationKey.then(user => {
                if (allowed_roles.includes(user.role)) {
                    next()
                } else {
                    res.status(403).json({
                        status: 403,
                        message: "Access forbidden"
                    })
                }
            }).catch(error => {
                res.status(500).json({
                    status: 500,
                    message: "Server error",
                    error
                })
            })
        } else {
            res.status(401).json({
                status: 401,
                message: "Authentication key missing"
            })
        }
    }
}