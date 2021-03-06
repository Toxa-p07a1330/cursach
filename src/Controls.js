import './App.css';
import {useContext, useState} from 'react'
import {UserContext} from "./Context";


let Controls = ()=>{
    const context = useContext(UserContext);
    const [wasStarted, setStarted] = useState();
    const [wasStopped, setStopped] = useState();
    const [wasFileLoaded, setFileLoaded] = useState(false);

    let startPlaying = ()=>{
        let nodeWithEffect = context.data.getNodeWithEffect(context.data.sourceNode)
        let nodeWithEqualizerAndEffects = context.data.getNodeWithEqualization(nodeWithEffect);
        let nodeWithGraphicsAndAnalyser = context.data.getNodeWithAnalyser(nodeWithEqualizerAndEffects);
        nodeWithGraphicsAndAnalyser.connect(context.data.audioCtx.destination)
        context.data.sourceNode.start();
        setStarted(true);
    }
    let stopPlaying = ()=>{
        if (context.data.sourceNode) {
            context.data.sourceNode.stop();
            setStopped(true);
        }

    }
    let reinit = ()=>{
        context.data.setSourceNode();
        setStopped(false);
        setStarted(false);
        setFileLoaded(false);
    }
    document.addEventListener("fileLoaded", ()=>{
        if (!wasFileLoaded) {
            setFileLoaded(true);
        }
    })
    return (
        <div className="App">
            <button onClick={startPlaying} id={"start"} disabled={wasStarted || ! wasFileLoaded}>
                Start
            </button>
            <button onClick={stopPlaying} id={"stop"} disabled={!(wasStarted && !wasStopped)}>
                Stop
            </button>
            <button onClick={reinit} id={"reinit"} disabled={!wasStopped}>
                Reinit
            </button>
        </div>
    );
}

export default Controls;
