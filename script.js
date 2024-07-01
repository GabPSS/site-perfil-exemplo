/// Define o usuário da rede social
class User {
    id;
    name;
    bio;
    posts = [];
    description;

    constructor(id,name,bio,description) {
        this.id = id;
        this.name = name;
        this.bio = bio;
        this.description = description
    }

    /// Atualiza as infomações da página com as informações do usuário
    refreshPage() {
        document.getElementById("banner-profile-picture").src = `img/profile/${this.id}.jpg`;
        document.getElementById("user-name").innerText = this.name;
        document.getElementById("user-bio").innerText = this.bio;
        document.getElementById("author-description").innerText = this.description;
        document.getElementById("feed").innerHTML = "";
        let feed = document.getElementById("feed");
        for (let i = 0; i < this.posts.length; i++) {
            feed.innerHTML = this.posts[i].getHtml() + feed.innerHTML;
        }
    }

    /// Atualiza os dados do modal de edição de informações
    updateModalInfo() {
        document.getElementById("user-name-edit").value = this.name;
        document.getElementById("user-bio-edit").value = this.bio;
        document.getElementById("user-description-edit").value = this.description;
    }

    /// Salva as informações da caixa de diálogo de edição de informações e atualiza a página
    saveModalInfo() {
        this.name = document.getElementById("user-name-edit").value;
        this.bio = document.getElementById("user-bio-edit").value
        this.description = document.getElementById("user-description-edit").value;
        this.refreshPage();
    }
}

/// Define o conteúdo de uma postagem 
class Post {
    id;
    author;
    date;
    content;
    likeCount;
    liked = false;

    constructor(id,author,date,content,likeCount) {
        this.id = id;
        this.author = author;
        this.date = date;
        this.content = content;
        this.likeCount = likeCount;
    }

    /// Atualiza o status do botão "Gostei" do post
    toggleLike() {
        this.liked = !this.liked;
        this.liked ? this.likeCount = this.likeCount + 1 : this.likeCount = this.likeCount - 1;
        let likebtns = document.getElementsByClassName("likebtn" + this.id);
        for (let i = 0; i < likebtns.length; i++) {
            let likeBtn = likebtns[i];
            if (this.liked) {
                likeBtn.classList.remove("btn-outline-danger");
                likeBtn.classList.add("btn-danger");
            } else {
                likeBtn.classList.remove("btn-danger");
                likeBtn.classList.add("btn-outline-danger");
            }
            likeBtn.innerHTML = `<img src="img/${this.liked ? "liked" : "not_liked"}.png" alt="" class="likeicon"/>${this.likeCount}`;
        }
    }

    /// Retorna o HTML de um único post
    getHtml() {
        let postHtml = `
            <div class="card-body">
                <div class="post-header">
                    <img src="img/profile/${this.author.id}.jpg" class="post-profile-image">
                    <div class="post-details">
                        <h5 class="author-name">${this.author.name}</h5>
                        <h6 class="post-date">${this.date}</h6>
                    </div>
                </div>
                <p class="card-text post-content">${this.content}</p>
                <a class="mt-2 btn btn-${this.liked ? "danger" : "outline-danger"} likebtn${this.id}" onclick="toggleLike(${this.id})"><img src="img/${this.liked ? "liked" : "not_liked"}.png" alt="" class="likeicon"/>${this.likeCount}</a>
            </div> 
        `;

        return `
        <a href="#" data-toggle="modal" data-target="#modal${this.id}" class="post-launcher">
            <div class="card post" id="post${this.id}">
                ${postHtml}      
            </div>
        </a>
        <div class="modal fade" id="modal${this.id}" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body post">
                        ${postHtml}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

function updateModalInfo() {
     currentUser.updateModalInfo();
}

function saveModalInfo() {
    currentUser.saveModalInfo();
}

function toggleLike(postId) {
    for (let i = 0; i < currentUser.posts.length; i++) {
        if (currentUser.posts[i].id == postId) {
            currentUser.posts[i].toggleLike();
        }
    }
}

// Exemplo de usuário padrão
let currentUser = new User(12345, "Ronaldo J. Fischer", "Jornalista e escritor brasileiro situado na Baixada Santista", "Olá, meu nome é Ronaldo, sou um jornalista profissional situado na Baixada Santista. Tenho prazer em levar a informação até você!");
currentUser.posts.push(new Post(0, currentUser, "29/12/1998", "Primeiro post!", 2));
currentUser.posts.push(new Post(1, currentUser, "04/02/2019", "Rede social nova.. A tecnologia sempre evoluindo para frente!", 3));
currentUser.posts.push(new Post(2, currentUser, "01/07/2024", "Esperança sempre!", 24));
currentUser.refreshPage();