import {
db,
collection,
addDoc,
onSnapshot,
doc,
updateDoc,
increment,
query,
orderBy
} from "./firebase.js";
const nameInput = document.getElementById("name");
const wishInput = document.getElementById("wish");
const allWish = document.getElementById("allWish");
const total = document.getElementById("total");
window.addWish = async function(){
   const name = nameInput.value.trim();
   const wish = wishInput.value.trim();
   if(name==="" || wish===""){
       alert("Please fill all fields.");
       return;
   }
   await addDoc(collection(db,"wishes"),{
       name:name,
       wish:wish,
       likes:0,
       time:Date.now()
   });
   nameInput.value="";
   wishInput.value="";
}
const q=query(
collection(db,"wishes"),
orderBy("likes","desc")
);
onSnapshot(q,(snapshot)=>{
   allWish.innerHTML="";
   total.innerHTML=snapshot.size;
   snapshot.forEach((item)=>{
       const data=item.data();
       allWish.innerHTML+=`
<div class="card">
<h3>❤️ ${data.name}</h3>
<p>${data.wish}</p>
<button
       class="likeBtn"
       onclick="likeWish('${item.id}')">
       ❤️ Like (${data.likes})
</button>
</div>
       `;
   });
});
window.likeWish = async function(id){
const ref=doc(db,"wishes",id);
await updateDoc(ref,{
likes:increment(1)
});
}
