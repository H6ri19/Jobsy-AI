import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import moment from 'moment';

const PrepHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.INTERVIEW.HISTORY);
        setHistory(res.data);
      } catch (err) {
        alert('Failed to load preparation history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p className="p-6">Loading history...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Interview Preparation History</h1>

      {history.length === 0 && <p>No interview preparation history found.</p>}

      <div className="space-y-4">
        {history.map((item, index) => (
          <div key={index} className="bg-white shadow p-4 rounded">
            <p>
              <strong>Level:</strong> {item.level}
            </p>
            <p>
              <strong>Questions:</strong> {item.questions.length}
            </p>
            <p className="text-sm text-gray-500">
              {moment(item.createdAt).format('DD MMM YYYY, hh:mm A')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrepHistory;
