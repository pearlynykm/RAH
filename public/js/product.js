function loadProductData(){
    var request= new XMLHttpRequest();

    var productArray=[];

    request.open("GET", "http://127.0.0.1:9090/products",true);

    request.onload=function(){

        productArray=JSON.parse(request.responseText);
        insertDynamicProducts(productArrayArray);
    }
    request.send();
}

function insertDynamicProducts(productArray){

    var dynamicProductList = document.getElementById("dynamicProductDataList");

    let newContent = "<table><tr>";

    for (let i=0; i<productArray.length;i++){
        console.log(productArray[i]);

        newContent+=
        "<td><h4>"+ productArray[i].name+"</h4>"+
        "<img src='" + productArray[i].picture +"'width='150'><br>"+
        "</td>";

        if((i+1)%3===0&&i<productArray.length - 1){
            newContent+="</tr><tr>";
        }
    }
    newContent += "</tr><table>";
    alert(newContent);
    dynamicProductList.innerHTML =newContent;
}

function addProductData(){
    var product = new Object();
    product.picture=document.getElementById('picture').value;
    product.name =document.getElementById('name').value;
    product.description= document.getElementById('description').value;
    product.category_id=document.getElementById('category_id').value;
    product.price=document.getElementById('price').value;
    
    var request = new XMLHttpRequest();
    request.open("POST","/products",true)
    request.setRequestHeader("Content-Type","application/json");
    
    request.onload=function(){
        alert(request.responseText)
    };
    request.send(JSON.stringify(product));
}
function loadProductDetail(){
    var request = new XMLHttpRequest();

    var params =new URLSearchParams(location.search);
    var id =params.get("id");

    console.log("id"+id);
    var product;
    var urlLink ="/product/"+id;

    request.open("GET",urlLink, true);

    request.onload=function(){
        console.log(request.responseText);
        restaurant=JSON.parse(request.responseText);
        console.log(product)
        setProductDetail(product[0]);

    }
    request.send();
}
function setProductDetail(product)
{

    document.getElementById('picture').value =product.picture;
    document.getElementById('name').value =product.name;
    document.getElementById('description').value=product.description;
    document.getElementById('category').value =product.category;
    document.getElementById('price').value=product.price;
    document.getElementById('id').value =product.id;
    document.getElementById('deleteButton').setAttribute("restId",product.id);
}
//...
function deleteProductData(item){
    var id = item.getAttribute("restId");
    console.log("delete id"+id)

    var request= new XMLHttpRequest();

    request.open("delete","/products/"+id,true);

    request.onload = function(){
        location.href ="product.html"
    }
    request.send();
}

function updateProductData(){
    var product =new Object();
    product.name = document.getElementById('name').value;
    product.description = document.getElementById('description').value;
    product.category = document.getElementById('category').value;
    product.price = document.getElementById('price').value;
    product.picture = document.getElementById('picture').value;
    var id = document.getElementById('id').value;

    var request = new XMLHttpRequest();
    var urlLink="/products/"+id;
    request.open("PUT", urlLink,true);
    request.setRequestHeader("Content-Type","applications/json");

    request.onload=function(){
        alert(request.responseText)
    };
    request.send(JSON.stringify(product));

}