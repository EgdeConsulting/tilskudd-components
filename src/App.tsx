import { Box, Center, ChakraProvider, Heading, Text } from '@chakra-ui/react';
import {
    Alert,
    Accordion,
    TextInput,
    TextAreaInput,
    NumberInput,
    Tabs,
    Radio,
    Card,
    Checkbox,
    CheckboxToggle,
    Spinner,
    OverlaySpinner,
} from 'Components';
import { styles } from 'Theme';
import { useState } from 'react';

function Divider(props: { title: string }) {
    return (
        <div
            style={{
                backgroundColor: 'pink',
                width: '100%',
                marginTop: '2.5rem',
                marginBottom: '2.5rem',
            }}
        >
            <h2>{props.title}</h2>
        </div>
    );
}

function App() {
    const accordionItems = [
        {
            title: 'Accordion One',
            content: (
                <Box>
                    <Heading>Accordion One Content</Heading>
                    <Center>
                        <Text>Here is some centered text</Text>
                        <Box width='500px' height='500px'>
                            <Heading>Heading in a large box</Heading>
                            <Text>Some more text</Text>
                        </Box>
                    </Center>
                </Box>
            ),
        },
        { title: 'Accordion Two', content: <div>Accordion Two Content</div> },
    ];

    const [textValue, setTextValue] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');
    const [numberValue, setNumberValue] = useState();

    const [radioOption, setRadioOption] = useState<string>();

    const [isOverlaySpinnerActive, setIsOverlaySpinnerActive] = useState(false);

    const radioOptions = [
        { value: 'first', label: 'Radio Option One' },
        { value: 'second', label: 'Radio Option Two' },
        { value: 'disabled', label: 'Disabled Radio Option', isDisabled: true },
    ];

    const [checkboxOption, setCheckboxOption] = useState<string[]>([]);

    const checkboxOptions = [
        { value: 'first', label: 'Checkbox Option One' },
        { value: 'second', label: 'Checkbox Option Two' },
        {
            value: 'disabled',
            label: 'Disabled Checkbox Option',
            isDisabled: true,
        },
    ];

    const [isToggled, setIsToggled] = useState(false);

    const inputFieldStyles = { width: '25rem' };

    function radioValueLabelDisplayer(option: string | undefined) {
        if (option === undefined) return 'undefined';
        const knownValue = radioOptions.find((o) => o.value === option);
        return knownValue ? knownValue.label : 'undefined';
    }

    const tabItems = [
        {
            title: 'Text Inputs',
            children: (
                <div style={{ width: '80vw' }}>
                    <Divider title='TextInput' />
                    <TextInput
                        value={textValue}
                        onChange={setTextValue}
                        label='TextInput'
                        styles={inputFieldStyles}
                    />
                    <div>Value: {typeof textValue}</div>
                    <div>{textValue}</div>
                    <Divider title='TextArea' />
                    <TextAreaInput
                        value={textAreaValue}
                        onChange={setTextAreaValue}
                        label='TextAreaInput'
                        styles={inputFieldStyles}
                    />
                    <div>Value: {typeof textAreaValue}</div>
                    <div>{textAreaValue}</div>
                    <Divider title='NumberInput' />
                    <NumberInput
                        value={numberValue}
                        onChange={setNumberValue}
                        label='NumberInput'
                        styles={inputFieldStyles}
                    />
                    <div>Value: {typeof numberValue}</div>
                    <div>{numberValue}</div>
                    <Divider title='NumberInput (Currency)' />
                    <NumberInput
                        value={numberValue}
                        onChange={setNumberValue}
                        label='NumberInput (Currency)'
                        styles={inputFieldStyles}
                        isCurrency
                    />
                    <div>Value: {typeof numberValue}</div>
                    <div>{numberValue}</div>
                </div>
            ),
        },
        {
            title: 'Non-input',
            children: (
                <div style={{ width: '80vw' }}>
                    <Divider title='Alert' />
                    <Alert
                        status='error'
                        link={{
                            text: 'link text goes here',
                            href: 'https//google.com',
                        }}
                        onClose={() => console.log('I am closing now')}
                    >
                        Zoopi doopy
                    </Alert>
                    <Alert status='warning'>
                        <Heading size='md' mb='16px'>
                            Søker er bedt om å betale tilbake
                        </Heading>
                        <Heading size='sm' mb='8px'>
                            Beskjed til søker
                        </Heading>
                        <Text mb='12px'>Bla bla bla blabbedi blablabla</Text>

                        <>
                            <Heading size='sm' mb='8px'>
                                Intern kommentar
                            </Heading>
                            <Text mb='12px'>
                                requestRefundInternalComment bnlabeeb
                                alikbjnaert io arev aeiorn
                            </Text>
                        </>
                    </Alert>
                    <Divider title='Accordion' />
                    <Accordion items={accordionItems} allowMultiple />

                    <Divider title='Card' />
                    <Card title='Card title' />
                    <Divider title='Spinner' />
                    <Spinner header='Spinner' text='I sure am spinning' />
                    <Divider title='OverlaySpinner' />
                    <button onClick={() => setIsOverlaySpinnerActive(true)}>
                        Active Overlay
                    </button>
                    <OverlaySpinner
                        isActive={isOverlaySpinnerActive}
                        text='Laster ned alle søknader (Excel)'
                    />
                </div>
            ),
        },
        {
            title: 'Multi inputs',
            children: (
                <div style={{ width: '80vw' }}>
                    <Divider title='Radio' />
                    <Radio
                        options={radioOptions}
                        value={radioOption}
                        onChange={setRadioOption}
                    />
                    <div>Radio value: {radioOption}</div>
                    <div>
                        Label of radio value:{' '}
                        {radioValueLabelDisplayer(radioOption)}
                    </div>
                    <Divider title='Checkbox' />
                    <Checkbox
                        label='I am a checkbnox'
                        options={checkboxOptions}
                        value={checkboxOption}
                        onChange={setCheckboxOption}
                        invalidText={
                            checkboxOption.length === 0
                                ? 'asdaASDASDSAasdhsrg'
                                : undefined
                        }
                    />
                    <div>Checkbox value: {checkboxOption}</div>
                    <div>
                        Label of Checkbox value(s):{' '}
                        {checkboxOption.map((co) => {
                            let found = checkboxOptions.find(
                                (cbo) => cbo.value === co
                            );
                            if (found) {
                                return found.label;
                            }
                        })}
                    </div>
                    <Divider title='CheckboxToggle' />
                    <CheckboxToggle
                        valueLabel='This is the thing I am accepting'
                        value={isToggled}
                        onChange={setIsToggled}
                        invalidText={isToggled ? undefined : 'invalid text'}
                    />
                    <div>Value of CheckboxToggle:</div>
                    <div>{isToggled.toString()}</div>
                </div>
            ),
        },
    ];

    return (
        <ChakraProvider theme={styles}>
            <div style={{ marginLeft: '2rem', width: '100vw' }}>
                <Tabs tabs={tabItems} />
                <br />
                <br />
                <br />
                <br />
            </div>
        </ChakraProvider>
    );
}

export default App;
