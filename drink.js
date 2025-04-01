const header = document.querySelector("header")

window.addEventListener("scroll", function(){
    header.classList.toggle ("sticky" , window.scrollY > 0)
})
function keyDownEnter(){
    if(event.key === 'Enter'){
        fetchData()
    }
     if(event.key === '/'){
        searchBar
    }
}


// www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita



const searchBar = document.getElementById("search");
const suggestionsBox = document.getElementById("suggestions");
searchBar.addEventListener("input", async function() {   
    const query = this.value.trim().toLowerCase();
    if (query.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
           const data = await response.json();
       

suggestionsBox.innerHTML = "";

        if (data.drinks) {
            data.drinks.slice(0, 5).forEach(drink => {
                const li = document.createElement("li");
                li.textContent = drink.strDrink;
                li.addEventListener("click", function() {
                    searchBar.value = drink.strDrink;
                    suggestionsBox.style.display = "none";
                    window.location.href = `https://www.thecocktaildb.com/${drink.idDrink}`;
                   
                });
               
                suggestionsBox.appendChild(li);
             
            });
         
            suggestionsBox.style.display = "block";
        }    else{
            suggestionsBox.innerHTML = `<li style="color: blue;">Not Found</li>`;
            suggestionsBox.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

