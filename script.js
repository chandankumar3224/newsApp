const apiKey = "8387373b244f480fb749b305705db865";
const blogCart = document.querySelector(".blog-parent");
const searchInput = document.querySelector(".search-input");
const serachButton = document.querySelector(".search-button");

async function fetchRandomData() {
  try {
    const api = `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(api);
    const data = await response.json(); // Corrected usage of response.json()

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    } else {
      console.log("good work");
    }

    console.log(data.status);
    console.log(data.articles);
    return data.articles;
  } catch (error) {
    console.log("fetch error", error);
    return [];
  }
}

serachButton.addEventListener("click", async () => {
  const searchValue = searchInput.value.trim();
  if (searchValue !== "") {
    try {
      const article = await fetchSearchQuery(searchValue);

      if (article == "") {
        document.querySelector(".nodata").style.display = "block";
        console.log("changed");
        blogCart.classList.add("hide");
      } else {
        document.querySelector(".nodata").style.display = "none";
        blogCart.classList.remove("hide");
        displayBlogs(article);
      }
    } catch (error) {
      console.log("search input error", error);
    }
  }
  searchInput.value = "";
});

async function fetchSearchQuery(inputValue) {
  try {
    const api = `https://newsapi.org/v2/everything?q=${inputValue}&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(api);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    } else {
      console.log("good work");
    }

    return data.articles;
  } catch (error) {
    console.log("search input fetch error", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogCart.innerHTML = "";
  articles.forEach((article) => {
    // Fixed variable naming
    const blogcart = document.createElement("div");
    blogcart.classList.add("blog");

    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;

    const title = document.createElement("h2");
    const smallTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title;
    title.textContent = smallTitle;

    const desc = document.createElement("p");
    const smallDesc =
      article.description.length > 120
        ? article.description.slice(0, 120) + "..."
        : article.description;
    desc.textContent = smallDesc;

    blogcart.appendChild(img);
    blogcart.appendChild(title);
    blogcart.appendChild(desc);
    blogcart.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogCart.appendChild(blogcart);
  });
}

(async () => {
  try {
    const articles = await fetchRandomData();
    displayBlogs(articles); // Ensure displayBlogs is called
  } catch (error) {
    console.log("fetch error", error);
  }
})();
