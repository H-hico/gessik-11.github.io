db.enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            console.log('persistance failed');
        } else if (err.code == 'unimplemented') {
            console.log('persistance not available');
        }
    });

db.collection('doces').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            renderRecipe(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {
        }
    });
});



// adicionar nova sobremesa
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const sobremesa = {
        nome: form.sobremesaTitulo.value,
        descricao: form.sobremesaDescricao.value,
        link: form.sobremesaLink.value,
        endereco_imagem: form.sobremesaArquivo.value
    };

    db.collection('sobremesas').add(sobremesa)
        .catch(err => console.log(err));

    //reseta o formulario
    form.sobremesaTitulo.value = '';
    form.sobremesaDescricao.value = '';
    form.sobremesaLink.value = '';
    form.sobremesaArquivo.value = '';

});
