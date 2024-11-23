// DownloadComponent.js

import React from 'react';
import axios from 'axios';

// const InstallSoft = () => {
//   const handleDownload = () => {
//     const softwareUrl = 'https://nodejs.org/dist/v14.17.0/node-v14.17.0-linux-x64.tar.xz';
//     const downloadLocation = '/home/user/downloads/node-v14.17.0-linux-x64.tar.xz';

//     axios.post(`${window.location.origin}/download/approvedSoftware`, { softwareUrl, downloadLocation })
//       .then(response => {
//         console.log(response.data);
//       })
//       .catch(error => {
//         console.error('Error downloading software:', error);
//       });
//   };

//   return (
//     <div>
//       <button onClick={handleDownload}>Download Software</button>
//     </div>
//   );
// };

const InstallSoft = () => {
  const handleDownload = async () => {
    const softwareUrl = 'https://nodejs.org/dist/v14.17.0/node-v14.17.0-linux-x64.tar.xz';
    const downloadLocation = '/home/user/downloads/node-v14.17.0-linux-x64.tar.xz';

    try {
      const response = await axios.post(`${window.location.origin}/download/approvedSoftware`, {
        softwareUrl,
        downloadLocation,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Request failed with status code:', error.response.status);
        console.error('Response data:', error.response.data);
        alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        alert('Error: No response received from the server');
      } else {
        // Something else happened while setting up the request
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Software</button>
    </div>
  );
};

export default InstallSoft;

