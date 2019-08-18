import React from 'react';
import { Grid } from '@material-ui/core';

import { SearchBar, VideoDetails, VideoList } from './components';

import youtube from './api/youtube';

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
    }

    componentDidMount() {
        this.handleSubmit('freeCodeCamp');
    }

    handleSubmit = async (searchTerm) => {
        const res = await youtube.get('search', {params: { q: searchTerm, part: 'snippet', maxResults: 5, key: [API_KEY]}});

        this.setState({
            videos: res.data.items, selectedVideo: res.data.items[0]
        });
    }

    onVideoSelect = (video) => {
        this.setState({
            selectedVideo: video,
        });
    }

    render() {
        const { selectedVideo, videos } = this.state;
        return (
            <Grid container justify="center" spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit} />
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetails video={selectedVideo} />
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default App;