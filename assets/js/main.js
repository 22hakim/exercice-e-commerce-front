document.addEventListener('click', (event)=>{

    // console.log(event)
    //console.log(event.target)

    if(event.target.matches(".dropdown-item"))
    {
        const categoryName = event.target.dataset.categoryName
        // console.log(categoryName)
        displayOneCategory(categoryName)
    }

    if(event.target.matches("#display-all-categories"))
    {
        displayAllCategories()
    }

})


function displayOneCategory(categoryName)
{
    const sections = document.querySelectorAll("section")

    for(const element of sections)
    {
        if(element.id == categoryName)
        {
            changeClasses(element, "displayOff", "displayOn")
        }else{
            changeClasses(element, "displayOn", "displayOff")
        }
    }
}

function displayAllCategories()
{
    const sections = document.querySelectorAll("section")

    // for(const element of sections)
    // {
    //     changeClasses(element, "displayOff", "displayOn")
    // }

    sections.forEach(elem => changeClasses(elem, "displayOff", "displayOn"))
}

function changeClasses(element, oldClass, newClass)
{
    // verifie que l'element contiens la classe 
    // ex: <span class="toto"></span> contient la classe toto 
    // donc retourne true
    if(element.classList.contains(oldClass))
    {
        // dans ces cas la il enleve toto 
        element.classList.remove(oldClass) 
    }
    // et ajoute la nouvelle classe ex : tata
    element.classList.add(newClass)    

    // resultat <span class="tata"></span>
}