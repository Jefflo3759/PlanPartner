import React from "react";
import {
  Label,
  Input,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
import DatePicker from "react-datepicker";
import "../../styles/timeblocks/react-datepicker.css";
import moment from "moment";

class ActivityConfirm extends React.Component {
  state = {
    ActivityTypeId: this.props.ActivityTypeId,
    Contacts: this.props.Contacts,
    Leads: this.props.Leads,
    Appointments: this.props.Appointments,
    StartTime: this.props.StartTime,
    EndTime: this.props.EndTime,
    modal: this.props.modal,
    activitytypes: this.props.activitytypes
  };

  componentDidMount() {
    this.setState(
      {
        StartTime: moment.utc(this.state.StartTime).local(),
        EndTime: moment.utc(this.state.EndTime).local()
      },
      () => {
        if (
          moment
            .utc(this.state.StartTime)
            .local()
            .add(8, "hours") < moment.utc().local()
        ) {
          this.setState({
            EndTime: moment
              .utc(this.state.StartTime)
              .add(8, "hours")
              .local()
          });
        } else if (
          moment
            .utc(this.state.StartTime)
            .local()
            .add(8, "hours") > moment.utc().local()
        ) {
          this.setState({
            EndTime: moment.utc().local()
          });
        }
      }
    );
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  stopTimer = () => {
    if (this.state.StartTime) {
      clearInterval(this.state.myInterval);
    }
  };

  handleActivityTypeChange = event => {
    this.setState({
      ActivityTypeId: parseInt(event.target.value)
    });
  };

  handleContactsChange = event => {
    this.setState({
      Contacts: parseInt(event.target.value)
    });
    if (Contacts === null) {
      this.setState({
        Contacts: 0
      });
    }
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
  handleCancelModal = event => {
    //I want this function to make the parent state false
    this.props.makeModalFalse();
  };

  handleSubmitUpdate = event => {
    if (
      this.state.EndTime &&
      (this.state.Contacts || this.state.Contacts === 0) &&
      (this.state.Leads || this.state.Leads === 0) &&
      (this.state.Appointments || this.state.Appointments === 0) &&
      this.state.StartTime
    ) {
      //add a new prop to parent
      this.props.AllActivityData({
        ActivityTypeId: this.state.ActivityTypeId,
        Contacts: this.state.Contacts,
        Leads: this.state.Leads,
        Appointments: this.state.Appointments,
        StartTime: this.state.StartTime,
        EndTime: moment.utc(this.state.EndTime).local(),
        modal: !this.state.modal,
        activitytypes: this.state.activitytypes
      });
    } else {
      alert("please fill all the required fields!");
    }
  };

  //----------------------MODAL HANDLERS------------

  render() {
    return (
      <Modal
        isOpen={this.state.modal}
        toggle={this.state.modal}
        className={this.props.className}
      >
        <ModalHeader className="bg-primary" toggle={true}>
          <h1 style={{ color: "white" }}>Confirmation</h1>
        </ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          {
            //----------------------------------Modal Submit to database buttons--------------------
          }

          <Button color="primary" onClick={this.handleSubmitUpdate}>
            Submit
          </Button>
          <Button color="primary" onClick={this.handleCancelModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default ActivityConfirm;
