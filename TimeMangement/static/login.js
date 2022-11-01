let data = new FormData();


function LogIN(){

    

    let Username = document.getElementById('Username');
    let Password = document.getElementById('Password');

    data.append('username', Username);
    data.append('password', Password);

    fetch('/test/', {

        method: 'POST',
        body: data
  
      });

}