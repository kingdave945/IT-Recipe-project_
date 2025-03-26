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





const searchBar = document.getElementById("search");
const suggestionsBox = document.getElementById("suggestions");
searchBar.addEventListener("input", async function() {   
    const query = this.value.trim().toLowerCase();
    if (query.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
           const data = await response.json();
       

suggestionsBox.innerHTML = "";

        if (data.meals) {
            data.meals.slice(0, 5).forEach(meal => {
                const li = document.createElement("li");
                li.textContent = meal.strMeal;
                li.addEventListener("click", function() {
                    searchBar.value = meal.strMeal;
                    suggestionsBox.style.display = "none";
                    window.location.href = `https://www.themealdb.com/meal/${meal.idMeal}`;
                   
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

