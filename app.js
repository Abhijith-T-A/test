const form=document.querySelector('form');
const grocery=document.querySelector('.grocery')
const itemContainer=document.querySelector('.item-container')
const alert=document.querySelector('.alert');
const clear=document.querySelector('.clear');
const submitBtn=document.querySelector('.submit-btn')
let id;
let list;
let editId;

//what to do when the page loads
window.addEventListener('DOMContentLoaded',function(){
    setId();
    setList();
    list.forEach(function(li){
        displayItem(li.id,li.item);
    })   
    displayClear();
});

//what to do when the form is submitted
form.addEventListener('submit',function(e){
    e.preventDefault();
    let item=grocery.value;
    if(item&&submitBtn.textContent==='submit'){       
        let itemObject={id,item};
        list.push(itemObject);
        localStorage.setItem('list',JSON.stringify(list));
        displayItem(id,item);
        updateId();
        setAlert('item added','green');
        setDefault();
        displayClear();
    }
    else if(item&&submitBtn.textContent==='edit'){
        list=list.map(function(li){
            if(li.id==editId){
                li.item=grocery.value;
                return li;
            }
            else
                return li;           
        });
        localStorage.setItem('list',JSON.stringify(list));
        itemContainer.textContent='';
        list.forEach(function(li){
            displayItem(li.id,li.item);
        });
        setAlert('item editted','green');
        setDefault();  
    }
    else
        setAlert('Enter the item','red');
});

//what to do on click of edit and delete button
itemContainer.addEventListener('click',function(e){
    if(e.target.parentElement.classList.contains('edit-btn')){
        editId=e.target.parentElement.parentElement.previousElementSibling.dataset.id;
        let element=list.find(function(li){
            if(li.id==editId)
            return li;
        })
        grocery.value=element.item;
        submitBtn.textContent='edit';
    }
    else if(e.target.parentElement.classList.contains('delete-btn')){
        let deleteId=e.target.parentElement.parentElement.previousElementSibling.dataset.id;
        list=list.filter(function(li){
            if(li.id!=deleteId)
            return li;
        })
        localStorage.setItem('list',JSON.stringify(list));
        itemContainer.textContent='';
        list.forEach(function(li){
            displayItem(li.id,li.item);
        })
        setAlert('item delete','red')
        displayClear();
    }
})

//event on click of clear items
clear.addEventListener('click',function(){
    localStorage.removeItem('list');
    list=[];
    itemContainer.textContent='';
    clear.classList.add('hidden')
    setAlert('items cleared','red');
})

//function to display clear button
function displayClear(){
    if(list.length<1)
        clear.classList.add('hidden');
    else
        clear.classList.remove('hidden');
}

//function to set alert message and color
function setAlert(message,color){
    alert.textContent=message;
    alert.classList.add(`${color}-alert`);

    setTimeout(function(){
    alert.textContent="alert";
    alert.classList.remove(`${color}-alert`);
    },500)
}

//function to set form back to default
function setDefault(){
    grocery.value='';
    submitBtn.textContent='submit';
}

//function to display item
function displayItem(Fid,item){
        let listItem=document.createElement('div');
        listItem.classList.add("item");
        listItem.innerHTML=`<h4 class="item-name" data-id="${Fid}">${item}</h4>
                <div class="btn-container">
                    <button class="btn edit-btn"><i class="fas fa-edit"></i></button>
                <button class="btn delete-btn"><i class="fas fa-trash-alt"></i></button>
                </div>`;
        itemContainer.appendChild(listItem);
}

//function to set the list of items
function setList(){
    if(localStorage.getItem('list'))
        list=JSON.parse(localStorage.getItem('list'));
    else
        list=[];
}

//function to set id
function setId(){
    if(localStorage.getItem('id'))
        id=JSON.parse(localStorage.getItem('id'));
    else{
        localStorage.setItem('id',1);
        id=JSON.parse(localStorage.getItem('id'));
    }
}

//function to update id
function updateId(){
    id++;
    localStorage.setItem('id',id);
}