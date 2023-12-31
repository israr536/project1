import React, { useState } from 'react';
import './register.css';

const baseURL = sessionStorage.getItem('apipathurl');

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [designation, setDesignation] = useState('');
  const [role, setRole] = useState('2');
  const [registerMessage, setRegisterMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    // }  else if (name === 'designation') {
    //   setPassword(value);
    // } 
    else if (name === 'role') {
      setRole(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password || !role) {
      // Display an alert if any field is left vacant
      alert('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true); // Set loading state to true
      const response = await fetch(`http://localhost:3000/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      // const response = await fetch(`${baseURL}/user/register`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ username, email, password, role }),
      // });

      if (response.ok) {
        // Registration successful
        setRegisterMessage('Registration successful');
        // Reset form values
        setUsername('');
        setEmail('');
        setPassword('');
        // setDesignation('');
        setRole('');
        alert('You are successfully registered');
      } else {
        // Registration failed
        setRegisterMessage(`Registration failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false); // Set loading state back to false after the request completes
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h1>Register</h1>
      {registerMessage && <p>{registerMessage}</p>}
      <label>
        <br />
        Username:
        <input type="text" name="username" value={username} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="email" value={email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={password} onChange={handleChange} />
      </label>
      <br />
      {/* <label>
        Designation:
        <input type="text" name="designation" value={designation} onChange={handleChange} />
      </label>
      <br /> */}
      <label>
        Role:
        <input type="text" name="role" value={role} onChange={handleChange} />
      </label>
      <br />
      {isLoading ? (
        <div>Loading...</div> // Display the loader while isLoading is true
      ) : (
        <input type="submit" value="Submit" /> // Show the submit button when not loading
      )}
    </form>

   
  );
};

export default Register;
