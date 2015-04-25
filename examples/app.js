import 'babel/polyfill';
import React from 'react';
import hljs from 'highlight.js';

// built-in components
import {
    PlayButton,
    NextButton,
    PrevButton,
    Progress,
    Timer,
    Cover
} from '../components';
import { SoundPlayerComponent, MultiplePlayerContainer } from '../addons';

// example players
import BasicSoundPlayer from './players/BasicSoundPlayer';
import ProgressSoundPlayer from './players/ProgressSoundPlayer';
import PlaylistSoundPlayer from './players/PlaylistSoundPlayer';
import BackgroundSoundPlayer from './players/BackgroundSoundPlayer';

// dummy data
const stepanIMeduza = 'https://soundcloud.com/stepan-i-meduza-official/dolgo-obyasnyat';
const shura = 'https://soundcloud.com/shura/shura-indecision-12-edit-1';
const glassCandy = 'https://soundcloud.com/johnnyjewel/glass-candy-shell-game';
const sayLouLou = 'https://soundcloud.com/sayloulou/nothing-but-a-heartbeat';
const pcMusic = 'https://soundcloud.com/pcmus/sets/deep-trouble';
const data = {
    image: 'https://d1v2xm8p2pd3wl.cloudfront.net/tracks/1a87a43ec633f01a917d23fc5e026bf9/640x400.jpg',
    artist: 'franiefroufrou',
    track: 'Exploding Whale by Sufjan Stevens'
};

const clientId = '08f79801a998c381762ec5b15e4914d5';
const seekingIcon = (
    <img src="./assets/preloader.svg" className="sb-soundplayer-play-icon" />
);

class PureComponents extends React.Component {
    constructor() {
        super();

        this.state = {
            seeking: false,
            playing: false,
            currentTime: 24,
            progressVal: 8,
            duration: 300,
        };
    }

    handleClick() {
        let { playing } = this.state;

        if (!playing) {
            this.setState({seeking: true});
            setTimeout(() => {
                this.setState({seeking: false, playing: !!!this.state.playing});
            }, 1500);
        } else {
            this.setState({playing: !!!this.state.playing});
        }

    }

    seekTrack(xPos, xPosRound, e) {
        this.setState({
            currentTime: Math.round(xPos * this.state.duration),
            progressVal: Math.round(xPos * 100)
        });
    }

    render() {
        let { playing, seeking, duration, currentTime, progressVal } = this.state;

        return (
            <div>
                <h2 id="PureComponents" className="caps mt3">
                    <a href="#PureComponents" className="black">Pure Components</a>
                </h2>
                <hr className="mt1 mb1 b2 border-orange" />

                <div className="mt3 mb3">
                    <strong>ReactSoundPlayer</strong> is bundled with several player related pure components inside.
                    Each component accepts <code className="black bg-darken-1 rounded">className</code> prop as regular DOM elements do which makes it simple to use different styles.
                    Here is the list of all available so-called "dumb" components that accept data and callbacks with self-descriptive props:
                </div>

                <h3 id="PlayButton" className="mb2 h4">
                    <a href="#PlayButton" className="black bg-yellow rounded">
                        <code>{'<PlayButton />'}</code>
                    </a>
                </h3>
                <div className="mb2">Play or pause track.</div>
                <PlayButton
                    className="button button-big button-outline button-grow orange rounded mb2"
                    playing={playing}
                    seeking={seeking}
                    seekingIcon={seekingIcon}
                    onTogglePlay={this.handleClick.bind(this)}
                />
                <pre><code className="html">{`<PlayButton
    className={String}
    playing={Boolean}
    seeking={Boolean}
    seekingIcon={ReactElement}
    onTogglePlay={Function}
    soundCloudAudio={instanceof SoundCloudAudio}
/>
`}</code></pre>
                <hr />

                <h3 id="NextButton" className="mb2 h4">
                    <a href="#NextButton" className="black bg-yellow rounded">
                        <code>{'<NextButton />'}</code>
                    </a>
                </h3>
                <div className="mb2">Switch to the next track in a playlist.</div>
                <NextButton className="button button-big button-outline button-grow orange rounded mb2" />
                <pre><code className="html">{`<NextButton
    className={String}
    onNextClick={Function}
    soundCloudAudio={instanceof SoundCloudAudio}
/>
`}</code></pre>
                <hr />

                <h3 id="PrevButton" className="mb2 h4">
                    <a href="#PrevButton" className="black bg-yellow rounded">
                        <code>{'<PrevButton />'}</code>
                    </a>
                </h3>
                <div className="mb2">Return to the previous track in a playlist.</div>
                <PrevButton className="button button-big button-outline button-grow orange rounded mb2" />
                <pre><code className="html">{`<PrevButton
    className={String}
    onPrevClick={Function}
    soundCloudAudio={instanceof SoundCloudAudio}
/>
`}</code></pre>
                <hr />
                <div className="mt2">
                    <strong><i>Important note:</i></strong> All buttons accept <code className="black bg-darken-1 rounded">soundCloudAudio</code> prop which
                    when passed will add actions to buttons automagically (e.g. play or pause, go to prev or next track),
                    {' callback function used in '}<code className="black bg-darken-1 rounded">onTogglePlay</code>,
                     <code className="black bg-darken-1 rounded">onNextClick</code> and
                     <code className="black bg-darken-1 rounded">onPrevClick</code> will still be called after.
                </div>
                <hr />

                <h3 id="Progress" className="mb2 h4">
                    <a href="#Progress" className="black bg-yellow rounded">
                        <code>{'<Progress />'}</code>
                    </a>
                </h3>
                <Progress
                    className="mb2"
                    value={progressVal}
                    onSeekTrack={this.seekTrack.bind(this)}
                />
                <pre><code className="html">{`<Progress
    className={String}
    innerClassName={String}
    value={Number}
    onSeekTrack={Function}
/>
`}</code></pre>
                <hr />

                <h3 id="Timer" className="mb2 h4">
                    <a href="#Timer" className="black bg-yellow rounded">
                        <code>{'<Timer />'}</code>
                    </a>
                </h3>
                <Timer
                    className="mb2"
                    duration={duration}
                    currentTime={currentTime}
                />
                <pre><code className="html">{`<Timer
    className={String}
    duration={Number}
    currentTime={Number}
/>
`}</code></pre>
                <hr />

                <h3 id="Cover" className="mb2 h4">
                    <a href="#Cover" className="black bg-yellow rounded">
                        <code>{'<Cover />'}</code>
                    </a>
                </h3>
                <Cover
                    className="mb2"
                    trackName={data.track}
                    artistName={data.artist}
                    backgroundUrl={data.image}
                />
                <pre><code className="html">{`<Cover
    className={String}
    trackName={String}
    artistName={String}
    backgroundUrl={String}
/>
`}</code></pre>
            </div>
        );
    }
}

class CustomPlayer extends React.Component {
    play() {
        let { soundCloudAudio, playing } = this.props;
        if (playing) {
            soundCloudAudio.pause();
        } else {
            soundCloudAudio.play();
        }
    }

    render() {
        let { track, playing } = this.props;

        if (!track) {
            return <div>Loading...</div>;
        }

        return (
            <div className="mt3 mb3 border p2 rounded b2">
                <h2 className="m0">{track.title}</h2>
                <h3 className="mt0">by {track.user.username}</h3>
                <button
                    className="button button-small bg-teal"
                    onClick={this.play.bind(this)}
                >
                    {playing ? 'Pause' : 'Play'}
                </button>
            </div>
        );
    }
}

class ContainerComponents extends React.Component {
    render() {
        let { onStartTrack } = this.props;
        return (
            <div>
                <h2 id="Containers" className="mt3 caps">
                    <a href="#Containers" className="black">Higher-order Containers</a>
                </h2>
                <hr className="mt1 mb1 b2 border-orange" />

                <div className="mt3">
                    In the heart of <strong>ReactSoundPlayer</strong> is container that incapsulates
                    interaction with browser's Audio object and passes all necessary state data as properties inside children.
                </div>
                <h3 id="SoundPlayerComponent" className="mb2 h4">
                    <a href="#SoundPlayerComponent" className="black bg-yellow rounded">
                        <code>{'<SoundPlayerComponent streamUrl={String} resolveUrl={String} clientId={String} />'}</code>
                    </a>
                </h3>
                <div className="mt1">
                    <p>In order to use it just choose what kind of data you're consuming (via <code className="black bg-darken-1 rounded">resolveUrl</code> or <code className="black bg-darken-1 rounded">streamUrl</code>).</p>
                    <p>With this information in mind it's really easy to create your own custom players like on example below:</p>
                </div>
                <SoundPlayerComponent
                    clientId={clientId}
                    resolveUrl={stepanIMeduza}
                    onStartTrack={onStartTrack}
                >
                    <CustomPlayer />
                </SoundPlayerComponent>
                <div className="mt2">
                    <pre><code className="javascript">{`import React from 'react';
import { SoundPlayerComponent } from 'react-soundplayer/addons';

const clientId = 'YOUR CLIENT ID';
const resolveUrl = 'https://soundcloud.com/stepan-i-meduza-official/dolgo-obyasnyat';

class CustomPlayer extends React.Component {
    play() {
        let { soundCloudAudio, playing } = this.props;
        if (playing) {
            soundCloudAudio.pause();
        } else {
            soundCloudAudio.play();
        }
    }

    render() {
        let { track, playing } = this.props;

        if (!track) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h2>{track.title}</h2>
                <h3>{track.user.username}</h3>
                <button onClick={this.play.bind(this)}>
                    {playing ? 'Pause' : 'Play'}
                </button>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <SoundPlayerComponent resolveUrl={streamUrl} clientId={clientId}>
                <CustomPlayer />
            </SoundPlayerComponent>
        );
    }
}

React.render(<App />, document.body);`}</code></pre>
                </div>
            </div>
        );
    }
}

class BuiltInPlayers extends React.Component {
    render() {
        return (
            <div>
                <h2 id="ExamplePlayers" className="caps mt3">
                    <a href="#ExamplePlayers" className="black">Example Players</a>
                </h2>
                <hr className="mt1 mb1 b2 border-orange" />
                <BasicSoundPlayer
                    clientId={clientId}
                    resolveUrl={shura}
                    {...this.props}
                />
                <ProgressSoundPlayer
                    clientId={clientId}
                    resolveUrl={sayLouLou}
                    {...this.props}
                />
                <PlaylistSoundPlayer
                    clientId={clientId}
                    resolveUrl={pcMusic}
                    {...this.props}
                />
                <BackgroundSoundPlayer
                    clientId={clientId}
                    resolveUrl={glassCandy}
                    {...this.props}
                />
            </div>
        );
    }
}

class App extends React.Component {
    componentDidMount() {
        hljs.initHighlighting();
    }

    render() {
        return (
            <div>
                <header className="center px3 py4 white mb4">
                    <img src="./assets/soundcloud.png" width="90" className="mt2" />
                    <h1 className="h1 caps mt2 mb0">React Sound Player</h1>
                    <p className="h3 mt1 mb2">Create custom SoundCloud players with React.js</p>
                    <a href="https://github.com/soundblogs/react-soundplayer" className="h4 button button-outline button-big mb3 mt2 mr2 b2">View on Github</a>
                    <a href="#ExamplePlayers" className="h4 button bg-orange button-big mb3 mt2 b2">Check Examples</a>
                </header>
                <div className="container">
                    <MultiplePlayerContainer>
                        {/* getting started */}
                        <h2 id="GettingStarted" className="caps mt3">
                            <a href="#GettingStarted" className="black">Getting Started</a>
                        </h2>
                        <hr className="mt1 mb1 b2 border-orange" />

                        {/* independent components */}
                        <PureComponents />

                        {/* container component */}
                        <ContainerComponents />

                        {/* players */}
                        <BuiltInPlayers />

                        {/* icons */}
                        <h2 id="IconComponents" className="caps mt3">
                            <a href="#IconComponents" className="black">Icon Components</a>
                        </h2>
                        <hr className="mt1 mb1 b2 border-orange" />

                        {/* resources */}
                        <h2 id="UsefulResources" className="caps mt3">
                            <a href="#UsefulResources" className="black">Useful Resources</a>
                        </h2>
                        <hr className="mt1 mb1 b2 border-orange" />
                    </MultiplePlayerContainer>
                </div>
            </div>
        );
    }
}

React.render(<App />, document.getElementById('app'));
