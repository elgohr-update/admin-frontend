import React, { Component } from "react";

import "../pageStyles.scss";

import URL from "../../components/url";
import {Link} from "../../types";

import {getAllURLs, redirectToAuthorize} from "../../api";
import { URLFormatOptions } from "url";

interface AllURLsPageState {
    urls: Link[]
}

class AllURLsPage extends Component<Readonly<{}>, AllURLsPageState> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            urls: []
        }
    }

    componentDidMount() {
        getAllURLs().then(links => {
            this.setState({
                urls: links
            })
        }).catch(() => {
            redirectToAuthorize()
        })
    }

    render() {
        const urldata = [];

        for (var url of this.state.urls) {
            urldata.push(<URL key={url.short_code} link={url}/>);
        }

        return <div>
            <h1 className="page-title">All URLs</h1>
            <div className="urls">
                {urldata}
            </div>
        </div>
    }
}

export default AllURLsPage;