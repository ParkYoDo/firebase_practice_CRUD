import React, { useEffect, useState } from 'react';
import { db } from './firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

function App() {
  const [input, setInput] = useState({ name: '', age: '' });
  const { name, age } = input;

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [usersCollectionRef]);

  const showUsers = users.map((user, i) => (
    <div key={user.id}>
      <h1>Name:{user.name}</h1>
      <h1>Age:{user.age}</h1>
      <button
        onClick={() => {
          updateUser(user.id, user.age);
        }}
      >
        Increase Age
      </button>
      <button
        onClick={() => {
          deleteUser(user.id);
        }}
      >
        Delete User
      </button>
    </div>
  ));

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name, age: Number(age) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, 'users', id);
    const newField = { age: age + 1 };
    await updateDoc(userDoc, newField);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <>
      <input
        type="text"
        name="name"
        value={name}
        placeholder="name"
        onChange={onChange}
      />
      <input
        type="number"
        name="age"
        value={age}
        placeholder="age"
        onChange={onChange}
      />
      <button onClick={createUser}>Create User</button>
      {showUsers}
    </>
  );
}

export default App;
