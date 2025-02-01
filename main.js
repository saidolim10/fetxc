let maincard = document.getElementById('main-card');
let searchInput = document.getElementById('search'); // Assuming you have an input with this ID

function createCard(product) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="${product.image}" alt="">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="bottom">
            <h4 class='price'>${product.price} $</h4>
            <button onclick='Buy(${JSON.stringify(product)})'>Add to Cart</button>
        </div>
    `;
    return card;
}

fetch('https://fakestoreapi.com/products?limit=20')
    .then(response => response.json())
    .then(data => {
        data.forEach(product => {
            let card = createCard(product);
            maincard.append(card);
        });

        // Add event listener to the search input
        searchInput.addEventListener('input', function() {
            const searchTerm = searchInput.value.toLowerCase();

            // Get all the card elements
            const cards = maincard.querySelectorAll('.card');

            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();

                // Check if the title contains the search term
                if (title.includes(searchTerm)) {
                    card.style.display = 'block'; // Show the card
                } else {
                    card.style.display = 'none'; // Hide the card
                }
            });
        });
    });

let cart = []; // Store selected products

function Buy(product) {
    let list = document.getElementById('list');
    let cost = document.getElementById('cost');

    // Add the product to the cart array
    cart.push(product);

    // Clear and rebuild the list to avoid duplicates
    list.innerHTML = '';
    let totalCost = 0;

    cart.forEach(item => {
        let listItem = document.createElement('li');
        listItem.textContent = `${item.title} - ${item.price} $`;
        list.appendChild(listItem);
        totalCost += item.price;
    });

    // Update total cost
    cost.innerHTML = totalCost.toFixed(2);

    // Confirmation alert
    alert('Added to cart');
}

console.log(maincard);