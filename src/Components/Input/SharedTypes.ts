import { SystemStyleObject } from '@chakra-ui/react';

type InputProps = {
    /**
     * The label text for the input.
     */
    label?: string;
    /**
     * The text displayed when the input value is invalid. When given, will provide visual indicatation that the input value is invalid.
     */
    invalidText?: string;
    /**
     * If true, will provide visual indicatation that the input value is invalid.
     */
    isInvalid?: boolean;
    /**
     * Additional caption text displayed below the input.
     */
    captionText?: string;
    zIndex?: number;
    /**
     * Custom styles for the input element.
     */
    inputStyles?: SystemStyleObject;

    /**
     * Custom styles for the container wrapping the input element.
     */
    inputContainerStyles?: SystemStyleObject;

    /**
     * Custom styles for the label element.
     */
    labelStyles?: SystemStyleObject;

    /**
     * Custom styles for the caption text element.
     */
    captionStyles?: SystemStyleObject;

    /**
     * Custom styles for the error text element.
     */
    errorStyles?: SystemStyleObject;

    /**
     * Custom styles to apply to the entire input component.
     */
    styles?: SystemStyleObject;

    /**
     * Aria label for screen readers
     */
    ariaLabel?: string;
};

interface InputComponentProps extends InputProps {
    /**
     * If true, disables the input.
     */
    isDisabled?: boolean;

    /**
     * If true, the input will automatically focus when it mounts.
     */
    autoFocus?: boolean;
}

interface TextInputProps extends InputComponentProps {
    /**
     * The placeholder text displayed in the input when it is empty.
     */
    placeholder?: string;

    /**
     * The current value of the input.
     */
    value: string;

    /**
     * Callback function called when the input value changes.
     * @param value - The new value of the input.
     */
    onChange: (value: string) => void;

    /**
     * The maximum number of characters allowed in the input.
     */
    characterLimit?: number;
}

/**
 * Option for components with multiple possible choices.
 */
type MultiChoiceOption<T extends string | number> = {
    /**
     * The label of the option
     */
    label: string;
    /**
     * The value of the option
     */
    value: T;
    /**
     * Whether the option is disabled.
     */
    isDisabled?: boolean;
};

export type {
    InputProps,
    InputComponentProps,
    TextInputProps,
    MultiChoiceOption,
};
