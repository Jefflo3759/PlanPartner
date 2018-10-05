import React from "react";
import {
  Label,
  Input,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Container
} from "reactstrap";
import DatePicker from "react-datepicker";
import "../../styles/timeblocks/react-datepicker.css";
import moment from "moment";
import { getAll } from "../../services/activitytype.service";
import { postActivityForm } from "../../services/activity.service";

class ActivityManualInput extends React.Component {
  state = {
    ActivityTypeId: 0,
    Contacts: 0,
    Leads: 0,
    Appointments: 0,
    StartTime: moment(),
    EndTime: moment(),
    activitytypes: []
  };

  componentDidMount() {
    getAll().then(response => {
      this.setState({
        activitytypes: response.data.items
      });
    });
  }

  handleActivityTypeChange = event => {
    this.setState({
      ActivityTypeId: parseInt(event.target.value)
    });
  };

  handleContactsChange = event => {
    this.setState({
      Contacts: parseInt(event.target.value)
    });
  };
  handleLeadsChange = event => {
    this.setState({
      Leads: parseInt(event.target.value)
    });
  };

  handleAppointmentsChange = event => {
    this.setState({
      Appointments: parseInt(event.target.value)
    });
  };

  handleSubmitUpdate = event => {
    postActivityForm(
      this.state.ActivityTypeId,
      this.state.Contacts,
      this.state.Leads,
      this.state.Appointments,
      this.state.StartTime,
      this.state.EndTime
    )
      .then(response => {
        console.log("Clock In worked, POGGERS");
        this.props.history.push("activityConfirm");
      })
      .catch(err => {
        console.log("error");
        alert("please fill out all fields!");
      });
  };

  handleCancelModal = event => {
    this.props.history.push("activityConfirm");
  };

  //----------------------MODAL HANDLERS------------

  render() {
    return (
      <Container fluid={true} className="d-flex justify-content-center h-100">
        <div className="jr-card">
          <div className="jr-card-header">
            <h1 className="text-center">Confirmation</h1>
          </div>
          <div className="jr-card-body">
            <FormGroup>
              {
                //-------------Modal Prospecting Type Dropdown-------------------------------
              }
              <Label>Prospecting Type:</Label>

              <select
                className="custom-select mt-3"
                onChange={event => this.handleActivityTypeChange(event)}
                value={this.state.ActivityTypeId}
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
              {
                //-----------------------Total Data Form---------------------------
              }
              <Label>Total Contacts:</Label>
              <Input
                type="number"
                name="Contacts"
                value={this.state.Contacts}
                min="0"
                onChange={this.handleContactsChange}
              />
              <Label>Total Leads:</Label>
              <Input
                type="number"
                name="Leads"
                value={this.state.Leads}
                min="0"
                onChange={this.handleLeadsChange}
              />

              <Label>Total Appointments:</Label>
              <Input
                type="number"
                name="Appointments"
                value={this.state.Appointments}
                min="0"
                onChange={this.handleAppointmentsChange}
              />
              {
                //----------------------Input DateTime User -------------------------------------
              }
              <div className="col-xs-4 ">
                <Label> Clock In Time</Label>
                <DatePicker
                  selected={
                    this.state.StartTime ? moment(this.state.StartTime) : null
                  }
                  onChange={date =>
                    this.setState({
                      StartTime: moment.utc(date).local()
                    })
                  }
                  className="form-control text-center"
                  dateFormat="MMM D, YYYY"
                />

                <DatePicker
                  selected={
                    this.state.StartTime ? moment(this.state.StartTime) : null
                  }
                  onChange={time =>
                    this.setState({
                      StartTime: moment(time)
                    })
                  }
                  showTimeSelect
                  className="form-control text-center"
                  dateFormat="LT"
                />
              </div>
              <div>
                <Label> Clock Out Time</Label>

                <DatePicker
                  selected={
                    this.state.StartTime ? moment(this.state.EndTime) : null
                  }
                  onChange={date =>
                    this.setState({
                      EndTime: moment.utc(date).local()
                    })
                  }
                  f
                  className="form-control text-center"
                  dateFormat="MMM D, YYYY"
                  minDate={this.state.StartTime}
                  maxDate={moment(this.state.StartTime).add(8, "hours")}
                />

                <DatePicker
                  selected={
                    this.state.StartTime ? moment(this.state.EndTime) : null
                  }
                  onChange={time =>
                    this.setState({
                      EndTime: moment.utc(time).local()
                    })
                  }
                  showTimeSelect
                  className="form-control text-center"
                  dateFormat="LT"
                  minDate={this.state.StartTime}
                  maxDate={moment(this.state.StartTime).add(8, "hours")}
                />
              </div>
            </FormGroup>
          </div>
          <div className="jr-card-footer">
            {
              //----------------------------------Modal Submit to database buttons--------------------
            }

            <Button color="primary" onClick={this.handleSubmitUpdate}>
              Submit
            </Button>
            <Button color="primary" onClick={this.handleCancelModal}>
              Cancel
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}

export default ActivityManualInput;
