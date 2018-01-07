import React from 'react';
import { Link, withRouter } from 'react-router';

class AddListingSecond extends React.Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  componentDidMount() {
    if(this.props.listingFormState.current_form === "home" ||
      this.props.listingFormState.current_form === "start-with-basics"){
        this.props.router.replace('/become-a-host');
      }
  }

  componentDidUpdate() {
    if(this.props.currentUser === null){
      this.props.router.replace('/become-a-host');
    }
  }

  handleNext() {
    return "alf-next";
  }

  handleNextClick(e) {
    e.preventDefault;
    this.props.updateListingForm({current_form: "ready-for-pups"});
    this.props.router.push('/become-a-host/ready');
  }

  handleButton(field) {
    let status = this.props.listingFormState[field];
    if (status) {
      return `alf-amenity-true alf-${field}`;
    }
    else {
      return `alf-amenity-false`;
    }
  }

  handleButtonClick(field) {
    return (e) => {
      e.preventDefault();
      let truthy = !(this.props.listingFormState[field]);
      this.props.updateListingForm({[field]: truthy});
    };
  }

  render() {
    let user = this.props.currentUser;
    return (
      <div className="add-listing-form">
        <div className="alf-first-half">
          <div className="alf-col-first">
            <div className="alf-form">
              <span className="alf-field-title alf-extra-margin">Add amenities</span>
              <div className="alf-input-buttons">
                <div className="alf-input-column">
                  <button className={this.handleButton("dog_walks")}
                    onClick={this.handleButtonClick("dog_walks")}>Free dog walks
                  </button>
                  <button className={this.handleButton("deluxe_bed")}
                    onClick={this.handleButtonClick("deluxe_bed")}>Deluxe doggy bed
                  </button>
                  <button className={this.handleButton("house_cat")}
                    onClick={this.handleButtonClick("house_cat")}>House cat friend
                  </button>
                  <button className={this.handleButton("cuddle_buddy")}
                    onClick={this.handleButtonClick("cuddle_buddy")}>Cuddle buddy</button>
                </div>

                <div className="alf-input-column">
                  <button className={this.handleButton("gourmet_food")}
                    onClick={this.handleButtonClick("gourmet_food")}>Gourmet dog food
                  </button>
                  <button className={this.handleButton("chew_toys")}
                    onClick={this.handleButtonClick("chew_toys")}>Chew toys</button>
                  <button className={this.handleButton("frisbee")}
                    onClick={this.handleButtonClick("frisbee")}>Frisbee sessions
                  </button>
                  <button className={this.handleButton("mailman")}
                    onClick={this.handleButtonClick("mailman")}>Mailman visits</button>
                  <button className={this.handleButton("grooming")}
                    onClick={this.handleButtonClick("grooming")}>Free grooming</button>
                </div>
              </div>

              <span className="alf-field-title alf-extra-margin">Add house rules</span>
                <div className="alf-input-buttons alf-rules-col">
                  <div className="alf-input-column">
                    <button className={this.handleButton("barking")}
                      onClick={this.handleButtonClick("barking")}>No barking
                    </button>
                    <button className={this.handleButton("indoor_pee")}
                      onClick={this.handleButtonClick("indoor_pee")}>No peeing indoors
                    </button>
                    <button className={this.handleButton("indoor_poop")}
                      onClick={this.handleButtonClick("indoor_poop")}>No indoor poop
                    </button>
                    <button className={this.handleButton("whining")}
                      onClick={this.handleButtonClick("whining")}>No whining</button>
                    <button className={this.handleButton("shedding")}
                      onClick={this.handleButtonClick("shedding")}>No Shedding</button>
                    <button className={this.handleButton("begging")}
                      onClick={this.handleButtonClick("begging")}>No begging for food</button>
                  </div>
                </div>

            </div>

            <div className="alf-nav">
              <Link to="/become-a-host/basics" className="alf-back">Back</Link>
              <button className={this.handleNext()} onClick={this.handleNextClick}>Next</button>
            </div>

          </div>
        </div>

        <div className="alf-second-half">
          <div className="alf-col-second">
            <div className="alf-tip-box">
              <img className="alh-tip-icon" src="https://res.cloudinary.com/dsguwnfdw/image/upload/v1478477881/Icons/Screen_Shot_2016-11-06_at_4.17.32_PM.png"/>
              <span className="alf-tip-content">
                Dogs love amenities! And they don't like rules. I mean, they <u>really</u> don't like rules. The more amenities and fewer rules you add, the more pups you can expect to see in your future!
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AddListingSecond);
