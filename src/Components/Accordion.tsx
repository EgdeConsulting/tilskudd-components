import React, { ReactElement, useMemo, useState } from 'react';
import {
    Accordion as ChakraAccordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
    Heading,
    SystemStyleObject,
    ExpandedIndex,
} from '@chakra-ui/react';
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';

type AccordionProps = {
    /**
     * If true, multiple accordion items can be expanded at the same time.
     */
    allowMultiple?: boolean;

    /**
     * If true, all accordion items are expanded by default.
     */
    isAllDefaultOpen?: boolean;

    /**
     * An array of accordion items, each containing a title and content.
     */
    items: AccordionItem[];

    /**
     * The index of the accordion item that is expanded by default.
     */
    defaultIndex?: number;

    /**
     * Callback function called when an accordion item is expanded or collapsed.
     * The index of the expanded/collapsed item is passed as an argument.
     */
    onChange?: (value: number | number[]) => void;

    /**
     * Controls the expanded index of the accordion. This makes the component controlled.
     */
    index?: number;

    /**
     * Custom styles for the accordion component.
     */
    styles?: SystemStyleObject;

    /**
     * Custom styles for the accordion panel.
     */
    panelStyles?: SystemStyleObject;

    /**
     * Custom styles for the accordion button.
     */
    buttonStyles?: SystemStyleObject;

    /**
     * Custom styles for the accordion title.
     */
    titleStyles?: SystemStyleObject;
};

type AccordionItem = {
    /**
     * The title of the accordion item. Can be a string, JSX element, or an array of JSX elements.
     */
    title: string | JSX.Element[] | JSX.Element;

    /**
     * The content of the accordion item. Can be a single JSX element or an array of JSX elements.
     */
    content: JSX.Element[] | JSX.Element;
};

export function Accordion(props: AccordionProps): ReactElement {
    const {
        items,
        isAllDefaultOpen,
        allowMultiple = isAllDefaultOpen || false,
        defaultIndex,
        onChange,
        index: controlledIndex,
        buttonStyles,
        panelStyles,
        styles,
        titleStyles,
    } = props;

    // Handle uncontrolled default indices
    const uncontrolledDefaultIndex = useMemo(() => {
        if (isAllDefaultOpen) {
            return items.map((_, idx) => idx); // All items open
        } else if (allowMultiple && defaultIndex !== undefined) {
            return Array.isArray(defaultIndex) ? defaultIndex : [defaultIndex];
        } else {
            return defaultIndex !== undefined ? [defaultIndex] : []; // Single or no item open by default
        }
    }, [isAllDefaultOpen, allowMultiple, defaultIndex, items.length]);

    // State for uncontrolled scenario
    const [uncontrolledIndex, setUncontrolledIndex] = useState<
        number | number[]
    >(uncontrolledDefaultIndex);

    // Determine if component is controlled
    const isControlled = controlledIndex !== undefined;
    const index = isControlled ? controlledIndex : uncontrolledIndex;

    // Handle change for both controlled and uncontrolled scenarios
    const handleChange = (newIndex: number | number[]) => {
        if (!isControlled) {
            if (allowMultiple) {
                // Expecting newIndex to be an array when allowMultiple is true
                const currentIndexArray = Array.isArray(uncontrolledIndex)
                    ? uncontrolledIndex
                    : [uncontrolledIndex];
                let updatedIndices: number[];

                if (Array.isArray(newIndex)) {
                    // Directly use the newIndex array from the event
                    updatedIndices = newIndex;
                } else {
                    // If newIndex is not an array, this means a single index is toggled
                    const position = currentIndexArray.indexOf(newIndex);
                    if (position === -1) {
                        updatedIndices = [...currentIndexArray, newIndex];
                    } else {
                        updatedIndices = currentIndexArray.filter(
                            (index) => index !== newIndex
                        );
                    }
                }
                setUncontrolledIndex(updatedIndices);
            } else {
                // For single accordion behavior, ensure we are setting a single number
                if (typeof newIndex === 'number') {
                    setUncontrolledIndex(newIndex);
                } else {
                    // This scenario shouldn't occur
                    console.error(
                        'Unexpected type for newIndex with allowMultiple=false'
                    );
                }
            }
        }
        // Call external onChange if provided, passing along the newIndex
        if (onChange) {
            onChange(newIndex);
        }
    };

    return (
        <ChakraAccordion
            allowMultiple={allowMultiple}
            index={isControlled ? index : undefined}
            defaultIndex={isControlled ? undefined : uncontrolledDefaultIndex}
            allowToggle
            onChange={(e) => handleChange(e)}
            sx={styles}
        >
            {items.map((accordionItem, idx) => (
                <AccordionItem key={`aci${idx}`}>
                    {({ isExpanded }) => (
                        <>
                            <AccordionButton
                                sx={buttonStyles}
                                onClick={() => handleChange(idx)}
                            >
                                <Box flex='1' textAlign='left'>
                                    {typeof accordionItem.title === 'string' ? (
                                        <Heading
                                            size='md'
                                            color='blue'
                                            sx={titleStyles}
                                        >
                                            {accordionItem.title}
                                        </Heading>
                                    ) : (
                                        accordionItem.title
                                    )}
                                </Box>
                                {isExpanded ? (
                                    <ArrowUpIcon fontSize='24px' color='blue' />
                                ) : (
                                    <ArrowDownIcon
                                        fontSize='24px'
                                        color='blue'
                                    />
                                )}
                            </AccordionButton>
                            <AccordionPanel sx={panelStyles}>
                                {accordionItem.content}
                            </AccordionPanel>
                        </>
                    )}
                </AccordionItem>
            ))}
        </ChakraAccordion>
    );
}
