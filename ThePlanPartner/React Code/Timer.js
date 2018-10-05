import React from "react";
import { Row, Col, Button } from "reactstrap";

class Timer extends React.Component {
  state = {
    currentTime: 0,
    myInterval: null,
    showTimer: true,
    ClockIn: this.props.ClockIn
  };

  componentWillMount = () => {
    this.setState({
      myInterval: setInterval(() => {
        this.setState(prevState => ({
          currentTime: prevState.currentTime + 1
        }));
      }, 1000)
    });
  };
  componentWillUnmount = () => {};
  toggleTimer = () => {
    this.setState(prevState => ({
      showTimer: !prevState.showTimer
    }));
  };

  handleStartTimer = event => {};
  getHours = () => {
    return ("0" + Math.floor((this.state.currentTime / 3600) % 60)).slice(-2);
  };

  getMinutes = () => {
    return ("0" + Math.floor((this.state.currentTime / 60) % 60)).slice(-2);
  };
  getSeconds = () => {
    return ("0" + Math.floor(this.state.currentTime % 60)).slice(-2);
  };

  getStartTime = () => {
    return this.state.StartTime;
  };
  getEndTime = () => {
    return this.state.EndTime;
  };
  // pause time
  handleEndTime = event => {
    clearInterval(this.state.myInterval);
    this.setState({
      myInterval: null
    });
  };
  //reset my timer
  handleResetTime = event => {
    this.setState({
      currentTime: 0
    });
  };

  render() {
    return (
      <Row>
        <Col sm="12" md={{ size: 10, offset: 1 }}>
          <Button
            color="primary"
            className="form-control"
            size="sm"
            onClick={this.toggleTimer}
          >
            Show/Hide Timer
          </Button>
          {this.state.showTimer && (
            <div>
              <h1 className="text-center">
                {this.getHours().slice(-2)} : {this.getMinutes().slice(-2)} :{" "}
                {this.getSeconds().slice(-2)}
              </h1>

              {/* <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                  <Button
                    color="primary"
                    className="form-control col-ms-6"
                    size="sm"
                    onClick={this.handleStartTimer}
                  >
                    Start Timer
                  </Button>
                </Col>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                  <Button
                    color="primary"
                    className="form-control col-ms-6"
                    size="sm"
                    onClick={this.handleEndTime}
                  >
                    Pause Timer
                  </Button>
                </Col>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                  <Button
                    color="primary"
                    className="form-control col-ms-6"
                    size="sm"
                    onClick={this.handleResetTime}
                  >
                    Reset Timer
                  </Button>
                </Col>
              </Row> */}
            </div>
          )}
        </Col>
      </Row>
    );
  }
}
export default Timer;
