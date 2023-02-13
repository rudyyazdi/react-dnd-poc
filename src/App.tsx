import React, { useState } from "react";
import "./App.css";
import { useDrag, useDrop } from "react-dnd";
interface Objective {
  id: number;
  name: string;
  type: "Objective";
}
interface FocusArea {
  id: number;
  name: string;
  type: "FocusArea";
  objectives: Objective[];
}

const DEFAULT_DATA: { focusAreas: FocusArea[] } = {
  focusAreas: [
    {
      id: 23,
      name: "FocusArea 1",
      type: "FocusArea",
      objectives: [
        {
          id: 303,
          type: "Objective",
          name: "Objective A",
        },
        {
          id: 304,
          type: "Objective",
          name: "Objective B",
        },
        {
          id: 305,
          type: "Objective",
          name: "Objective C",
        },
      ],
    },
    {
      id: 24,
      name: "FocusArea 2",
      type: "FocusArea",
      objectives: [
        {
          id: 306,
          type: "Objective",
          name: "Objective D",
        },
        {
          id: 307,
          type: "Objective",
          name: "Objective E",
        },
      ],
    },
  ],
};

function App() {
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>(
    DEFAULT_DATA.focusAreas
  );
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: "BOX",
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'BOX',
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  console.log({ isDragging });

  return (
    <div className="App">
      {/* for each focus area create a div with the name on the top and red border and then render
      each objective with title underneath. Draw green border around each objective div */}
      {focusAreas.map((focusArea) => (
        <div
          key={focusArea.id}
          style={{
            border: "1px solid red",
            padding: "10px",
            margin: "10px",
            backgroundColor: isOver ? 'red' : 'white'
          }}
          ref={drop}
          role={'Dustbin'}
        >
          <h2>{focusArea.name}</h2>
          {canDrop ? 'Release to drop' : 'Drag a box here'}
          {focusArea.objectives.map((objective) => (
            <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
              <div
                key={objective.id}
                style={{
                  border: "1px solid green",
                  padding: "10px",
                  margin: "10px",
                }}
                ref={drag}
                role="Handle"
              >
                <h3>{objective.name}</h3>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
