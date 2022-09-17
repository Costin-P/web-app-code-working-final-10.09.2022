function addButtonAction()
{
    document.getElementById('search-button').addEventListener("click",()=> {
        const region=document.getElementById('search-box').value;
        searchSpots(region);
    }); 
}

async function searchSpots(region)
{
    const response = await fetch(`/search/${region}`);
    const data = await response.json();
    let avglat=0.0, avglong=0.0;
    data.forEach(element => {
        avglat=avglat+element.latitude;
        avglong=avglong+element.longitude;
    });
    avglat=avglat/data.length;
    avglong=avglong/data.length;
    setMap(avglat, avglong, data); 
}

function setMap(lat, long, regions)
{   
    const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";
    L.tileLayer
          ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              { attribution: attrib } ).addTo(map);
   //const position=[51.539101, 0.053980];
    const position=[lat, long];                  
    map.setView(position, 15);
    if (regions.length>0)
    {
        for(let i=0; i<regions.length; i++) 
        {
        marker = new L.marker ([regions[i].latitude, regions[i].longitude])
        .bindPopup(regions[i].type)
        .addTo(map);
        }
    }
    //const spot1=L.marker(position).addTo(map);  //this is to add a marker on the map
    display_location(regions);
}


function display_location(regions)
{
  document.getElementById('lists').innerHTML="";
  var table=document.createElement('table');
  var thread=document.createElement('thread');
  var tbody=document.createElement('tbody');
  table.appendChild(thread);
  table.appendChild(tbody);
  document.getElementById('lists').appendChild(table);
  
  let row1=document.createElement('tr');
  let row1heading1=document.createElement('th');
  row1heading1.innerHTML="Name";
  let row1heading2=document.createElement('th');
  row1heading2.innerHTML="Type";
  let row1heading3=document.createElement('th');
  row1heading3.innerHTML="Location";
  let row1heading4=document.createElement('th');
  row1heading4.innerHTML="Click and Book";
  row1.appendChild(row1heading1);
  row1.appendChild(row1heading2);
  row1.appendChild(row1heading3);
  row1.appendChild(row1heading4);
  thread.appendChild(row1);
   //now printing the data
regions.forEach((object)=>{
   let row2=document.createElement('tr');
   let row2heading1=document.createElement('td');
   row2heading1.innerHTML=object.name;
   let row2heading2=document.createElement('td');
   row2heading2.innerHTML=object.type;
   let row2heading3=document.createElement('td');
   row2heading3.innerHTML=object.location;
   let row2heading4=document.createElement('td');
   row2heading4.innerHTML=`<button class="book_button" id=${object.ID}>Click and Book</button>`;
   row2.appendChild(row2heading1);
   row2.appendChild(row2heading2);
   row2.appendChild(row2heading3);
   row2.appendChild(row2heading4);
   thread.appendChild(row2);
});

document.querySelectorAll('.book_button').forEach(item=>{
    item.addEventListener('click', event=>{
        alert(item.id);
        book(item.id);
    })
});

}

async function book(id)
{
    var object={accID:id, thedate:220601, username:"admin", npeople:1};
    fetch('/booking', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(object)
    })
    .then((response)=>response.json())
    .then((data)=>{alert("SThe request has been completed succesfully !");})
    .catch((error)=>{alert("Warning ! Data could not be added due to an error !")})
}