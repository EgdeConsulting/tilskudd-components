import React, { ReactElement, useMemo } from 'react';
import {
    FormLabel,
    HStack,
    Radio as ChakraRadio,
    RadioGroup,
    Stack,
} from '@chakra-ui/react';
import { InputComponentProps, MultiChoiceOption } from './SharedTypes';
import { BaseInput } from './BaseInput';

/**
 * Properties for the Radio component.
 */
interface RadioProps<T extends string | number> extends InputComponentProps {
    /**
     * Determines the direction in which the radio options are laid out.
     * - 'row': aligns options horizontally.
     * - 'column': aligns options vertically (default).
     */
    direction?: 'row' | 'column';

    /**
     * An array of options for the radio buttons, where each option has a label and a value.
     */
    options: MultiChoiceOption<T>[];

    /**
     * The currently selected value from the options. Can be a string, number, or undefined.
     */
    value: T | undefined;

    /**
     * Callback function called when the selected value changes.
     * When using this with a useState hook, the state setter must be explicitly typed.
     * @example
     * const [selectedOption, setSelectedOption] = useState<string>();
     * @example
     * const [selectedOption, setSelectedOption] = useState<number>();
     * @param value - The new value of the radio button group.
     */
    onChange: (value: T) => void;
}

export function Radio<T extends string | number>(
    props: RadioProps<T>
): ReactElement {
    const {
        label,
        direction = 'column',
        options,
        value,
        onChange,
        invalidText,
        isDisabled,
        isInvalid,
        ariaLabel,
    } = props;

    // Convert option values to strings for internal use
    const stringOptions = useMemo(
        () =>
            options.map((option) => ({
                ...option,
                value: option.value.toString(),
            })),
        [options]
    );

    // Convert the selected value back to its original type (string or number)
    const handleChange = (stringValue: string) => {
        const originalValue = options.find(
            (option) => option.value.toString() === stringValue
        )?.value;
        if (originalValue !== undefined) {
            onChange(originalValue as T);
        }
    };

    return (
        <BaseInput {...props} isGroup>
            <RadioGroup
                aria-label={ariaLabel}
                isDisabled={isDisabled}
                onChange={(e) => handleChange(e)}
                value={value?.toString() ?? ''}
            >
                <Stack direction={direction}>
                    {stringOptions.map((option) => (
                        <ChakraRadio
                            isInvalid={!!invalidText || isInvalid}
                            value={option.value}
                            id={`${label}-radio-${option.value}`}
                            key={`${label}-radio-${option.value}`}
                            isDisabled={option.isDisabled}
                        >
                            {option.label}
                        </ChakraRadio>
                    ))}
                </Stack>
            </RadioGroup>
        </BaseInput>
    );
}
