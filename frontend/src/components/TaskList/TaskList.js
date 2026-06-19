import React, { useRef, useEffect } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import '../../styles/TaskList.css';

const SCROLL_SPEED = 60;

function TaskList({tasks, onEdit, onDelete, onToggle}) {
    const trackRef= useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if(!track || tasks.length === 0) return;

    //calculate duration so speed stays constant regardless of number of tasks
    requestAnimationFrame(() => {
        const duration = (track.scrollWidth/2) / SCROLL_SPEED
        track.style.animationDuration = `${duration}s`;
    });
    }, [tasks]);

    if(tasks.length === 0) {
        return(
            <div className="carousel-empty">
                <p>No tasks found. Add a task to get started!</p>
            </div>
        );
    }
    
    // Repeat tasks enough times to fill the screen (always even number for seamless loop)
    const CARD_WIDTH = 340;
    const minCopies = Math.ceil((window.innerWidth * 3) / (tasks.length * CARD_WIDTH));
    const copies = minCopies % 2 === 0 ? minCopies : minCopies + 1;
    const duplicatedTasks = Array.from({ length: copies }, () => tasks).flat();

    return (
        <div className="carousel-container">
            <div className="carousel-track" ref={trackRef}>
                {duplicatedTasks.map((task, index) => (
                    <div className="carousel-item" key={`${task.id}-${index}`}>
                        <TaskItem
                            task={task}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onToggle={onToggle}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default TaskList;