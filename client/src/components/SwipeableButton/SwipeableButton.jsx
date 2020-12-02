import './css/SwipeableButton.css';

import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';

const isTouchDevice = 'ontouchstart' in document.documentElement;

const SwipeableButton = forwardRef(
  ({ onSuccess, placeholder, text }, lobbyRef) => {
    const [unlocked, setUnlocked] = useState(false);
    const [unlockedText, setUnlockedText] = useState('');
    const slider = useRef();
    const container = useRef();
    const startX = useRef(0);
    const sliderLeft = useRef(0);
    const containerWidth = useRef(0);
    const isDragging = useRef(false);

    useEffect(() => {
      if (isTouchDevice) {
        document.addEventListener('touchmove', onDrag);
        document.addEventListener('touchend', stopDrag);
      } else {
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', stopDrag);
      }
      containerWidth.current = container.current.clientWidth - 50;
      return () => {
        if (isTouchDevice) {
          document.removeEventListener('touchmove', onDrag);
          document.removeEventListener('touchend', stopDrag);
        } else {
          document.removeEventListener('mousemove', onDrag);
          document.removeEventListener('mouseup', stopDrag);
        }
      };
    }, []);

    const reset = () => {
      setUnlocked(false);
      setUnlockedText('');
      sliderLeft.current = 0;
      updateSliderStyle();
    };

    const onDrag = (e) => {
      if (isDragging.current) {
        if (isTouchDevice) {
          sliderLeft.current = Math.min(
            Math.max(0, e.touches[0].clientX - startX.current),
            containerWidth.current
          );
        } else {
          sliderLeft.current = Math.min(
            Math.max(0, e.clientX - startX.current),
            containerWidth.current
          );
        }
      }
      updateSliderStyle();
    };

    const stopDrag = () => {
      if (isDragging.current) {
        isDragging.current = false;
        if (sliderLeft.current > containerWidth.current * 0.9) {
          sliderLeft.current = containerWidth.current;
          updateSliderStyle();
          onSuccess();
          onSliderSuccess();
        } else {
          sliderLeft.current = 0;
          updateSliderStyle();
        }
      }
    };

    const updateSliderStyle = () => {
      slider.current.style.left = sliderLeft.current + 50 + 'px';
    };

    const startDrag = (e) => {
      isDragging.current = true;
      if (isTouchDevice) {
        startX.current = e.touches[0].clientX;
      } else {
        startX.current = e.clientX;
      }
    };

    const onSliderSuccess = () => {
      // container.current.style.width = container.current.clientWidth + 'px';
      setUnlocked(true);
      setTimeout(() => {
        setUnlockedText(text);
      }, 600);
    };

    useImperativeHandle(lobbyRef, () => {
      return {
        reset: reset,
      };
    });

    return (
      <div className="ReactSwipeButton">
        <div
          className={'rsbContainer ' + (unlocked ? 'rsbContainerUnlocked' : '')}
          ref={container}
        >
          <div
            className="rsbcSlider"
            ref={slider}
            style={{ background: 'green' }}
            onMouseDown={(e) => startDrag(e)}
            onTouchStart={(e) => startDrag(e)}
          >
            <span className="rsbcSliderText">{unlockedText}</span>
            <span className="rsbcSliderArrow"></span>
            <span
              className="rsbcSliderCircle"
              style={{ background: 'green' }}
            ></span>
          </div>
          <div className="rsbcText">{placeholder}</div>
        </div>
      </div>
    );
  }
);

export default SwipeableButton;
