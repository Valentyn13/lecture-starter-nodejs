export const errorHandler = async (err, req, res, next) => {
    res.status(401).json({
        message: err
    })
}