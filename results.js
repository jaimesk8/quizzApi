$("#getdata").keypress(function(e){
  if (e.which == 13){
      $("#getdata").click();
  }
});

//get element
const getBtn = document.getElementById('getdata');
getBtn.addEventListener('click', getInfo);


function getInfo(e){
    //prevent to refesh the page
e.preventDefault()
//remove the load 

const feedDisplay = document.querySelector("#data-output") //getelement by id

fetch('http://192.168.1.11:3000/table')//,options)
          .then(response => {return response.json()})
          .then(data => {
            data.forEach(element => {
                            const article = `<tr>   <td>` + element.name + `</td>
                           
                            <td>` + element.nota + `</td>
                            <td>` + element.tempo + `</td>
                    </tr>`;
                //inject this into the div
                feedDisplay.insertAdjacentHTML("beforeend", article)
//                console.log(data)
              })  //then data
            })
          .catch(err => console.log(err))



}//get info 


