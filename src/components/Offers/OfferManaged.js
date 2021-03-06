import React, { Component } from "react";
import Moment from "react-moment";
import "moment/locale/ca";
import RequestDialog from "../dialogs/RequestDialog";
import EditOfferDialog from "../dialogs/EditOfferDialog";

class OfferManaged extends Component{

    state = {
        displayRequestsDialog: false
    };

    constructor(props) {
        super(props);
        this.state = {
            displayRequestsDialog: false,
            displayEditDialog: false
        };
    }

    componentDidMount() {
        this.setState({
            displayRequestsDialog: false,
            displayEditDialog: false
        });
    }

    render() {
        const { offer, requests, edit } = this.props;
        const {displayRequestsDialog, displayEditDialog } = this.state;
        const categoriaTipo = [
            "../../images/food-delivery.svg",
            "../../images/elearning.svg",
            "../../images/cross.svg",
            "../../images/toilet-paper.svg"
        ];
        return (
            <div className="anunci-panell" style={{
                backgroundColor: "#EAEAEA",
                margin: "3%",
                padding: "5%",
                borderRadius: "7px",
            }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start"
                    }}
                >
                    <img
                        className="badge-img"
                        src={categoriaTipo[offer.type]}
                        alt="altres"
                    />
                    <h3
                        className="post-title"
                        style={{
                            margin: "0 5px "
                        }}
                    >
                        {offer.title}
                    </h3>
                </div>
                <p
                    style={{
                        color: "#989898"
                    }}
                >
                    <Moment format="LLL" locale="ca">
                        {offer.startDate}
                    </Moment>{" "}
                    fins les{" "}
                    <Moment format="LT" locale="ca">
                        {offer.endDate}
                    </Moment>
                </p>

                <p
                    style={{
                        textAlign: "start",
                        margin: "10px 0 10px 0",
                        fontSize: "12px",
                    }}
                >
                    {offer.description}
                </p>

                { offer.proximity && offer.username ?
                    <p style={{margin: "10px 0 10px 0"}}>
                        De {offer.username} a {offer.proximity.toFixed(1)} km
                    </p> : null
                }

                <div className="profile-stats">

                    { edit ?
                        <>
                            <p><button onClick={() => this.setState({displayEditDialog: !this.state.displayEditDialog })} className="btn" style={{padding: "10px",}}>Editar</button></p>
                            <EditOfferDialog display={displayEditDialog} offer={offer} onClose={() => this.setState({ displayEditDialog: !this.state.displayEditDialog })} />
                        </>
                        : null }

                    {requests ?
                            typeof offer.requests === "object" &&
                            offer.requests.length > 0 &&
                            offer.requests.filter((req) => req.status === 1).length === 0 ?
                                <>
                                    <p><span>Sol·licituds</span><br />({offer.requests.length})</p>
                                    <p><button onClick={() => this.setState({displayRequestsDialog: !this.state.displayRequestsDialog})} className="btn" style={{padding: "10px",}}>Veure-les</button></p>
                                    <RequestDialog display={displayRequestsDialog} requests={offer.requests} onClose={() => this.setState({displayRequestsDialog: !this.state.displayRequestsDialog})}/>
                                </> :
                                    offer.requests.find((req) => req.status === 1) ?
                                        <>
                                            Adjudicat a {offer.requests.find((req) => req.status === 1).requester.username}
                                        </> : null
                        : null }

                </div>

            </div>
        );
    }
}

export default OfferManaged;
