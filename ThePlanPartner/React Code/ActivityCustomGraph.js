import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
// import {
//   Charts,
//   ChartContainer,
//   ChartRow,
//   YAxis,
//   LineChart
// } from "react-timeseries-charts";
import { SelectAllGraph } from "../../services/activity.service";
import { Button, Row, Col } from "reactstrap";
import moment from "moment";
import DatePicker from "react-datepicker";

class ActivityGraphs extends Component {
  state = {
    width: window.innerWidth,
    data: [],
    WeeklyGraphRawData: [],
    customDate: moment()
      .local()
      .hours(0)
      .minutes(0)
      .add(-6, "days")
      .format("YYYY-MM-DD"),

    dataLeads: [],
    WeeklyGraphRawDataLeads: [],

    dataAppointments: [],
    WeeklyGraphRawDataAppointments: [],
    showContacts: true,
    showLeads: false,
    showAppointments: false
  };

  componentDidMount() {
    SelectAllGraph().then(response => {
      const dataContactsWeek = this.arrayFunctionContactsWeek(
        response.data.items
      );
      this.setState({
        WeeklyGraphRawData: response.data.items,
        dataContactsWeek: dataContactsWeek
      });
      const dataContactsBiWeekly = this.arrayFunctionContactsBiWeekly(
        response.data.items
      );
      this.setState({
        WeeklyGraphRawDataMonthly: response.data.items,
        dataContactsBiWeekly: dataContactsBiWeekly
      });
      const dataContactsMonthly = this.arrayFunctionContactsMonthly(
        response.data.items
      );
      this.setState({
        WeeklyGraphRawData: response.data.items,
        dataContactsMonthly: dataContactsMonthly
      });
      const dataLeadsWeekly = this.arrayFunctionLeadsWeekly(
        response.data.items
      );
      this.setState({
        WeeklyGraphRawDataLeads: response.data.items,
        dataLeadsWeekly: dataLeadsWeekly
      });
      const dataLeadsBiWeekly = this.arrayFunctionLeadsBiWeekly(
        response.data.items
      );
      this.setState({
        WeeklyGraphRawDataLeads: response.data.items,
        dataLeadsBiWeekly: dataLeadsBiWeekly
      });
      const dataLeadsMonthly = this.arrayFunctionLeadsMonthly(
        response.data.items
      );
      this.setState({
        WeeklyGraphRawDataLeads: response.data.items,
        dataLeadsMonthly: dataLeadsMonthly
      });
      const dataAppointmentsWeekly = this.arrayFunctionAppointmentsWeekly(
        response.data.items
      );
      this.setState({
        WeeklyGraphRawDataAppointments: response.data.items,
        dataAppointmentsWeekly: dataAppointmentsWeekly
      });
      const dataAppointmentsBiWeekly = this.arrayFunctionAppointmentsBiWeekly(
        response.data.items
      );
      this.setState({
        WeeklyGraphRawDataAppointments: response.data.items,
        dataAppointmentsBiWeekly: dataAppointmentsBiWeekly
      });
      const dataAppointmentsMonthly = this.arrayFunctionAppointmentsMonthly(
        response.data.items
      );
      this.setState({
        WeeklyGraphRawDataAppointments: response.data.items,
        dataAppointmentsMonthly: dataAppointmentsMonthly
      });
    });
  }

  handleContactsShow = event => {
    this.setState({
      showContacts: true,
      showAppointments: false,
      showLeads: false
    });
  };
  handleLeadsShow = event => {
    this.setState({
      showLeads: true,
      showContacts: false,
      showAppointments: false
    });
  };
  handleAppointmentsShow = event => {
    this.setState({
      showAppointments: true,
      showContacts: false,
      showLeads: false
    });
  };

  //I will create a for and while loop where
  //it will continue iterating until
  //seven days have passed

  //------------------------------------Contacts Array------------------------------------
  arrayFunctionContactsWeek = newRawData => {
    const startdate = moment(this.state.customDate).local();
    const processedData = [];
    //  const newRawData = this.state.WeeklyGraphRawData;

    let count = 0;
    const endDate = moment(this.state.customDate)
      .local()
      .add(7, "days")
      .hours(0)
      .minutes(0);
    for (let d = startdate; d < endDate; d = d.add(1, "days")) {
      const dayData = {
        name: d.format("YYYY-MM-DD"),
        ["Open House"]: 0,
        ["Door Knockingnocking"]: 0,
        ["Phone Call"]: 0
      };

      const match1 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Open House"
        ) {
          return true;
        } else return false;
      });
      if (match1.length > 0) {
        dayData["Open House"] = match1[0].dayContacts;
      }
      const match2 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Phone Call"
        ) {
          return true;
        } else return false;
      });
      if (match2.length > 0) {
        dayData["Phone Call"] = match2[0].dayContacts;
      }
      const match3 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Door Knocking"
        ) {
          return true;
        } else return false;
      });
      if (match3.length > 0) {
        dayData["Door Knocking"] = match3[0].dayContacts;
      }
      //help

      dayData.name = moment(dayData.name).format("Do");
      processedData.push(dayData);
    }
    return processedData;
  };

  //------------------------------------------------Contacts Biweekly---------------------------

  arrayFunctionContactsBiWeekly = newRawData => {
    const startdate = moment(this.state.customDate).local();
    const processedData = [];
    //  const newRawData = this.state.WeeklyGraphRawData;

    let count = 0;
    const endDate = moment(this.state.customDate)
      .local()
      .add(14, "days")
      .hours(0)
      .minutes(0);
    for (let d = startdate; d < endDate; d = d.add(1, "days")) {
      const dayData = {
        name: d.format("YYYY-MM-DD"),
        ["Open House"]: 0,
        ["Door Knockingnocking"]: 0,
        ["Phone Call"]: 0
      };

      const match1 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Open House"
        ) {
          return true;
        } else return false;
      });
      if (match1.length > 0) {
        dayData["Open House"] = match1[0].dayContacts;
      }
      const match2 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Phone Call"
        ) {
          return true;
        } else return false;
      });
      if (match2.length > 0) {
        dayData["Phone Call"] = match2[0].dayContacts;
      }
      const match3 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Door Knocking"
        ) {
          return true;
        } else return false;
      });
      if (match3.length > 0) {
        dayData["Door Knocking"] = match3[0].dayContacts;
      }
      //help

      dayData.name = moment(dayData.name).format("Do");
      processedData.push(dayData);
    }
    return processedData;
  };

  //-------------------------------------------------Contacts Monthly--------------------------

  arrayFunctionContactsMonthly = newRawData => {
    const startdate = moment(this.state.customDate).local();
    const processedData = [];
    //  const newRawData = this.state.WeeklyGraphRawData;

    let count = 0;
    const endDate = moment(this.state.customDate)
      .local()
      .add(30, "days")
      .hours(0)
      .minutes(0);
    for (let d = startdate; d < endDate; d = d.add(1, "days")) {
      const dayData = {
        name: d.format("YYYY-MM-DD"),
        ["Open House"]: 0,
        ["Door Knockingnocking"]: 0,
        ["Phone Call"]: 0
      };

      const match1 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Open House"
        ) {
          return true;
        } else return false;
      });
      if (match1.length > 0) {
        dayData["Open House"] = match1[0].dayContacts;
      }
      const match2 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Phone Call"
        ) {
          return true;
        } else return false;
      });
      if (match2.length > 0) {
        dayData["Phone Call"] = match2[0].dayContacts;
      }
      const match3 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Door Knocking"
        ) {
          return true;
        } else return false;
      });
      if (match3.length > 0) {
        dayData["Door Knocking"] = match3[0].dayContacts;
      }
      //help

      dayData.name = moment(dayData.name).format("Do");
      processedData.push(dayData);
    }
    return processedData;
  };

  //--------------------------------------------------Leads Weekly------------------------------

  arrayFunctionLeadsWeekly = newRawData => {
    const startdate = moment(this.state.customDate).local();

    const processedData = [];
    //  const newRawData = this.state.WeeklyGraphRawData;

    let count = 0;
    const endDate = moment(this.state.customDate)
      .local()
      .add(7, "days")
      .hours(0)
      .minutes(0);
    for (let d = startdate; d < endDate; d = d.add(1, "days")) {
      const dayData = {
        name: d.format("YYYY-MM-DD"),
        ["Open House"]: 0,
        ["Door Knocking"]: 0,
        ["Phone Call"]: 0
      };

      const match1 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Open House"
        ) {
          return true;
        } else return false;
      });
      if (match1.length > 0) {
        dayData["Open House"] = match1[0].dayLeads;
      }
      const match2 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Phone Call"
        ) {
          return true;
        } else return false;
      });
      if (match2.length > 0) {
        dayData["Phone Call"] = match2[0].dayLeads;
      }
      const match3 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Door Knocking"
        ) {
          return true;
        } else return false;
      });
      if (match3.length > 0) {
        dayData["Door Knocking"] = match3[0].dayLeads;
      }

      dayData.name = moment(dayData.name).format("Do");
      processedData.push(dayData);
    }
    return processedData;
  };

  //---------------------------------------------------LeadsBiWeekly----------------------------------

  arrayFunctionLeadsBiWeekly = newRawData => {
    const startdate = moment(this.state.customDate).local();

    const processedData = [];
    //  const newRawData = this.state.WeeklyGraphRawData;
    let count = 0;
    const endDate = moment(this.state.customDate)
      .local()
      .add(14, "days")
      .hours(0)
      .minutes(0);
    for (let d = startdate; d < endDate; d = d.add(1, "days")) {
      const dayData = {
        name: d.format("YYYY-MM-DD"),
        ["Open House"]: 0,
        ["Door Knocking"]: 0,
        ["Phone Call"]: 0
      };

      const match1 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Open House"
        ) {
          return true;
        } else return false;
      });
      if (match1.length > 0) {
        dayData["Open House"] = match1[0].dayLeads;
      }
      const match2 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Phone Call"
        ) {
          return true;
        } else return false;
      });
      if (match2.length > 0) {
        dayData["Phone Call"] = match2[0].dayLeads;
      }
      const match3 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Door Knocking"
        ) {
          return true;
        } else return false;
      });
      if (match3.length > 0) {
        dayData["Door Knocking"] = match3[0].dayLeads;
      }

      dayData.name = moment(dayData.name).format("Do");
      processedData.push(dayData);
    }
    return processedData;
  };

  //---------------------------------------------------LeadsMonthly-----------------------------------
  arrayFunctionLeadsMonthly = newRawData => {
    const startdate = moment(this.state.customDate).local();

    const processedData = [];
    //  const newRawData = this.state.WeeklyGraphRawData;
    let count = 0;
    const endDate = moment(this.state.customDate)
      .local()
      .add(30, "days")
      .hours(0)
      .minutes(0);
    for (let d = startdate; d < endDate; d = d.add(1, "days")) {
      const dayData = {
        name: d.format("YYYY-MM-DD"),
        ["Open House"]: 0,
        ["Door Knocking"]: 0,
        ["Phone Call"]: 0
      };

      const match1 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Open House"
        ) {
          return true;
        } else return false;
      });
      if (match1.length > 0) {
        dayData["Open House"] = match1[0].dayLeads;
      }
      const match2 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Phone Call"
        ) {
          return true;
        } else return false;
      });
      if (match2.length > 0) {
        dayData["Phone Call"] = match2[0].dayLeads;
      }
      const match3 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Door Knocking"
        ) {
          return true;
        } else return false;
      });
      if (match3.length > 0) {
        dayData["Door Knocking"] = match3[0].dayLeads;
      }

      dayData.name = moment(dayData.name).format("Do");
      processedData.push(dayData);
    }
    return processedData;
  };

  //----------------------------------------------------AppointmentsWeekly------------------------

  arrayFunctionAppointmentsWeekly = newRawData => {
    const startdate = moment(this.state.customDate).local();
    const processedData = [];
    //  const newRawData = this.state.WeeklyGraphRawData;
    let count = 0;
    const endDate = moment(this.state.customDate)
      .local()
      .add(7, "days")
      .hours(0)
      .minutes(0);
    for (let d = startdate; d < endDate; d = d.add(1, "days")) {
      const dayData = {
        name: d.format("YYYY-MM-DD"),
        ["Open House"]: 0,
        ["Door Knocking"]: 0,
        ["Phone Call"]: 0
      };

      const match1 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Open House"
        ) {
          return true;
        } else return false;
      });
      if (match1.length > 0) {
        dayData["Open House"] = match1[0].dayAppointments;
      }
      const match2 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Phone Call"
        ) {
          return true;
        } else return false;
      });
      if (match2.length > 0) {
        dayData["Phone Call"] = match2[0].dayAppointments;
      }
      const match3 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Door Knocking"
        ) {
          return true;
        } else return false;
      });
      if (match3.length > 0) {
        dayData["Door Knocking"] = match3[0].dayAppointments;
      }
      dayData.name = moment(dayData.name).format("Do");
      processedData.push(dayData);
    }
    return processedData;
  };

  //-------------------------------------------------Appointments BiWeekly----------------------

  arrayFunctionAppointmentsBiWeekly = newRawData => {
    const startdate = moment(this.state.customDate).local();
    const processedData = [];
    //  const newRawData = this.state.WeeklyGraphRawData;
    let count = 0;
    const endDate = moment(this.state.customDate)
      .local()
      .add(14, "days")
      .hours(0)
      .minutes(0);
    for (let d = startdate; d < endDate; d = d.add(1, "days")) {
      const dayData = {
        name: d.format("YYYY-MM-DD"),
        ["Open House"]: 0,
        ["Door Knocking"]: 0,
        ["Phone Call"]: 0
      };

      const match1 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Open House"
        ) {
          return true;
        } else return false;
      });
      if (match1.length > 0) {
        dayData["Open House"] = match1[0].dayAppointments;
      }
      const match2 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Phone Call"
        ) {
          return true;
        } else return false;
      });
      if (match2.length > 0) {
        dayData["Phone Call"] = match2[0].dayAppointments;
      }
      const match3 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Door Knocking"
        ) {
          return true;
        } else return false;
      });
      if (match3.length > 0) {
        dayData["Door Knocking"] = match3[0].dayAppointments;
      }
      dayData.name = moment(dayData.name).format("Do");
      processedData.push(dayData);
    }
    return processedData;
  };

  //-------------------------------------------------Appointments Monthly----------------------

  arrayFunctionAppointmentsMonthly = newRawData => {
    const startdate = moment(this.state.customDate).local();
    const processedData = [];
    //  const newRawData = this.state.WeeklyGraphRawData;
    let count = 0;
    const endDate = moment(this.state.customDate)
      .local()
      .add(30, "days")
      .hours(0)
      .minutes(0);
    for (let d = startdate; d < endDate; d = d.add(1, "days")) {
      const dayData = {
        name: d.format("YYYY-MM-DD"),
        ["Open House"]: 0,
        ["Door Knocking"]: 0,
        ["Phone Call"]: 0
      };

      const match1 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Open House"
        ) {
          return true;
        } else return false;
      });
      if (match1.length > 0) {
        dayData["Open House"] = match1[0].dayAppointments;
      }
      const match2 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Phone Call"
        ) {
          return true;
        } else return false;
      });
      if (match2.length > 0) {
        dayData["Phone Call"] = match2[0].dayAppointments;
      }
      const match3 = newRawData.filter(item => {
        if (
          moment(item.date).isSame(d, "day") && //format to look exact
          item.name === "Door Knocking"
        ) {
          return true;
        } else return false;
      });
      if (match3.length > 0) {
        dayData["Door Knocking"] = match3[0].dayAppointments;
      }
      dayData.name = moment(dayData.name).format("Do");
      processedData.push(dayData);
    }
    return processedData;
  };

  //---------------------------------------Handlers----------------------------------------------

  handleInputChange = event => {
    this.setState({
      customDate: moment(event.target.value)
        .local()
        .format("YYYY-MM-DD")
    });
  };

  handleSubmitButton = event => {
    const dataContactsWeek = this.arrayFunctionContactsWeek(
      this.state.WeeklyGraphRawData
    );
    this.setState({
      dataContactsWeek: dataContactsWeek
    });
    const dataContactsBiWeekly = this.arrayFunctionContactsBiWeekly(
      this.state.WeeklyGraphRawData
    );
    this.setState({
      dataContactsBiWeekly: dataContactsBiWeekly
    });
    const dataContactsMonthly = this.arrayFunctionContactsMonthly(
      this.state.WeeklyGraphRawData
    );
    this.setState({
      dataContactsMonthly: dataContactsMonthly
    });
    const dataLeadsWeekly = this.arrayFunctionLeadsWeekly(
      this.state.WeeklyGraphRawDataLeads
    );
    this.setState({
      dataLeadsWeekly: dataLeadsWeekly
    });
    const dataLeadsBiWeekly = this.arrayFunctionLeadsBiWeekly(
      this.state.WeeklyGraphRawDataLeads
    );
    this.setState({
      dataLeadsBiWeekly: dataLeadsBiWeekly
    });
    const dataLeadsMonthly = this.arrayFunctionLeadsMonthly(
      this.state.WeeklyGraphRawDataLeads
    );
    this.setState({
      dataLeadsMonthly: dataLeadsMonthly
    });
    const dataAppointmentsWeekly = this.arrayFunctionAppointmentsWeekly(
      this.state.WeeklyGraphRawDataAppointments
    );
    this.setState({
      dataAppointmentsWeekly: dataAppointmentsWeekly
    });
    const dataAppointmentsBiWeekly = this.arrayFunctionAppointmentsBiWeekly(
      this.state.WeeklyGraphRawDataAppointments
    );
    this.setState({
      dataAppointmentsBiWeekly: dataAppointmentsBiWeekly
    });
    const dataAppointmentsMonthly = this.arrayFunctionAppointmentsMonthly(
      this.state.WeeklyGraphRawDataAppointments
    );
    this.setState({
      dataAppointmentsMonthly: dataAppointmentsMonthly
    });
  };
  //-----------------mobile friendly stuff---------------

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  //-----------------------------------------------------------------
  render() {
    const { width } = this.state.width;
    const isMobile = width <= 1000;
    return (
      <div className="app-wrapper my-auto">
        <div className="jr-card col-md-10 col-sm-12 col-lg-12 my-auto">
          <div className="jr-card-header" />
          <div className="jr-card-body">
            <h1 className="text-center" style={{ fontSize: 40 }}>
              Prospecting Metrics
            </h1>
            <h3> Please choose a Start Date to render!</h3>
            <Row>
              <Col style={{ marginBottom: 20 }}>
                <input
                  type="date"
                  value={this.state.customDate}
                  className="form-control"
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col>
                <Button color="primary" onClick={this.handleSubmitButton}>
                  Submit{" "}
                </Button>
              </Col>
            </Row>

            {this.state.width >= 500 ? (
              <div>
                <Button onClick={this.handleContactsShow}>Contacts</Button>
                <Button onClick={this.handleLeadsShow}>Leads</Button>
                <Button onClick={this.handleAppointmentsShow}>
                  Appointments
                </Button>
                <br />
                {this.state.showContacts && (
                  <div>
                    <h1>Contacts</h1>
                    <h3>Week view</h3>
                    <Row>
                      <BarChart
                        width={800}
                        height={400}
                        data={this.state.dataContactsWeek}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Open House" stackId="A" fill="#8884d8" />
                        <Bar
                          dataKey="Door Knocking"
                          stackId="A"
                          fill="#82ca9d"
                        />
                        <Bar dataKey="Phone Call" stackId="A" fill="#6F9FD8" />
                      </BarChart>
                    </Row>
                    <h1>Biweekly View</h1>
                    <Row>
                      <BarChart
                        width={800}
                        height={400}
                        data={this.state.dataContactsBiWeekly}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Open House" stackId="A" fill="#8884d8" />
                        <Bar
                          dataKey="Door Knocking"
                          stackId="A"
                          fill="#82ca9d"
                        />
                        <Bar dataKey="Phone Call" stackId="A" fill="#6F9FD8" />
                      </BarChart>
                    </Row>
                    <h1>Month View</h1>
                    <Row>
                      <BarChart
                        width={800}
                        height={400}
                        data={this.state.dataContactsMonthly}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Open House" stackId="A" fill="#8884d8" />
                        <Bar
                          dataKey="Door Knocking"
                          stackId="A"
                          fill="#82ca9d"
                        />
                        <Bar dataKey="Phone Call" stackId="A" fill="#6F9FD8" />
                      </BarChart>
                    </Row>
                  </div>
                )}
                {this.state.showLeads && (
                  <div>
                    <h1>Leads</h1>
                    <h3>Week view</h3>
                    <Row>
                      <BarChart
                        width={800}
                        height={400}
                        data={this.state.dataLeadsWeekly}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Open House" stackId="A" fill="#8884d8" />
                        <Bar
                          dataKey="Door Knocking"
                          stackId="A"
                          fill="#82ca9d"
                        />
                        <Bar dataKey="Phone Call" stackId="A" fill="#6F9FD8" />
                      </BarChart>
                    </Row>
                    <h1>Biweekly View</h1>
                    <Row>
                      <BarChart
                        width={800}
                        height={400}
                        data={this.state.dataLeadsBiWeekly}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Open House" stackId="A" fill="#8884d8" />
                        <Bar
                          dataKey="Door Knocking"
                          stackId="A"
                          fill="#82ca9d"
                        />
                        <Bar dataKey="Phone Call" stackId="A" fill="#6F9FD8" />
                      </BarChart>
                    </Row>
                    <h1>Month View</h1>
                    <Row>
                      <BarChart
                        width={800}
                        height={400}
                        data={this.state.dataLeadsMonthly}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Open House" stackId="A" fill="#8884d8" />
                        <Bar
                          dataKey="Door Knocking"
                          stackId="A"
                          fill="#82ca9d"
                        />
                        <Bar dataKey="Phone Call" stackId="A" fill="#6F9FD8" />
                      </BarChart>
                    </Row>
                  </div>
                )}
                {this.state.showAppointments && (
                  <div>
                    <h1>Appointments</h1>
                    <h3>Week view</h3>
                    <Row>
                      <BarChart
                        width={800}
                        height={400}
                        data={this.state.dataAppointmentsWeekly}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Open House" stackId="A" fill="#8884d8" />
                        <Bar
                          dataKey="Door Knocking"
                          stackId="A"
                          fill="#82ca9d"
                        />
                        <Bar dataKey="Phone Call" stackId="A" fill="#6F9FD8" />
                      </BarChart>
                    </Row>
                    <h1>Biweekly View</h1>
                    <Row>
                      <BarChart
                        width={800}
                        height={400}
                        data={this.state.dataAppointmentsBiWeekly}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Open House" stackId="A" fill="#8884d8" />
                        <Bar
                          dataKey="Door Knocking"
                          stackId="A"
                          fill="#82ca9d"
                        />
                        <Bar dataKey="Phone Call" stackId="A" fill="#6F9FD8" />
                      </BarChart>
                    </Row>
                    <h1>Month View</h1>
                    <Row>
                      <BarChart
                        width={800}
                        height={400}
                        data={this.state.dataAppointmentsMonthly}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Open House" stackId="A" fill="#8884d8" />
                        <Bar
                          dataKey="Door Knocking"
                          stackId="A"
                          fill="#82ca9d"
                        />
                        <Bar dataKey="Phone Call" stackId="A" fill="#6F9FD8" />
                      </BarChart>
                    </Row>
                  </div>
                )}{" "}
              </div>
            ) : (
              <div>
                <div className="d-flex justify-content-between">
                  <Button onClick={this.handleContactsShow}>Contacts</Button>
                  <Button onClick={this.handleLeadsShow}>Leads</Button>
                  <Button onClick={this.handleAppointmentsShow}>
                    Appointments
                  </Button>
                </div>
                {this.state.showContacts && (
                  <div>
                    <h1>Contacts</h1>
                    <h3>Week view</h3>
                    <Row>
                      <ResponsiveContainer aspect={1}>
                        <BarChart
                          width={800}
                          height={400}
                          data={this.state.dataContactsWeek}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="Open House"
                            stackId="A"
                            fill="#8884d8"
                          />
                          <Bar
                            dataKey="Door Knocking"
                            stackId="A"
                            fill="#82ca9d"
                          />
                          <Bar
                            dataKey="Phone Call"
                            stackId="A"
                            fill="#6F9FD8"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </Row>
                    <h1>Biweekly View</h1>
                    <Row>
                      <ResponsiveContainer aspect={1}>
                        <BarChart
                          width={800}
                          height={400}
                          data={this.state.dataContactsBiWeekly}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="Open House"
                            stackId="A"
                            fill="#8884d8"
                          />
                          <Bar
                            dataKey="Door Knocking"
                            stackId="A"
                            fill="#82ca9d"
                          />
                          <Bar
                            dataKey="Phone Call"
                            stackId="A"
                            fill="#6F9FD8"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </Row>
                    <h1>Month View</h1>
                    <Row>
                      <ResponsiveContainer aspect={1}>
                        <BarChart
                          width={800}
                          height={400}
                          data={this.state.dataContactsMonthly}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="Open House"
                            stackId="A"
                            fill="#8884d8"
                          />
                          <Bar
                            dataKey="Door Knocking"
                            stackId="A"
                            fill="#82ca9d"
                          />
                          <Bar
                            dataKey="Phone Call"
                            stackId="A"
                            fill="#6F9FD8"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </Row>
                  </div>
                )}
                {this.state.showLeads && (
                  <div>
                    <h1>Leads</h1>
                    <h3>Week view</h3>
                    <Row>
                      <ResponsiveContainer aspect={1}>
                        <BarChart
                          width={800}
                          height={400}
                          data={this.state.dataLeadsWeekly}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="Open House"
                            stackId="A"
                            fill="#8884d8"
                          />
                          <Bar
                            dataKey="Door Knocking"
                            stackId="A"
                            fill="#82ca9d"
                          />
                          <Bar
                            dataKey="Phone Call"
                            stackId="A"
                            fill="#6F9FD8"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </Row>
                    <h1>Biweekly View</h1>
                    <Row>
                      <ResponsiveContainer aspect={1}>
                        <BarChart
                          width={800}
                          height={400}
                          data={this.state.dataLeadsBiWeekly}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="Open House"
                            stackId="A"
                            fill="#8884d8"
                          />
                          <Bar
                            dataKey="Door Knocking"
                            stackId="A"
                            fill="#82ca9d"
                          />
                          <Bar
                            dataKey="Phone Call"
                            stackId="A"
                            fill="#6F9FD8"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </Row>
                    <h1>Month View</h1>
                    <Row>
                      <ResponsiveContainer aspect={1}>
                        <BarChart
                          width={800}
                          height={400}
                          data={this.state.dataLeadsMonthly}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="Open House"
                            stackId="A"
                            fill="#8884d8"
                          />
                          <Bar
                            dataKey="Door Knocking"
                            stackId="A"
                            fill="#82ca9d"
                          />
                          <Bar
                            dataKey="Phone Call"
                            stackId="A"
                            fill="#6F9FD8"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </Row>
                  </div>
                )}
                {this.state.showAppointments && (
                  <div>
                    <h1>Appointments</h1>
                    <h3>Week view</h3>
                    <Row>
                      <ResponsiveContainer aspect={1}>
                        <BarChart
                          width={800}
                          height={400}
                          data={this.state.dataAppointmentsWeekly}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="Open House"
                            stackId="A"
                            fill="#8884d8"
                          />
                          <Bar
                            dataKey="Door Knocking"
                            stackId="A"
                            fill="#82ca9d"
                          />
                          <Bar
                            dataKey="Phone Call"
                            stackId="A"
                            fill="#6F9FD8"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </Row>
                    <h1>Biweekly View</h1>

                    <Row>
                      <ResponsiveContainer aspect={1}>
                        <BarChart
                          width={800}
                          height={400}
                          data={this.state.dataAppointmentsBiWeekly}
                          margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="Open House"
                            stackId="A"
                            fill="#8884d8"
                          />
                          <Bar
                            dataKey="Door Knocking"
                            stackId="A"
                            fill="#82ca9d"
                          />
                          <Bar
                            dataKey="Phone Call"
                            stackId="A"
                            fill="#6F9FD8"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </Row>

                    <h1>Month View</h1>
                    <Row>
                      <ResponsiveContainer aspect={1}>
                        <BarChart
                          width={800}
                          height={400}
                          data={this.state.dataAppointmentsMonthly}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="Open House"
                            stackId="A"
                            fill="#8884d8"
                          />
                          <Bar
                            dataKey="Door Knocking"
                            stackId="A"
                            fill="#82ca9d"
                          />
                          <Bar
                            dataKey="Phone Call"
                            stackId="A"
                            fill="#6F9FD8"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </Row>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default ActivityGraphs;
