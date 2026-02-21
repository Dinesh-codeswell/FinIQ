import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import { useTour } from '@/context/TourContext';

interface TourAnchorProps {
    id: string;
    children: React.ReactNode;
}

export const TourAnchor: React.FC<TourAnchorProps> = ({ id, children }) => {
    const { registerElement, isTourVisible } = useTour();
    const viewRef = useRef<View>(null);

    const measureAndRegister = () => {
        if (!viewRef.current) return;

        viewRef.current.measureInWindow((x, y, width, height) => {
            registerElement(id, {
                pageX: x,
                pageY: y,
                width,
                height,
                x,
                y,
            });
        });
    };

    // Re-measure when tour becomes visible to ensure fresh coordinates (scroll position might have changed)
    useEffect(() => {
        if (isTourVisible) {
            measureAndRegister();
        }
    }, [isTourVisible]);

    return (
        <View
            ref={viewRef}
            onLayout={measureAndRegister}
            collapsable={false}
        >
            {children}
        </View>
    );
};
