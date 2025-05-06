// components/TutorRecommendationChat.tsx
'use client';

import React, { useState } from 'react';
import styles from './TutorRecommendationChat.module.css'; // Assuming you have this CSS module

interface Tutor {
  name: string;
  subject: string;
  experience: string;
  rating: number;
  // Add other relevant properties as needed
}

const TutorRecommendationChat = () => {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const fetchRecommendations = async () => {
    console.log('fetchRecommendations called with query:', query);
    setIsLoading(true);
    console.log('isLoading set to:', isLoading);
    setError(null);
    setRecommendations([]);

    try {
      const response = await fetch('/api/groq-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      console.log('Fetch response:', response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch tutor recommendations');
      }

      const data = await response.json();
      console.log('Fetched data:', data);
      setRecommendations(data);
    } catch (err: any) {
      console.error('Error fetching recommendations:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
      console.log('isLoading set to:', isLoading);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Online Tutor Recommendation</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter your learning needs (e.g., 'Math tutor for high school', 'Science tutor with 5+ years experience')"
          value={query}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button onClick={fetchRecommendations} disabled={isLoading} className={styles.button}>
          {isLoading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {isLoading && <p>Loading recommendations...</p>}

      {recommendations.length > 0 && (
        <div className={styles.recommendations}>
          <h2>Recommended Tutors:</h2>
          <ul>
            {recommendations.map((tutor, index) => (
              <li key={index} className={styles.tutorCard}>
                <h3>{tutor.name}</h3>
                <p>Subject: {tutor.subject}</p>
                <p>Experience: {tutor.experience}</p>
                <p>Rating: {tutor.rating}/5</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {recommendations.length === 0 && !isLoading && !error && query && (
        <p>No recommendations found for your query.</p>
      )}

      {recommendations.length === 0 && !isLoading && !error && !query && (
        <p>Enter your learning needs to get tutor recommendations.</p>
      )}
    </div>
  );
};

export default TutorRecommendationChat;