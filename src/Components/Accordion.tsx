import React, { ReactElement, useMemo } from 'react';
import {
    Accordion as ChakraAccordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
    Heading,
    SystemStyleObject,
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
    onChange?: (value: number) => void;

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

/* 
    EXAMPLE USE: 
    function AccordionExample(): ReactElement {
        const accordionItems = [
            {
                title: 'First accordion',
                content: <div>This is the first accordions content</div>,
            },
            {
                title: 'Second accordion',
                content: <div>This is the second accordions content</div>,
            },
            {
                title: 'Third accordion',
                content: <div>This is the third accordions content</div>,
            },
        ];
        return (
            <div>
                <Accordion items={accordionItems} allowMultiple />
            </div>
        );
    }
*/

export function Accordion(props: AccordionProps): ReactElement {
    const {
        items,
        allowMultiple,
        isAllDefaultOpen,
        defaultIndex,
        onChange,
        index,
        buttonStyles,
        panelStyles,
        styles,
        titleStyles,
    } = props;

    return (
        <ChakraAccordion
            allowMultiple={allowMultiple || isAllDefaultOpen}
            defaultIndex={defaultIndex !== undefined ? defaultIndex : 0}
            allowToggle
            onChange={
                onChange
                    ? (e: number) => {
                          onChange(e);
                      }
                    : undefined
            }
            index={index !== undefined ? index : undefined}
            sx={styles}
        >
            {items.map((accordionItem, index) => {
                return (
                    <AccordionItem key={`aci${index}`}>
                        {({ isExpanded }) => (
                            <>
                                <AccordionButton sx={buttonStyles}>
                                    <Box flex='1' textAlign='left'>
                                        {typeof accordionItem.title ===
                                        'string' ? (
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
                                        <ArrowUpIcon
                                            fontSize='24px'
                                            color='blue'
                                        />
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
                );
            })}
        </ChakraAccordion>
    );
}
