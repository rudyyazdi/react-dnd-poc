import React, { useState } from "react";
import "./App.css";
import { useDrag, useDrop } from "react-dnd";
interface iObjective {
  id: number;
  name: string;
  type: "Objective";
}
interface iFocusArea {
  id: number;
  name: string;
  type: "FocusArea";
  objectives: iObjective[];
}

const DRAGGABLE_TYPE = "BOX";

const DEFAULT_DATA: { focusAreas: iFocusArea[] } = {
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

const Objective = function Objective({ name }: { name: string }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: "BOX",
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => {
      console.log({ monitor });
      return { isDragging: monitor.isDragging() };
    },
  }));

  return (
    <div
      ref={drag}
      style={{
        border: "1px solid green",
        margin: "10px",
        padding: "10px",
      }}
    >
      {name}
    </div>
  );
};

const FocusArea = function FocusArea({
  name,
  objectives,
}: {
  name: string;
  objectives: iObjective[];
}) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: DRAGGABLE_TYPE,
    // Props to collect
    end: (item: any , monitor: any) => {
      console.log({ item, monitor });
    },
    collect: (monitor) => {
      console.log({ monitor });
      return { isOver: monitor.isOver(), canDrop: monitor.canDrop() };
    },
  }));

  return (
    <div
      ref={drop}
      style={{
        border: "1px solid red",
        margin: "10px",
        padding: "10px",
      }}
    >
      {name}
      {objectives.map((objective) => (
        <Objective name={objective.name} key={objective.id} />
      ))}
    </div>
  );
};

function App() {
  const [focusAreas, setFocusAreas] = useState<iFocusArea[]>(
    DEFAULT_DATA.focusAreas
  );

  return (
    <div className="App">
      {/* for each focus area create a div with the name on the top and red border and then render
      each objective with title underneath. Draw green border around each objective div. Both divs
      have 10px margin and padding.

      The objective divs should be draggable in a way that the user can change the order of the
      objectives within the focus area. The focus area divs should be droppable.
      */}
      {focusAreas.map((focusArea) => (
        <FocusArea
          name={focusArea.name}
          objectives={focusArea.objectives}
          key={focusArea.id}
        />
      ))}
    </div>
  );
}

export default App;
