import * as React from 'react';
import { render } from 'react-dom';
import { ParticleCanvas } from './components/ParticleCanvas';
import './index.less';

function App() {
    const [value, setValue] = React.useState('#go');
    const [text, setText] = React.useState('Good luck!');
    const [timestamp, setTimestamp] = React.useState(0);

    return <div>
        <ParticleCanvas text={text} timestamp={timestamp}/>

        <div className="ui">
            <input
                className="ui-input"
                value={value}
                autoFocus
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        setText(value);

                        if (value[0] === '#') {
                            setTimestamp(Date.now());
                        }
                    }
                }}
            />
            <span className="ui-return">↵</span>
        </div>
    </div>;
}

render(<App/>, document.querySelector('#app'));
