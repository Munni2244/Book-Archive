const inputText=document.getElementById('inputId');      //inputId
const errorDiv=document.getElementById('error');         // error div
const container=document.getElementById('container');      // card container
const foundResult = document.getElementById('result');        //total found
//search input
const getInputField=()=>{
    const inputValue= inputText.value;
    inputText.value="";
    if(inputValue===""){
      errorDiv.innerText="Please Enter Your Value! ";
      return;
    }
 // clear container//
    container.innerHTML='';
    //data fetch
    fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
    .then(res => res.json())
    .then(data => {
      foundResult.innerText=`Total result Found: ${data.numFound}`;         //total result found
      getDisplayValue(data.docs);
    }) 
};

// call data/////
const getDisplayValue =(books) =>{
    errorDiv.innerText='';

  //error handling///
      if(books.length===0){
       errorDiv.innerText='Request result not found! Please Try Again!'
    }
    
    //append data///////
      books.forEach(book=> {
    const div = document.createElement('div');
    div.classList.add('row');
    div.innerHTML=`
    <div class="col mx-3 my-5 shadow ">
              <div class=" h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i?book.cover_i:''}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h1 class="card-title"> <span class="title">${book.title ? book.title:'Title is not found</span>'} </h1>
                  <h5 class="card-title"><span>${book.author_name[0] ? book.author_name[0]:'Name is not found </span>'} </h5>
                   <p>Published by  <span id="span"> ${book.publisher[0] ? book.publisher[0]:'Publisher is not found'}, ${book.first_publish_year ? book.first_publish_year:'Data year not found</span>'}</p>
                 
                </div>
              </div>
            </div>
    `
    container.appendChild(div);
   
    }); 
}