import { useState, useEffect, useRef, useCallback } from 'react';

interface UseResizablePanelsOptions {
  leftMinWidth?: number;
  centerMinWidth?: number;
  rightMinWidth?: number;
  initialLeftWidth?: number;
  initialCenterWidth?: number;
  initialRightWidth?: number;
}

export function useResizablePanels({
  leftMinWidth = 200,
  centerMinWidth = 300,
  rightMinWidth = 200,
  initialLeftWidth = 25,
  initialCenterWidth = 50,
  initialRightWidth = 25,
}: UseResizablePanelsOptions = {}) {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const [centerWidth, setCenterWidth] = useState(initialCenterWidth);
  const [rightWidth, setRightWidth] = useState(initialRightWidth);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef<'left' | 'right' | null>(null);
  const startXRef = useRef(0);
  const startLeftWidthRef = useRef(0);
  const startCenterWidthRef = useRef(0);
  const startRightWidthRef = useRef(0);

  // Load saved widths from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('panel-widths');
    if (saved) {
      try {
        const { left, center, right } = JSON.parse(saved);
        setLeftWidth(left);
        setCenterWidth(center);
        setRightWidth(right);
      } catch (e) {
        // Use defaults if parsing fails
      }
    }
  }, []);

  // Save widths to localStorage
  useEffect(() => {
    localStorage.setItem('panel-widths', JSON.stringify({
      left: leftWidth,
      center: centerWidth,
      right: rightWidth,
    }));
  }, [leftWidth, centerWidth, rightWidth]);

  const handleMouseDown = useCallback((side: 'left' | 'right', e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = side;
    startXRef.current = e.clientX;
    startLeftWidthRef.current = leftWidth;
    startCenterWidthRef.current = centerWidth;
    startRightWidthRef.current = rightWidth;
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [leftWidth, centerWidth, rightWidth]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizingRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const deltaX = e.clientX - startXRef.current;
    const deltaPercent = (deltaX / containerWidth) * 100;

    if (isResizingRef.current === 'left') {
      // Resizing left panel (affects left and center, right stays fixed)
      const newLeftWidth = Math.max(
        leftMinWidth / containerWidth * 100,
        Math.min(
          100 - centerMinWidth / containerWidth * 100 - startRightWidthRef.current,
          startLeftWidthRef.current + deltaPercent
        )
      );
      const newCenterWidth = 100 - newLeftWidth - startRightWidthRef.current;
      
      if (newCenterWidth >= centerMinWidth / containerWidth * 100) {
        setLeftWidth(newLeftWidth);
        setCenterWidth(newCenterWidth);
      }
    } else if (isResizingRef.current === 'right') {
      // Resizing right panel (affects center and right, left stays fixed)
      const newRightWidth = Math.max(
        rightMinWidth / containerWidth * 100,
        Math.min(
          100 - centerMinWidth / containerWidth * 100 - startLeftWidthRef.current,
          startRightWidthRef.current - deltaPercent
        )
      );
      const newCenterWidth = 100 - startLeftWidthRef.current - newRightWidth;
      
      if (newCenterWidth >= centerMinWidth / containerWidth * 100) {
        setRightWidth(newRightWidth);
        setCenterWidth(newCenterWidth);
      }
    }
  }, [leftMinWidth, centerMinWidth, rightMinWidth]);

  const handleMouseUp = useCallback(() => {
    isResizingRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, [handleMouseMove]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [handleMouseMove, handleMouseUp]);

  return {
    leftWidth,
    centerWidth,
    rightWidth,
    containerRef,
    handleMouseDown,
  };
}

