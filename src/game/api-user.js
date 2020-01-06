const getUsers = () => fetch('/users/getUsers', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then(res => res.json())
  .catch(err => {
      console.log(err); // eslint-disable-line
  });

const addUser = user => fetch('/users/addUser', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
})
  .then(res => {
    res.json();
  })
  .catch(err => {
      console.log(err); // eslint-disable-line
  });

const updateUser = user => fetch('/users/updateUser', {
  method: 'PATCH',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
})
  .then(res => {
    res.json();
  })
  .catch(err => {
      console.log(err); // eslint-disable-line
  });

export { getUsers, addUser, updateUser };
