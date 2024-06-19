const apiKey = 'b2fe28e036124498b63e4b2c233d1318';
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const newsContainer = document.getElementById('newsContainer');

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    fetchNews(query);
});

async function fetchNews(query) {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.articles);
}

function displayNews(articles) {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const newsArticle = document.createElement('div');
        newsArticle.className = 'news-article';

        const image = document.createElement('img');
        image.src = article.urlToImage || 'placeholder.jpg';

        const title = document.createElement('h3');
        title.textContent = article.title;

        const description = document.createElement('p');
        description.textContent = article.description;

        const date = document.createElement('p');
        date.className = 'date';
        date.textContent = new Date(article.publishedAt).toLocaleString();

        const share = document.createElement('div');
        share.className = 'share';
        
        const twitterLink = document.createElement('a');
        twitterLink.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(article.url)}&text=${encodeURIComponent(article.title)}`;
        twitterLink.textContent = 'Share on Twitter';
        twitterLink.target = '_blank';
        
        const whatsappLink = document.createElement('a');
        whatsappLink.href = `whatsapp://send?text=${encodeURIComponent(article.title)}%20${encodeURIComponent(article.url)}`;
        whatsappLink.textContent = 'Share on WhatsApp';
        whatsappLink.target = '_blank';
        
        share.appendChild(twitterLink);
        share.appendChild(whatsappLink);

        const readMoreLink = document.createElement('a');
        readMoreLink.href = article.url;
        readMoreLink.textContent = 'Read more';
        readMoreLink.className = 'read-more';
        readMoreLink.target = '_blank';

        newsArticle.appendChild(image);
        newsArticle.appendChild(title);
        newsArticle.appendChild(description);
        newsArticle.appendChild(date);
        newsArticle.appendChild(share);
        newsArticle.appendChild(readMoreLink);

        newsContainer.appendChild(newsArticle);
    });
}
