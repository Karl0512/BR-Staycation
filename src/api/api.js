// api.js
export const mockLoginAPI = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const admin = {
          username: 'admin',
          password: 'admin'
        };
        
        // Simulate a successful login
        if (username === admin.username && password === admin.password) {
          resolve({ status: 200, message: 'Login successful!' });
          console.log("Success")
        } else {
          reject({ status: 401, message: 'Invalid credentials' });
          console.log("Wrong pass")
        }
      }, 1000); // Simulating network delay
    });
  };
  