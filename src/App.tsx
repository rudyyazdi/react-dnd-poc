import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface Objective {
  id: number;
  name: string;
  type: 'Objective';
}
interface FocusArea {
  id: number;
  name: string;
  type: 'FocusArea';
  objectives: Objective[];
}

const DEFAULT_DATA: {focusAreas: FocusArea[]} = {
  focusAreas: [
    {
      id: 23,
      name: 'FocusArea 1',
      type: 'FocusArea',
      objectives: [
        {
          id: 303,
          type: 'Objective',
          name: 'Objective A',
        },
        {
          id: 304,
          type: 'Objective',
          name: 'Objective B',
        },
        {
          id: 305,
          type: 'Objective',
          name: 'Objective C',
        },
      ],
    },
    {
      id: 24,
      name: 'FocusArea 2',
      type: 'FocusArea',
      objectives: [
        {
          id: 306,
          type: 'Objective',
          name: 'Objective D',
        },
        {
          id: 307,
          type: 'Objective',
          name: 'Objective E',
        },
      ]
    }
  ]
}

function App() {
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>(DEFAULT_DATA.focusAreas);
  return (
    <div className="App">
      {/* for each focus area create a div with the name on the top and red border and then render
      each objective with title underneath. Draw green border around each objective div */}
      {focusAreas.map(focusArea => (
        <div key={focusArea.id} style={{ 
          border: '1px solid red',
          padding: '10px',
          margin: '10px',
        }}>
          <h2>{focusArea.name}</h2>
          {focusArea.objectives.map(objective => (
            <div key={objective.id} style={{ 
              border: '1px solid green',
              padding: '10px',
              }}>
              <h3>{objective.name}</h3>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
