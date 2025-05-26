export const validToInsertPost = (data) => {
    if(!data.postTitle || data.postTitle.length < 3) {
        throw new Error('Título do comentário não informado ou preenchido de forma incorreta!')
    }

    if(!data.postDescription || data.postDescription.length < 5) {
        throw new Error("Informe corretamente a dúvida!")
    }

    return true;
}


export const validateToUpdate = (data) => {
    if(data.postTitle && data.postTitle.length < 3) {
        throw new Error('Título do comentário não informado ou preenchido de forma incorreta!')
    }

    if(data.postDescription && data.postDescription.length < 5) {
        throw new Error("Informe corretamente a dúvida!")
    }

    return true;
}