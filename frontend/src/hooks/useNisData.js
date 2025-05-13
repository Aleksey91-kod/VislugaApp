import { useEffect, useState } from 'react';

function useNisData() {
  const [nisData, setNisData] = useState({});

  useEffect(() => {
    fetch('/nis_data.csv')
      .then(res => res.text())
      .then(text => {
        const lines = text.trim().split('\n');
        const data = {};
        for (let i = 1; i < lines.length; i++) {
          const [year, amount] = lines[i].split(',');
          data[parseInt(year)] = parseFloat(amount);
        }
        setNisData(data);
      });
  }, []);

  return nisData;
}

export default useNisData;