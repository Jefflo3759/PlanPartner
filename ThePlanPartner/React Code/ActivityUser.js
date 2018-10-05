import React from "react";
import moment from "moment";
import {
  Container,
  Label,
  Input,
  FormGroup,
  Button,
  Row,
  Col
} from "reactstrap";
import "../../styles/timeblocks/react-datepicker.css";
import {
  postActivityForm,
  updateActivityForm,
  getActiveActivity
} from "../../services/activity.service";
import { getAll } from "../../services/activitytype.service";
import ActivityConfirm from "./ActivityConfirm";
import Timer from "./Timer";
import AddLead from "../Lead/AddLead";
import LeadModal from "../Lead/LeadModal";

class Activity extends React.Component {
  state = {
    Contacts: 0,
    Leads: 0,
    Appointments: 0,
    dropdownOpen: false,
    ActivityTypeId: "",
    StartTime: null,
    EndTime: null,
    ClockIn: false,
    Id: "",
    activitytypes: [],
    modal: false,
    leadModal: false
  };

  //------------------------------------Component functions----------------------
  componentDidMount() {
    console.log(`Clock ${this.props.clockNumber} was mounted!`);

    //getting all Activity Types to show for my dropdown
    getAll().then(response => {
      this.setState({
        activitytypes: response.data.items
      });
    });

    getActiveActivity().then(response => {
      this.setState({
        Id: response.data.item.id,
        ActivityTypeId: response.data.item.activityTypeId,
        Contacts: response.data.item.contacts,
        Leads: response.data.item.leads,
        Appointments: response.data.item.appointments,
        StartTime: moment.utc(response.data.item.startTime).local(),
        EndTime: response.data.item.endTime,
        ClockIn: true
      });
    });
  }
  componentDidUpdate(prevProps) {
    console.log("componentdidupdateworked");
  }

  componentWillMount() {
    console.log(`Clock ${this.props.clockNumber} was unmounted`);
    //I need to unmount something
  }
  //---------------------------Ajax Template for template-----------
  DoAjaxCall = () => {
    updateActivityForm(
      this.state.Id,
      this.state.ActivityTypeId,
      this.state.Contacts,
      this.state.Leads,
      this.state.Appointments,
      this.state.StartTime,
      this.state.EndTime
    )
      .then(response => {
        this.setState({});
      })
      .catch(err => {
        console.log("error");
      });
  };

  //---------------------------------Toggle Stuff------------------

  toggleModal = () => {
    this.setState({
      myInterval: null,
      modal: !this.state.modal
    });
  };

  handleClockOut = () => {
    if (this.state.StartTime) {
      this.setState({
        modal: !this.state.modal
      });
    }
  };
  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  handleActivityTypeChange = event => {
    this.setState({
      ActivityTypeId: event.target.value
    });
  };

  //-------------------------------------------------Clock in/ Clock OUt

  handleClockIn = event => {
    //Do this first
    if (this.state.StartTime === null && this.state.ActivityTypeId) {
      this.setState(
        {
          StartTime: moment.utc().local()
        },
        () => {
          postActivityForm(
            this.state.ActivityTypeId,
            this.state.Contacts,
            this.state.Leads,
            this.state.Appointments,
            moment(this.state.StartTime).local(),
            this.state.EndTime && this.state.EndTime.format()
          )
            .then(response => {
              console.log("Clock In worked, POGGERS");
              this.setState({
                ClockIn: true,
                Id: response.data.item
              });
            })
            .catch(err => {
              console.log("this is a good error: no pending activities :-)");
            });
        }
      );
    }
  };
  //---------------------------------------------C L A Handle Buttons--------------------
  handleAppointmentsAdd = event => {
    this.setState(
      {
        Appointments: this.state.Appointments + 1,
        Contacts: this.state.Contacts + 1,
        Leads: this.state.Leads + 1
      },
      () => {
        this.DoAjaxCall();
      }
    );
  };

  handleAppointmentsSubtract = event => {
    if (this.state.Appointments > 0) {
      this.setState(
        {
          Appointments: this.state.Appointments - 1
        },
        () => {
          this.DoAjaxCall();
        }
      );
    }
  };
  handleAppointmentsChange = event => {
    this.setState(
      {
        Appointments: parseInt(event.target.value)
      },
      () => {
        this.DoAjaxCall();
      }
    );
  };

  handleContactsAdd = event => {
    this.setState(
      {
        Contacts: this.state.Contacts + 1
      },
      () => {
        this.DoAjaxCall();
      }
    );
  };

  handleContactsSubtract = event => {
    if (this.state.Contacts > 0) {
      this.setState(
        {
          Contacts: this.state.Contacts - 1
        },
        () => {
          this.DoAjaxCall();
        }
      );
    }
  };
  handleContactsChange = event => {
    this.setState(
      {
        Contacts: parseInt(event.target.value)
      },
      () => {
        this.DoAjaxCall();
      }
    );
  };
  handleLeadsAdd = event => {
    this.setState(
      {
        Leads: this.state.Leads + 1,
        Contacts: this.state.Contacts + 1
      },
      () => {
        this.DoAjaxCall();
      }
    );
  };
  handleLeadsSubtract = event => {
    if (this.state.Leads > 0) {
      this.setState(
        {
          Leads: this.state.Leads - 1
        },
        () => {
          this.DoAjaxCall();
        }
      );
    }
  };

  handleLeadsChange = event => {
    this.setState(
      {
        Leads: parseInt(event.target.value)
      },
      () => {
        this.DoAjaxCall();
      }
    );
  };

  //--------------------------------------Create prop functions

  // when I click submit
  //this function will set my state to match my child componenet
  // after it will do an ajax update

  AllActivityData = task => {
    this.setState(task, () => {
      updateActivityForm(
        this.state.Id,
        this.state.ActivityTypeId,
        this.state.Contacts,
        this.state.Leads,
        this.state.Appointments,
        this.state.StartTime,
        moment.utc(this.state.EndTime).local()
      )
        .then(response => {
          this.props.history.push(`Activity`);
        })
        .catch(err => {
          console.log("error");
          postActivityForm(
            this.state.ActivityTypeId,
            this.state.Contacts,
            this.state.Leads,
            this.state.Appointments,
            this.state.StartTime,
            this.state.EndTime && this.state.EndTime
          )
            .then(response => {
              console.log("Clock In worked, POGGERS");
              this.setState({
                Id: response.data.item
              });
            })
            .catch(err => {
              console.log("error");
            });
        });
    });
  };
  makeModalFalse = () => {
    this.setState({
      modal: false
    });
  };
  //-------------------------------------------Rerender Buttons--------------------------------

  handleLeadsFormRender = event => {
    this.props.history.push(`addlead`);
  };

  handleRenderActivityList = event => {
    this.props.history.push(`ActivityList`);
  };

  handleSubmitUpdate = event => {
    updateActivityForm(
      this.state.Id,
      this.state.ActivityTypeId,
      this.state.Contacts,
      this.state.Leads,
      this.state.Appointments,
      this.state.StartTime,
      this.state.EndTime
    )
      .then(response => {
        this.setState({
          modal: false
        });
      })
      .catch(err => {
        console.log("error");
        postActivityForm(
          this.state.ActivityTypeId,
          this.state.Contacts,
          this.state.Leads,
          this.state.Appointments,
          this.state.StartTime.format(),
          this.state.EndTime && this.state.EndTime.format()
        )
          .then(response => {
            console.log("Clock In worked, POGGERS");
            this.setState({
              Id: response.data.item
            });
          })
          .catch(err => {
            console.log("error");
          });
      });
  };

  handleExitButton = () => {
    this.props.history.push(`Dashboard`);
  };

  //-------------leadModal--------------
  showModal = show => {
    this.setState({
      leadModal: show
    });
  };

  onCancel = () => {
    this.setState({ leadModal: false });
    this.showAllLeads();
  };

  addNewLead = () => {
    console.log("activate modal form");
    this.setState({ leadModal: !this.state.leadModal });
  };

  //-----------------------------------Render--------------------------------------------------

  render() {
    const startTimeMoment = moment(this.state.StartTime);
    return (
      <div className="app-wrapper ">
        <Container className=" col-lg-4 col-md-10 my-auto">
          <div className="jr-card my-auto col-sm-12">
            <div className="jr-card-header">
              <h1 className="text-center" style={{ fontSize: 30 }}>
                The Prospector
              </h1>
            </div>
            <FormGroup>
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                  {
                    //---------------------------DropDown----------------------------------
                  }

                  <select
                    className="custom-select mt-3 text-center"
                    onChange={event => this.handleActivityTypeChange(event)}
                    value={this.state.ActivityTypeId}
                    disabled={this.state.StartTime ? true : false}
                  >
                    <option value="">Choose a Category</option>

                    {this.state.activitytypes &&
                      this.state.activitytypes
                        .filter(activity => activity.inactiveActivityTracker)
                        .map(activity => {
                          return (
                            <option
                              key={activity.id}
                              value={activity.id}
                              onChange={this.handleCategoryIdChange}
                            >
                              {activity.name}
                            </option>
                          );
                        })}
                  </select>
                  <div>
                    <br />
                  </div>
                  {
                    //---------------------------------------Clock In Button----------------------------------------
                  }
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                  <h1 className="text-center">
                    {this.state.StartTime
                      ? moment(this.state.StartTime).format("lll")
                      : undefined}
                    {/* {this.state.StartTime &&
                    moment(this.state.StartTime).format("LLL")} */}
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                  <Button
                    color="success"
                    className="form-control float-right"
                    size="sm"
                    onClick={this.handleClockIn}
                    disabled={this.state.ActivityTypeId ? false : true}
                    hidden={!this.state.StartTime ? false : true}
                  >
                    Clock In
                  </Button>
                </Col>
                {this.state.StartTime && (
                  <Col sm="12" md={{ size: 10, offset: 1 }}>
                    <Button
                      color="danger"
                      className="form-control float-right"
                      size="sm"
                      onClick={this.handleClockOut}
                    >
                      Clock Out
                    </Button>
                  </Col>
                )}
              </Row>
              {
                //-----------------------------------------Activity Tracker Buttons-------------------------------------------
              }
              {this.state.ClockIn && (
                <div>
                  <Row>
                    <Col md={{ size: 10, offset: 1 }}>
                      <Row>
                        <Col
                          xs={{ size: 4 }}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Button
                            outline
                            color="link"
                            className="form-control"
                            size="lg"
                            onClick={this.handleContactsSubtract}
                          >
                            <h1 style={{ fontSize: 60 }}>-</h1>
                          </Button>
                        </Col>
                        <Col xs={{ size: 4 }}>
                          <Row>
                            <div className="container text-center">
                              <h1
                                style={{
                                  marginBottom: 5,
                                  marginTop: 15,
                                  fontSize: 50
                                }}
                              >
                                {this.state.Contacts}
                              </h1>
                              <h3 style={{ textAlign: "center" }}>
                                {" "}
                                Contacts{" "}
                              </h3>
                            </div>
                          </Row>
                        </Col>
                        <Col xs={{ size: 4 }}>
                          <Button
                            outline
                            color="link"
                            className="form-control"
                            size="lg"
                            onClick={this.handleContactsAdd}
                          >
                            <h1 style={{ fontSize: 60 }}> +</h1>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md={{ size: 10, offset: 1 }}>
                      <Row>
                        <Col xs={{ size: 4 }}>
                          <Button
                            outline
                            color="link"
                            className="form-control"
                            size="lg"
                            onClick={this.handleLeadsSubtract}
                          >
                            <h1 style={{ fontSize: 60 }}> -</h1>
                          </Button>
                        </Col>
                        <Col xs={{ size: 4 }}>
                          <Row>
                            <div className="container text-center">
                              <h1
                                style={{
                                  marginBottom: 5,
                                  marginTop: 15,
                                  fontSize: 50
                                }}
                              >
                                {this.state.Leads}
                              </h1>
                              <h3 style={{ textAlign: "center" }}> Leads </h3>
                            </div>
                          </Row>
                        </Col>
                        <Col xs={{ size: 4 }}>
                          <Button
                            outline
                            color="link"
                            className="form-control"
                            size="lg"
                            onClick={this.handleLeadsAdd}
                            //     style={{ padding: 20 }}
                          >
                            <h1 style={{ fontSize: 60 }}> +</h1>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md={{ size: 10, offset: 1 }}>
                      <Row>
                        <Col xs={{ size: 4 }}>
                          <Button
                            outline
                            color="link"
                            className="form-control"
                            size="lg"
                            onClick={this.handleAppointmentsSubtract}
                            // style={{ padding: 20 }}
                          >
                            <h1 style={{ fontSize: 60 }}> -</h1>
                          </Button>
                        </Col>
                        <Col xs={{ size: 4 }}>
                          <Row>
                            <div className="container text-center">
                              <h1
                                style={{
                                  marginBottom: 5,
                                  marginTop: 15,
                                  fontSize: 50
                                }}
                              >
                                {this.state.Appointments}
                              </h1>
                              <h3 style={{ textAlign: "center" }}>Appts.</h3>
                            </div>
                          </Row>
                        </Col>

                        <Col xs={{ size: 4 }}>
                          <Button
                            outline
                            color="link"
                            className="form-control"
                            size="lg"
                            onClick={this.handleAppointmentsAdd}
                            //    style={{ padding: 20 }}
                          >
                            <h1 style={{ fontSize: 60 }}> +</h1>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              )}
              {this.state.ClockIn && <Timer ClockIn={this.state.ClockIn} />}
              {
                //------------------------------------Rerender Buttons----------------------------------
              }
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                  <Button
                    color="info"
                    className="form-control"
                    size="sm"
                    onClick={this.addNewLead}
                  >
                    Add a New Lead
                  </Button>
                </Col>
              </Row>
              <div>
                <div className="float-right">
                  <Button color="danger" onClick={this.handleExitButton}>
                    Exit
                  </Button>
                </div>
                {
                  //------------------------------------Modal Confirm Data Start------------------------------
                }
                {this.state.modal && (
                  <ActivityConfirm
                    // key={this.state.activityTypes}
                    ActivityTypeId={this.state.ActivityTypeId}
                    Contacts={this.state.Contacts}
                    Leads={this.state.Leads}
                    Appointments={this.state.Appointments}
                    StartTime={this.state.StartTime}
                    EndTime={this.state.EndTime}
                    modal={this.state.modal}
                    activitytypes={this.state.activitytypes}
                    makeModalFalse={this.makeModalFalse}
                    AllActivityData={this.AllActivityData}
                  />
                )}
              </div>
              <div>
                {this.state.leadModal && (
                  <LeadModal
                    className="col-md-4"
                    toggle={e => this.showModal(false)}
                    modal={this.state.leadModal}
                    caption="Lead Profile"
                  >
                    <AddLead
                      key={this.state.leadData}
                      leadData={this.state.lead}
                      onCancel={this.onCancel}
                      addLead={this.addLead}
                    />
                  </LeadModal>
                )}
              </div>
            </FormGroup>
          </div>
        </Container>
      </div>
    );
  }
}

export default Activity;
