import React, { useState, useEffect, useRef, useCallback } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import '../../styles/TaskList.css';

const CARD_SLOT = 410;
const SLIDE_MS = 500;
const HOLD_MS = 2250;

function TaskList({ tasks, onEdit, onDelete, onToggle }) {
    const [startIndex, setStartIndex] = useState(0);
    const trackRef = useRef(null);
    const busyRef = useRef(false);
    const pausedRef = useRef(false);
    const lenRef = useRef(tasks.length);

    useEffect(() => { lenRef.current = tasks.length; }, [tasks.length]);

    const advance = useCallback(() => {
        if (busyRef.current || pausedRef.current || !trackRef.current || lenRef.current < 2) return;
        busyRef.current = true;

        const track = trackRef.current;
        track.style.transition = `transform ${SLIDE_MS}ms ease-in-out`;
        track.style.transform = `translateX(-${CARD_SLOT}px)`;

        setTimeout(() => {
            track.style.transition = 'none';
            track.style.transform = 'translateX(0)';
            setStartIndex(prev => (prev + 1) % lenRef.current);
            requestAnimationFrame(() => { busyRef.current = false; });
        }, SLIDE_MS);
    }, []);

    useEffect(() => {
        const id = setInterval(advance, HOLD_MS + SLIDE_MS);
        return () => clearInterval(id);
    }, [advance]);

    if (tasks.length === 0) {
        return (
            <div className="carousel-empty">
                <p>No tasks found. Add a task to get started!</p>
            </div>
        );
    }

    const n = tasks.length;
    const safeStart = startIndex % n;

    if (n === 1) {
        return (
            <div className="carousel-container">
                <TaskItem task={tasks[0]} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
            </div>
        );
    }

    if (n === 2) {
        return (
            <div className="carousel-container">
                <div className="carousel-track" style={{ transform: 'none' }}>
                    {tasks.map(task => (
                        <div className="carousel-item" key={task.id}>
                            <TaskItem task={task} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const cards = [0, 1, 2, 3].map(i => tasks[(safeStart + i) % n]);

    return (
        <div
            className="carousel-container"
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
        >
            <div className="carousel-viewport">
                <div className="carousel-track" ref={trackRef}>
                    {cards.map((task, i) => (
                        <div className="carousel-item" key={`${task.id}-${i}`}>
                            <TaskItem task={task} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TaskList;
