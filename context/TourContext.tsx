import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { ScrollView, LayoutRectangle } from 'react-native';

export interface ElementLayout extends LayoutRectangle {
    pageY: number;
    pageX: number;
}

interface TourContextType {
    activeStep: number;
    isTourVisible: boolean;
    elements: Record<string, ElementLayout>;
    registerElement: (id: string, layout: ElementLayout) => void;
    setCurrentStep: (index: number) => void;
    setTourVisible: (visible: boolean) => void;
    scrollViewRef: React.RefObject<ScrollView | null>;
    scrollToElement: (id: string) => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [isTourVisible, setIsTourVisible] = useState(false);
    const [elements, setElements] = useState<Record<string, ElementLayout>>({});
    const scrollViewRef = useRef<ScrollView>(null);

    const registerElement = useCallback((id: string, layout: ElementLayout) => {
        setElements(prev => ({ ...prev, [id]: layout }));
    }, []);

    const scrollToElement = useCallback((id: string) => {
        const element = elements[id];
        if (element && scrollViewRef.current) {
            // Center the element in the view
            const scrollY = Math.max(0, element.pageY - 200);
            scrollViewRef.current.scrollTo({ y: scrollY, animated: true });
        }
    }, [elements]);

    return (
        <TourContext.Provider
            value={{
                activeStep,
                isTourVisible,
                elements,
                registerElement,
                setCurrentStep: setActiveStep,
                setTourVisible: setIsTourVisible,
                scrollViewRef,
                scrollToElement,
            }}
        >
            {children}
        </TourContext.Provider>
    );
};

export const useTour = () => {
    const context = useContext(TourContext);
    if (!context) {
        throw new Error('useTour must be used within a TourProvider');
    }
    return context;
};
