import { VASTClient } from 'vast-client'

const vastClient = new VASTClient();

vastClient.get('https://www.examplevast.com/vast.xml')
  .then(res => {
    var url = res
    console.log(url);
    
  })
  .catch(err => {
    // Deal with the error
  });