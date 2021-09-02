const inputText=document.getElementById('inputId');
const errorDiv=document.getElementById('error');
const errorDiv2=document.getElementById('error2');
const container=document.getElementById('container');
const foundResult = document.getElementById('result');
const getInputField=()=>{
   
    const inputValue= inputText.value;
    inputText.value="";
    // if(inputValue===""){
    //   errorDiv.innerText="Input Value Cann't be Empty ";
    //   // return;
    // }
    container.innerHTML='';
    fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      foundResult.innerText=`Total result Found: ${data.numFound}`;
      getDisplayValue(data.docs);
    })
   
};

// getInputField();
const getDisplayValue =(books) =>{
    console.log(books);
  
//       if(!books.numFoundExact){
//         console.log(errorDiv);
//         errorDiv2.style.display='block'
//        errorDiv2.innerText='Request result not found!'
//     }
    
//   else{
//     errorDiv2.style.display='none';
// }

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