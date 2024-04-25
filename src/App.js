import React from 'react';
import styled from "styled-components";
import {createGlobalStyle} from "styled-components"
import {ReactComponent as Avatar} from './avatar.svg'

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        font-family: "Fira Mono", monospace;
        font-size: calc(12px + 0.25vw);
        font-weight: 500;
    }
`;

const AppContainer = styled.article`
    background: rgb(40, 44, 52);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`;

const TerminalFigure = styled.figure`
    background: #1a202c;
    border-top: 30px solid #4a5568;
    border-radius: .25rem;
    box-shadow: 1px 1px 11px rgba(0, 0, 0, 0.22);
    min-height: 425px;
    max-width: 600px;
    min-width: 350px;
    padding: 0.5rem;
    position: relative;
    width: 100%;

    &::before {
        background: #ff5f57;
        border-radius: 50%;
        content: "";
        display: block;
        height: 12px;
        position: absolute;
        top: -20px;
        left: 12px;
        width: 12px;
    }

    &::after {
        content: "me@kakkk:~";
        display: block;
        color: #f8f9fb;
        font-size: 13px;
        position: absolute;
        top: -22px;
        left: 0;
        width: 100%;
        text-align: center;
    }


`;

const Lines = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const LineContainer = styled.li`
    color: white;
    margin-top: 0.15rem;
    position: relative;
`;

const Blinker = styled.div`
    animation: .8s blink infinite;
    background: white;
    display: inline-block;
    height: calc(12px + 0.25vw);
    margin-bottom: -1px;
    padding-bottom: 3px;
    width: 8px;

    @keyframes blink {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
`;

const HiddenForm = styled.form`
    position: absolute;
    bottom: -1;
    left: 10px;
    z-index: -10;

    & > input {
        font-size: 16px;
    }
`;

const NeofetchOutputContainer = styled.div`
    color: white;
    display: flex;
    font-size: calc(9px + 0.25vw);
    padding: 0.5rem;
    position: relative;

    svg {
        max-width: 200px;
        padding: 0.5rem;
        width: 100%;
    }
`;

const NeofetchList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 0 0.5rem;
`;

const Cyan = styled.span`
    color: cyan;
`;

const Block = styled.div`
    background: ${props => props.color};
    display: inline-block;
    height: calc(9px + 0.25vw);
    margin-top: 0.5rem;
    width: 10px;

    &:first-of-type {
        margin-left: 1rem;
    }
`;

const Link = styled.a`
    color: #bb7dd7;
`

const Line = ({children}) => <LineContainer>{children}</LineContainer>;

const ActiveLine = ({children}) => <LineContainer>$ {children}<Blinker/></LineContainer>

const ColorBlock = props => <Block color={props.color}/>;

const HelpOutput = () => {
    const text = "Usage: hello [command] [options]\n" +
        "\n" +
        "Commands:\n" +
        "  hello               try it.\n" +
        "  hello goto blog     redirect to my blog.\n" +
        "  hello goto github   redirect to my gitHub.\n" +
        "\n" +
        "Options:\n" +
        "  -h, --help          show help information."
    return (
        <li>
            <p className="my-2" style={{whiteSpace: 'pre-wrap'}}>
                <pre>{text}</pre>
            </p>
            <p className="my-2"></p>
        </li>
    )
}

const NeofetchOutput = () => {
    const colors = ['red', 'green', 'yellow', 'blue', 'rebeccapurple', 'cyan', 'grey'];

    return (
        <NeofetchOutputContainer>
            <Avatar style={{width: '138px', height: '138px'}}/>
            <NeofetchList>
                <li><Cyan>me</Cyan>@<Cyan>kakkk</Cyan></li>
                <li>-----------------</li>
                <li><Cyan>RealName</Cyan>: Zhu Yingxin (朱颖鑫)</li>
                <li><Cyan>Position</Cyan>: Guangzhou, China</li>
                <li><Cyan>Role</Cyan>: Backend Engineer</li>
                <li><Cyan>Skills</Cyan>: Golang, MySQL, TypeScript, etc...</li>
                <li><Cyan>Blog</Cyan>: <Link href="https://blog.kakkk.net" target="_blank"
                                             rel="noopener noreferrer">https://blog.kakkk.net</Link></li>
                <li><Cyan>Github</Cyan>: <Link href="https://github.com/kakkk" target="_blank"
                                               rel="noopener noreferrer">https://github.com/kakkk</Link></li>
                <li><Cyan>Email</Cyan>: kakkk@live.com</li>
                <li>{colors.map(color => <ColorBlock color={color}/>)}</li>
            </NeofetchList>
        </NeofetchOutputContainer>
    );
};

const Terminal = () => {
    const [lines, setLines] = React.useState(['Try typing "hello"!']);
    const [input, setInput] = React.useState('');
    const focusInput = e => document.querySelector('input[type="text"]').focus();
    const clearTerminal = () => setLines([]);
    const clearInput = () => setInput('');

    function handleSubmit(e) {
        e.preventDefault();

        if (input === 'clear') {
            clearTerminal();
        } else if (input === ' ' || input.replace(/\s/g, '') === '') {
            setLines([...lines, '$ ' + input]);
        } else if (input === 'hello') {
            setLines([...lines, '$ ' + input, <Line><NeofetchOutput/></Line>])
        } else if (input === 'hello -h' || input === 'hello --help') {
            setLines([...lines, '$ ' + input, <Line><HelpOutput/></Line>])
        } else if (input === 'hello goto blog') {
            window.location.assign("https://blog.kakkk.net")
        } else if (input === 'hello goto github') {
            window.location.assign("https://github.com/kakkk")
        } else {
            console.log(input)
            setLines([...lines, '$ ' + input, `${input}: command not found`]);
        }

        clearInput();
    }

    React.useEffect(() => {
        focusInput();
    });

    return (
        <TerminalFigure onClick={focusInput}>
            <Lines>
                {lines.map((line, index) => <Line key={index}>{line}</Line>)}
                <Line>
                    <HiddenForm method="post" onSubmit={handleSubmit}>
                        <input type="text" value={input} onChange={e => setInput(e.target.value.toLowerCase())}></input>
                        <input type="submit"/>
                    </HiddenForm>
                </Line>
                <ActiveLine>{input}</ActiveLine>
            </Lines>
        </TerminalFigure>
    );
};


const App = () => (
    <>
        <GlobalStyle/>
        <AppContainer>
            <Terminal/>
        </AppContainer>
    </>
);

export default App;
