const apiUrl = 'https://localhost:7282/api/users'; 

const GetUsers = () => {
    // Make a GET request using the Fetch API
    fetch(apiUrl)
    .then(response => {
        let loadingImg = document.getElementById("users-loading-svg");
        loadingImg.classList.add("hidden");

        if (!response.ok) {
         throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(responceData => {  
        let usersDiv = document.getElementById("user-list");    
        responceData.result.map((user) => {
            // Process the list of recent users
            var newUser = document.createElement('span');
            newUser.innerHTML = user.name;
            usersDiv.appendChild(newUser);    
        });        
    })
    .catch(error => {
        console.error('Error:', error);
    });
} 

const GetUserById = () => {

    let loadingImg = document.getElementById("id-loading-svg");
    loadingImg.classList.remove("hidden");

    // API endpoint for fetching user for the given id
    // Combine API endpoint with query parameters
    let idSelector = document.getElementById("id-selector");
    let userId = idSelector.value;
    const fullUrl = `${apiUrl}/${userId}`;   
    

    // Make a GET request using the Fetch API
    fetch(fullUrl)
    .then(response => {
        loadingImg.classList.add("hidden");
        if(UserNotFound(response))
        {
            alert(`No user found for id ${userId}`);
            return;
        }

        if (!response.ok) {          
          throw new Error('Network response was not ok');
        }

        return response.json();
    })
    .then(responceData => {
        
        if(responceData && responceData.result)
        {
            alert(`You selected the id for user ${responceData.result.name}`);
        }
        
    })
    .catch(error => {
        console.error('Error:', error);
    })
} 

const UserNotFound = (response) =>
{ 
  if(!response.ok && response.status == 400)
  {return true; }

  return false;
};

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Ready!!");
    alert(`The app is sending the request to: ${apiUrl}. Please adjust the value of the apiUrl constant at ./js/script.js line 1.`);      
    let users = GetUsers(); 
});