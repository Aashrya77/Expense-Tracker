const notFound = (req, res) => {
    res.status(404).json({msg: 'Page you are looking for does not exist'})
}

module.exports = notFound