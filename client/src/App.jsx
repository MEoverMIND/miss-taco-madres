// client/src/App.jsx
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import ContestantCard from './ContestantCard';

const App = () => {
  const [contestants, setContestants] = useState([]);

  useEffect(() => {
    const fetchContestants = async () => {
      const querySnapshot = await getDocs(collection(db, 'contestants'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContestants(data);
    };

    fetchContestants();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>👑 Miss Taco Madres</h1>
      <p>Vote for your favorite contestant!</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {contestants.map((c) => (
          <ContestantCard key={c.id} data={c} />
        ))}
      </div>
    </div>
  );
};

export default App;
