import React, { ReactElement } from 'react';
import { Checkbox as ChakraCheckbox, CheckboxGroup } from '@chakra-ui/react';
import { BaseInput } from './BaseInput';
import { InputComponentProps } from './SharedTypes';

/**
 * Properties for the CheckboxToggle component.
 */
interface CheckboxToggleProps extends InputComponentProps {
    /**
     * The current state of the toggle (true for checked, false for unchecked).
     */
    value: boolean;

    /**
     * Callback function called when the toggle state changes.
     * @param value - The new state of the toggle (true or false).
     */
    onChange: (value: boolean) => void;

    /**
     * Optional label displayed next to the checkbox. Provides context for what the toggle controls.
     */
    valueLabel?: string;
}

/**
 * A component that renders a single toggleable checkbox, typically used for enabling or disabling a feature.
 */
export function CheckboxToggle(props: CheckboxToggleProps): ReactElement {
    const { value, onChange, valueLabel, invalidText, isDisabled, autoFocus } =
        props;

    return (
        <BaseInput {...props} isGroup>
            <CheckboxGroup>
                <ChakraCheckbox
                    isChecked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    isInvalid={!!invalidText}
                    isDisabled={isDisabled}
                    autoFocus={autoFocus}
                >
                    {valueLabel}
                </ChakraCheckbox>
            </CheckboxGroup>
        </BaseInput>
    );
}
