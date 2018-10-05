import React, { Component } from "react";
import { Col, Button, Container, Row } from "reactstrap";
import {
  getAllActivity,
  updateActivityForm,
  getActivityByUserId,
  SelectMonthlyList,
  SelectWeeklyList,
  SelectBiWeeklyList,
  SelectYesterdayList,
  SelectTodayList
} from "../../services/activity.service";
import moment from "moment";
import Paginator from "../Components/Paginator";

import ActivityConfirm from "./ActivityConfirm";

import { getAll } from "../../services/activitytype.service";
import { getById } from "../../services/activity.service";

class ActivityList extends Component {
  state = {
    width: window.innerWidth,
    totalContacts: 0,
    contactsList: [],
    totalLeads: 0,
    totalAppointments: 0,
    totalHours: 0,

    activityList: [],
    MonthlyActivity: [],
    transactionsStyle: {
      boxShadow: "10px 10px 5px black"
    },
    pageIndex: 0,
    pageSize: 20,
    totalRows: 0,
    totalPages: 0,
    monthly: false,
    weekly: false,
    all: true,
    BiWeekly: false,
    yesterday: false,
    today: false,
    //I want to send this down as props
    Id: "",
    ActivityTypeId: 0,
    Contacts: 0,
    Leads: 0,
    Appointments: 0,
    StartTime: 0,
    EndTime: 0,
    modal: false,
    activitytypes: []
  };

  componentDidMount(pageIndex = 0, pageSize = 20) {
    this.setState(
      prev => ({ pageIndex }),
      () => {
        this.executeQuery(this.state.pageIndex, this.state.pageSize);
      }
    );
    getAll().then(response => {
      this.setState({
        activitytypes: response.data.items
      });
    });
  }

  //-------Mobile friendly stuff------------------
  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };
  //--------------------------------------

  handleMonthlyRender = event => {
    this.setState(
      {
        monthly: true,
        weekly: false,
        all: false,
        Biweekly: false,
        yesterday: false,
        today: false,
        pageIndex: 0
      },
      () => {
        this.executeQuery(this.state.pageIndex, this.state.pageSize);
      }
    );
  };
  goToPage = pageIndex => {
    if (
      this.state.monthly ||
      this.state.Biweekly ||
      this.state.weekly ||
      this.state.all ||
      this.state.yesterday ||
      this.state.today
    )
      this.setState(
        prev => ({ pageIndex }),
        () => {
          this.executeQuery(this.state.pageIndex, this.state.pageSize);
        }
      );
  };

  executeQuery = (pageIndex, pageSize) => {
    if (this.state.monthly) {
      const promise = SelectMonthlyList(pageIndex, pageSize);
      promise
        .then(response => {
          const result = response.data.items;
          this.setState({
            activityList: result,
            totalRows: result[0].totalRows,
            totalPages: Math.ceil(result[0].totalRows / pageSize),
            totalContacts: result[0].totalContacts,
            totalLeads: result[0].totalLeads,
            totalAppointments: result[0].totalAppointments,
            totalHours: Math.floor(result[0].totalMinutes / 60),
            totalMinutes: result[0].totalMinutes % 60,
            weekly: false,
            all: false,
            Biweekly: false,
            yesterday: false,
            today: false
          });
        })
        .catch(err => {
          alert("No data for this date");
        });
    } else if (this.state.weekly) {
      const promise = SelectWeeklyList(pageIndex, pageSize);
      promise
        .then(response => {
          const result = response.data.items;
          this.setState({
            activityList: result,
            totalRows: result[0].totalRows,
            totalPages: Math.ceil(result[0].totalRows / pageSize),
            totalContacts: result[0].totalContacts,
            totalLeads: result[0].totalLeads,
            totalAppointments: result[0].totalAppointments,
            totalHours: Math.floor(result[0].totalMinutes / 60),
            totalMinutes: result[0].totalMinutes % 60,
            all: false,
            monthly: false,
            Biweekly: false,
            yesterday: false,
            today: false
          });
        })
        .catch(err => {
          alert("No data for this date");
        });
    } else if (this.state.Biweekly) {
      const promise = SelectBiWeeklyList(pageIndex, pageSize);
      promise
        .then(response => {
          const result = response.data.items;
          this.setState({
            activityList: result,
            totalRows: result[0].totalRows,
            totalPages: Math.ceil(result[0].totalRows / pageSize),
            totalContacts: result[0].totalContacts,
            totalLeads: result[0].totalLeads,
            totalAppointments: result[0].totalAppointments,
            totalHours: Math.floor(result[0].totalMinutes / 60),
            totalMinutes: result[0].totalMinutes % 60,
            all: false,
            monthly: false,
            weekly: false,
            yesterday: false,
            today: false
          });
        })
        .catch(err => {
          alert("No data for this date");
        });
    } else if (this.state.yesterday) {
      const promise = SelectYesterdayList(pageIndex, pageSize);
      promise
        .then(response => {
          const result = response.data.items;
          this.setState({
            activityList: result,
            totalRows: result[0].totalRows,
            totalPages: Math.ceil(result[0].totalRows / pageSize),
            totalContacts: result[0].totalContacts,
            totalLeads: result[0].totalLeads,
            totalAppointments: result[0].totalAppointments,
            totalHours: Math.floor(result[0].totalMinutes / 60),
            totalMinutes: result[0].totalMinutes % 60,
            all: false,
            monthly: false,
            weekly: false,
            Biweekly: false,
            today: false
          });
        })
        .catch(err => {
          alert("No data for this date");
        });
    } else if (this.state.today) {
      const promise = SelectTodayList(pageIndex, pageSize);
      promise
        .then(response => {
          const result = response.data.items;
          this.setState({
            activityList: result,
            totalRows: result[0].totalRows,
            totalPages: Math.ceil(result[0].totalRows / pageSize),
            totalContacts: result[0].totalContacts,
            totalLeads: result[0].totalLeads,
            totalAppointments: result[0].totalAppointments,
            totalHours: Math.floor(result[0].totalMinutes / 60),
            totalMinutes: result[0].totalMinutes % 60,
            all: false,
            monthly: false,
            weekly: false,
            yesterday: false,
            Biweekly: false
          });
        })
        .catch(err => {
          alert("No data for this date");
        });
    } else if (this.state.all) {
      const promise = getActivityByUserId(pageIndex, pageSize);
      promise
        .then(response => {
          const result = response.data.items;
          this.setState({
            activityList: result,
            totalRows: result[0].totalRows,
            totalPages: Math.ceil(result[0].totalRows / pageSize),
            totalContacts: result[0].totalContacts,
            totalLeads: result[0].totalLeads,
            totalAppointments: result[0].totalAppointments,
            totalHours: Math.floor(result[0].totalMinutes / 60),
            totalMinutes: result[0].totalMinutes % 60,
            monthly: false,
            Biweekly: false,
            weekly: false,
            yesterday: false,
            today: false
          });
        })
        .catch(err => {
          alert("No data for this date");
        });
    }
  };

  handleBiWeeklyRender = event => {
    this.setState(
      {
        Biweekly: true,
        monthly: false,
        weekly: false,
        all: false,
        yesterday: false,
        today: false,
        pageIndex: 0
      },
      () => {
        this.executeQuery(this.state.pageIndex, this.state.pageSize);
      }
    );
  };

  handleWeeklyRender = event => {
    this.setState(
      {
        weekly: true,
        monthly: false,
        all: false,
        Biweekly: false,
        yesterday: false,
        today: false,
        pageIndex: 0
      },
      () => {
        this.executeQuery(this.state.pageIndex, this.state.pageSize);
      }
    );
  };
  handleYesterdayRender = event => {
    this.setState(
      {
        yesterday: true,
        weekly: false,
        monthly: false,
        all: false,
        Biweekly: false,
        today: false,
        pageIndex: 0
      },
      () => {
        this.executeQuery(this.state.pageIndex, this.state.pageSize);
      }
    );
  };
  handleTodayRender = event => {
    this.setState(
      {
        today: true,
        weekly: false,
        yesterday: false,
        monthly: false,
        all: false,
        Biweekly: false,
        pageIndex: 0
      },
      () => {
        this.executeQuery(this.state.pageIndex, this.state.pageSize);
      }
    );
  };

  handleAllRender = event => {
    this.setState(
      {
        all: true,
        weekly: false,
        Biweekly: false,
        monthly: false,
        yesterday: false,
        today: false,
        pageIndex: 0
      },
      () => {
        this.executeQuery(this.state.pageIndex, this.state.pageSize);
      }
    );
  };
  //---------------------------Modal functions-----------------
  handleRednerActivityConfirm = Id => {
    getById(Id).then(response => {
      this.setState({
        Id: response.data.item.id,
        ActivityTypeId: response.data.item.activityTypeId,
        Contacts: response.data.item.contacts,
        Leads: response.data.item.leads,
        Appointments: response.data.item.appointments,
        StartTime: response.data.item.startTime,
        EndTime: response.data.item.endTime,
        modal: !this.state.modal
      });
    });
  };

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
        .then(response => {})
        .catch(err => {
          console.log("modalupdatefailed");
        });
    });
  };
  makeModalFalse = () => {
    this.setState({
      modal: false
    });
  };

  render() {
    const cellStyle = {
      border: "1px black smooth"
    };
    const { width } = this.state.width;
    const isMobile = width <= 1000;

    return (
      <Container className=" justify-content-center h-100 col-md-12">
        <div className=" animated slideInUpTiny animation-duration-3 justify-content-center  my-auto">
          <div className="">
            <div
              className="jr-card container"
              style={this.state.transactionsStyle}
            >
              <div className="jr-card-header">
                <h1 className="text-center"> Prospecting Activity List </h1>
              </div>
              {this.state.width >= 500 ? (
                <Row className="col-md-12">
                  <Col className="d-flex ">
                    <Button onClick={this.handleAllRender}>Year</Button>

                    <Button onClick={this.handleMonthlyRender}>
                      Last 30 Days
                    </Button>

                    <Button onClick={this.handleBiWeeklyRender}>
                      Last 14 Days
                    </Button>

                    <Button onClick={this.handleWeeklyRender}>
                      Last 7 Days
                    </Button>

                    <Button onClick={this.handleYesterdayRender}>
                      Yesterday
                    </Button>

                    <Button onClick={this.handleTodayRender}>Today</Button>
                  </Col>
                </Row>
              ) : (
                <Row className="col-md-12 ">
                  <Col className="d-flex justify-content-center ">
                    <Button size="sm" onClick={this.handleAllRender}>
                      Yr
                    </Button>

                    <Button size="sm" onClick={this.handleMonthlyRender}>
                      30
                    </Button>

                    <Button onClick={this.handleBiWeeklyRender}>14</Button>

                    <Button onClick={this.handleWeeklyRender}>7</Button>

                    <Button onClick={this.handleYesterdayRender}>1</Button>

                    <Button onClick={this.handleTodayRender}>T</Button>
                  </Col>
                </Row>
              )}
              <br />
              {this.state.width >= 500 ? (
                <div>
                  <Row>
                    <Col>
                      <h3>
                        Total Time: {this.state.totalHours} Hours and{" "}
                        {this.state.totalMinutes} Minutes
                      </h3>
                    </Col>
                  </Row>

                  <Row>
                    <h3 className="col-md-4">
                      Total Contacts:
                      {this.state.totalContacts}
                    </h3>

                    <h3 className="col-md-4">
                      Total Leads:
                      {this.state.totalLeads}
                    </h3>

                    <h3 className="col-md-4">
                      Total Appointments:
                      {this.state.totalAppointments}
                    </h3>
                  </Row>
                  <Row>
                    <h3 className="col-md-4">
                      Contacts per Hour:
                      {(
                        (this.state.totalContacts / this.state.totalMinutes) *
                        60
                      ).toFixed(1)}
                    </h3>

                    <h3 className="col-md-4">
                      Leads per Hour:
                      {(
                        this.state.totalLeads /
                        Math.ceil(this.state.minutes * 60)
                      ).toFixed(1)}
                    </h3>

                    <h3 className="col-md-4">
                      Appointments per Hour:
                      {(
                        (this.state.totalAppointments / this.state.minutes) *
                        60
                      ).toFixed(1)}
                    </h3>
                  </Row>
                </div>
              ) : (
                <div>
                  <Row>
                    <Col>
                      <h3>
                        Total Time: {this.state.totalHours} Hours and{" "}
                        {this.state.totalMinutes} Minutes
                      </h3>
                    </Col>
                  </Row>

                  <Row>
                    <h3 className="col-md-4">
                      Total Contacts:&nbsp;
                      {this.state.totalContacts}
                    </h3>

                    <h3 className="col-md-4">
                      Total Leads:&nbsp;
                      {this.state.totalLeads}
                    </h3>

                    <h3 className="col-md-4">
                      Total Appointments:&nbsp;
                      {this.state.totalAppointments}
                    </h3>
                  </Row>
                  <Row>
                    <h3 className="col-md-4">
                      Contacts per Hour:&nbsp;
                      {(
                        (this.state.totalContacts / this.state.totalMinutes) *
                        60
                      ).toFixed(1)}
                    </h3>

                    <h3 className="col-md-4">
                      Leads per Hour:&nbsp;
                      {(
                        (this.state.totalLeads / this.state.totalMinutes) *
                        60
                      ).toFixed(1)}
                    </h3>

                    <h3 className="col-md-4">
                      Appointments per Hour:&nbsp;
                      {(
                        (this.state.totalAppointments /
                          this.state.totalMinutes) *
                        60
                      ).toFixed(1)}
                    </h3>
                  </Row>
                </div>
              )}

              <div>
                <Row>
                  {this.state.width >= 500 ? (
                    <table className="default-table table-unbordered table table-sm table-hover">
                      <thead className="th-border-b">
                        <tr>
                          <th className="text-center">Day</th>
                          <th className="text-center">Type</th>
                          <th className="text-center">Contacts</th>
                          <th className="text-center">Leads</th>
                          <th className="text-center">Appointments</th>

                          <th className="text-center">Start Time</th>
                          <th className="text-center">End Time</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.activityList.map(list => {
                          return (
                            <tr
                              key={list.id}
                              value={list.id}
                              onClick={() => {
                                this.handleRednerActivityConfirm(list.id);
                              }}
                            >
                              <td className="text-center">
                                {moment
                                  .utc(list.startTime)
                                  .local()
                                  .format("ddd, MMM Do")}
                              </td>
                              <td className="text-center">
                                {list.activityType}
                              </td>
                              <td className="text-center">{list.contacts}</td>
                              <td className="text-center">{list.leads}</td>
                              <td className="text-center">
                                {list.appointments}
                              </td>

                              <td className="text-center">
                                {moment
                                  .utc(list.startTime)
                                  .local()
                                  .format("hh:mm a")}
                              </td>
                              <td className="text-center">
                                {list.endTime
                                  ? moment
                                      .utc(list.endTime)
                                      .local()
                                      .format("hh:mm a")
                                  : ""}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <table className="default-table table-unbordered table table-sm table-hover">
                      <thead
                        className="th-border-b justify-content-center
                    "
                      >
                        <tr>
                          <th className="text-center">Day</th>
                          <th className="text-center">Type</th>
                          <th className="text-center">C</th>
                          <th className="text-center">L</th>
                          <th className="text-center">A</th>

                          <th className="text-center">Start</th>
                          <th className="text-center">End</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody className=" justify-content-center">
                        {this.state.activityList.map(list => {
                          // const backgroundColor = "";
                          // if (
                          //   moment
                          //     .utc(list.startTime)
                          //     .local()
                          //     .format("ddd") === "Mon"
                          // ) {
                          //   this.backgroundColor = "blue";
                          // } else if (
                          //   moment
                          //     .utc(list.startTime)
                          //     .local()
                          //     .format("ddd") === "Tue"
                          // ) {
                          //   this.backgroundColor = "red";
                          // } else if (
                          //   moment
                          //     .utc(list.startTime)
                          //     .local()
                          //     .format("ddd") === "Wed"
                          // ) {
                          //   this.backgroundColor = "green";
                          // } else if (
                          //   moment
                          //     .utc(list.startTime)
                          //     .local()
                          //     .format("ddd") === "Thu"
                          // ) {
                          //   this.backgroundColor = "yellow";
                          // } else if (
                          //   moment
                          //     .utc(list.startTime)
                          //     .local()
                          //     .format("ddd") === "Fri"
                          // ) {
                          //   this.backgroundColor = "purple";
                          // } else if (
                          //   moment
                          //     .utc(list.startTime)
                          //     .local()
                          //     .format("ddd") === "Sat"
                          // ) {
                          //   this.backgroundColor = "pink";
                          // } else if (
                          //   moment
                          //     .utc(list.startTime)
                          //     .local()
                          //     .format("ddd") === "Sun"
                          // ) {
                          //   this.backgroundColor = "grey";
                          // }

                          return (
                            <tr
                              key={list.id}
                              value={list.id}
                              onClick={() => {
                                this.handleRednerActivityConfirm(list.id);
                              }}
                              // style={{ backgroundColor: this.backgroundColor, opacity: 5% }}
                            >
                              <td className="text-center">
                                {moment
                                  .utc(list.startTime)
                                  .local()
                                  .format("MMM Do")}
                              </td>
                              <td className="text-center">
                                {list.activityType}
                              </td>
                              <td className="text-center">{list.contacts}</td>
                              <td className="text-center">{list.leads}</td>
                              <td className="text-center">
                                {list.appointments}
                              </td>

                              <td className="text-center">
                                {moment
                                  .utc(list.startTime)
                                  .local()
                                  .format("hh:mm a")}
                              </td>
                              <td className="text-center">
                                {list.endTime
                                  ? moment
                                      .utc(list.endTime)
                                      .local()
                                      .format("hh:mm a")
                                  : ""}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </Row>
                <br />

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
              <Row className="col-md-12 justify-content-center">
                <Paginator
                  currentPage={this.state.pageIndex}
                  totalPages={this.state.totalPages}
                  goTo={this.goToPage}
                  buttonCount={5}
                />
              </Row>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default ActivityList;
