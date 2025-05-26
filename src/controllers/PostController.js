const { validToInsertPost, validateToUpdate } = require("./Validators/PostValidator");
const PostModel = require("./../models/PostModel");
// => Controller de posts (ou publicações)
const store = async (req, res) => {
    body = req.body;
    try{
        if(validToInsertPost(body)) {
            let post = {
                'postTitle': body.postTitle,
                'postDescription': body.postDescription,
                'postdate': new Date().toJSON()
            }
            await PostModel.create(post)

            res.send({message: 'Dúvida inserida com sucesso!'}).withStatus(201);
        } else {
            throw new Error('Não foi possível concluir sua solicitação. Entre em contato com o administrador do sistema.');
        }
    } catch(err) {
        console.error(err);
        res.send({message: `Não foi possível concluir sua solicitação, Erro: ${err.message}`})
    }
}

const update = async (req, res) => {
    try{
        let body = req.body;
        let id = req.params.id;
        validateToUpdate(body);

        const query = PostModel.where({ _id: id, status: true });
        let post = await query.findOne();

        if(post == null) {
            throw new Error("Dúvida não encontrada")
        }

        Object.keys(body).map(key => {
            post[key] = body[key];
        })

        await post.save();

        res.send({message: "Registro alterado!", post});

    }catch(err) {
        console.error(err);
        res.send({message: `Não foi possível concluir sua solicitação, Erro: ${err.message}`})
    }
}

const del = async (req, res) => {
    const id = req.params.id

    try{
        // => Exclusão semantica
        let post = await PostModel.findById(id);
        post.status = false;
        post.save();

        res.send({"message": "Dúvida Removida!", post});
    }catch(err) {
        console.error(err);
        res.send({message: `Não foi possível concluir sua solicitação, Objeto não encontrado`})
    }
}

const details = async (req, res) => {
    try{
        const query = PostModel.where({ status: true });
        let posts = await query.find();

        res.send(posts);

    } catch(err) {
        console.error(err);
        res.send({message: `Não foi possível concluir sua solicitação`})
    }
}

const PostController = {
    store: store,
    update: update,
    del: del,
    details: details
}
module.exports = PostController;