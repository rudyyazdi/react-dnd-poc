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
  const DRAGGABLE_TYPE = "BOX";

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: DRAGGABLE_TYPE,
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: DRAGGABLE_TYPE,
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  console.log({ isDragging });

  return (
    <div className="App">
      {/* for each focus area create a div with the name on the top and red border and then render
      each objective with title underneath. Draw green border around each objective div. Both divs
      have 10px margin and padding.

      The objective divs should be draggable in a way that the user can change the order of the
      objectives within the focus area. The focus area divs should be droppable.
      */}

      <div
        style={{
          border: "1px solid blue",
          margin: "10px",
          padding: "10px",
        }}
        ref={drag}
        >
        <h3>Draggable Area</h3>
      </div>

      {focusAreas.map((focusArea) => (
        <div
          ref={drop}
          style={{
            border: "1px solid red",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{focusArea.name}</h3>
          {focusArea.objectives.map((objective) => (
            <div
              style={{
                border: "1px solid green",
                margin: "10px",
                padding: "10px",
              }}
            >
              <h4>{objective.name}</h4>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
