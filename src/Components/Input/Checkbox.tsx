import React, { ReactElement } from 'react';
import {
    Checkbox as ChakraCheckbox,
    CheckboxGroup,
    FormLabel,
    Stack,
} from '@chakra-ui/react';
import { InputComponentProps, MultiChoiceOption } from './SharedTypes';
import { BaseInput } from './BaseInput';

/**
 * Properties for the Checkbox component.
 */
interface CheckboxProps<T extends string | number> extends InputComponentProps {
    /**
     * Determines the direction in which the checkbox options are laid out.
     * - 'row': aligns options horizontally.
     * - 'column': aligns options vertically (default).
     */
    direction?: 'row' | 'column';

    /**
     * An array of options for the checkboxes, where each option has a label and a value.
     */
    options: MultiChoiceOption<T>[];

    /**
     * The currently selected values from the options. Can be an array of strings, numbers, or undefined.
     */
    value: T[];

    /**
     * Callback function called when the selected values change.
     * When using this with a useState hook, the state setter must be explicitly typed.
     * @example
     * const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
     * @example
     * const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
     * @param value - The new array of values of the selected checkboxes.
     */
    onChange: (value: T[]) => void;
}

export function Checkbox<T extends string | number>(
    props: CheckboxProps<T>
): ReactElement {
    const {
        direction = 'column',
        options,
        value,
        onChange,
        invalidText,
        isDisabled,
        autoFocus,
        isInvalid,
    } = props;

    function handleOnChange(optionValue: T): void {
        let newValue: T[] = value.includes(optionValue)
            ? value.filter((e) => e !== optionValue)
            : [...value, optionValue];
        onChange(newValue);
    }

    return (
        <BaseInput {...props} isGroup>
            <CheckboxGroup>
                <Stack direction={direction}>
                    {options.map((option) => (
                        <ChakraCheckbox
                            isInvalid={!!invalidText || isInvalid}
                            isDisabled={isDisabled || option.isDisabled}
                            id={`${option.label}-check-${option.value}`}
                            key={`${option.label}-check-${option.value}`}
                            onChange={() => handleOnChange(option.value)}
                            isChecked={value.includes(option.value)}
                            autoFocus={autoFocus}
                        >
                            {option.label}
                        </ChakraCheckbox>
                    ))}
                </Stack>
            </CheckboxGroup>
        </BaseInput>
    );
}
