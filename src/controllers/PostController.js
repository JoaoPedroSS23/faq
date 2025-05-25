// => Controller de posts (ou publicações)
const store = (req, res) => {
    res.send({type: 'POST'})
}

const update = (req, res) => {
    res.send({type: "PUT"})
}

const del = (req, res) => {
    res.send({type: 'DELETE'})
}

const details = (req, res) => {
    res.send({type: 'GET'})
}

const PostController = {
    store: store,
    update: update,
    delele: del,
    details: details
}
module.exports = PostController;