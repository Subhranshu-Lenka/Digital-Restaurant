// in this projectwe will use the try-catch method, its alternative .then .catch is used in the TouYube project. Check that for references.

const asyncHandler = (fn) = async (req, res, next) => {

    try {
        await fn(req, res, next);
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message || "Not a good message, seems like something went wrong."
        })
    }

}

export { asyncHandler }