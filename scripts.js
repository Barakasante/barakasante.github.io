
// Charger les articles depuis le fichier JSON
fetch('articles.json')
    .then(response => response.json())
    .then(data => {
        const articlesDiv = document.getElementById('articles');
        data.forEach(article => {
            const articleHTML = `
                <article>
                    <h3>${article.title}</h3>
                    <p>${article.content}</p>
                    <small>Publié le : ${article.date}</small>
                </article>
            `;
            articlesDiv.innerHTML += articleHTML;
        });
    })
    .catch(error => console.error("Erreur lors du chargement des articles :", error));

// Intégration PayPal
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: { value: '50.00' }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Paiement effectué par ' + details.payer.name.given_name);
        });
    }
}).render('#paypal-button-container');
