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

            res.status(201).send({message: 'Dúvida inserida com sucesso!'});
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
        let findData = { status: true };
        let queryString = req.query;
        
        const query = PostModel.where(findData);

        // => Filtro search
        if(queryString?.sh?.length > 1) {
            let orClause = [
                {postTitle: {$regex: '.*' + queryString.sh + '.*'}},
                {postDescription: {$regex: '.*' + queryString.sh + '.*'}}
            ]
            query.or(orClause);
        }

        let posts;

        if(queryString?.id?.length > 1) {
            query.and({_id: `${queryString.id}`});

            posts = await query.findOne();
        } else {
            posts = await query.find();

        }


        res.send(posts);

    } catch(err) {
        console.error(err);
        res.send({message: `Não foi possível concluir sua solicitação`})
    }
}

const addComment = async(req, res) => {
    try{
        const id = req.params.id;
        let comment = req.body.comment;
        
        let post = await PostModel.findById(id);

        if(post == null) {
            throw new Error("Dúvida não encontrada")
        }

        if(comment.replace(' ', '').length < 1) {
            throw new Error("Comentário inválido!")
        }

        let comments = post.comments || [];

        comments.push({
            commentDescription: comment,
            commentDate: new Date().toJSON()
        });

        post.comments = comments;
        await post.save();

        res.status(201).send('ok');

    } catch(err) {
        console.error(err);
        res.send({message: `Não foi possível concluir sua solicitação, aguarde e tente novamente!`})
    }
}

const PostController = {
    store: store,
    update: update,
    del: del,
    details: details,
    addComment: addComment
}
module.exports = PostController;